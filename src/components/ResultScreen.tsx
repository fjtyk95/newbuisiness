import React from 'react';
import { Question, Answer } from '../types/types';
import {
  VStack,
  Heading,
  Text,
  Button,
  useToast,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@chakra-ui/react';

interface Props {
  answers: Answer[];
  questions: Question[];
  totalScore: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<Props> = ({ answers, questions, totalScore, onRestart }) => {
  const toast = useToast();

  const generateResultText = () => {
    if (totalScore > 10) {
      return "あなたのサービスは「法人向けSaaS」の方向性が強いです。サブスクリプションモデルでの収益化が期待できます。";
    } else if (totalScore > 0) {
      return "あなたのサービスは「個人向けWebアプリ」の方向性が強いです。フリーミアムモデルでの展開が適しています。";
    } else {
      return "あなたのサービスは「モバイルアプリ」の方向性が強いです。アプリ内課金での収益化を検討してみてください。";
    }
  };

  const generateAIPrompt = () => {
    const answeredQuestions = answers.map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      return {
        type: question?.type,
        answer: answer.answer,
        text: question?.questionText
      };
    });

    const businessAnswers = answeredQuestions.filter(q => q.type === 'business');
    const techAnswers = answeredQuestions.filter(q => q.type === 'tech');
    const targetAnswers = answeredQuestions.filter(q => q.type === 'target');
    const featureAnswers = answeredQuestions.filter(q => q.type === 'feature');

    return `以下の条件に基づいて、最適なサービス開発の方向性を提案してください：

【ビジネスモデルの特徴】
${businessAnswers.map(q => `- ${q.text}: ${q.answer ? 'はい' : 'いいえ'}`).join('\n')}

【技術的な特徴】
${techAnswers.map(q => `- ${q.text}: ${q.answer ? 'はい' : 'いいえ'}`).join('\n')}

【ターゲット層の特徴】
${targetAnswers.map(q => `- ${q.text}: ${q.answer ? 'はい' : 'いいえ'}`).join('\n')}

【必要な機能】
${featureAnswers.map(q => `- ${q.text}: ${q.answer ? 'はい' : 'いいえ'}`).join('\n')}

これらの条件を考慮して、以下の点について具体的に提案してください：
1. サービスの具体的な形態（SaaS、モバイルアプリ、Webアプリなど）
2. 収益化の方法
3. 技術スタックの選定
4. 開発の優先順位
5. 考慮すべきリスクと対策`;
  };

  const resultText = generateResultText();
  const aiPrompt = generateAIPrompt();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "コピーしました！",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(err => {
        toast({
          title: "コピーに失敗しました",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <VStack spacing={6} align="stretch">
      <Card>
        <CardHeader>
          <Heading size="lg" textAlign="center">診断結果</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <Badge colorScheme="green" fontSize="md" p={2}>
              総合スコア: {totalScore}
            </Badge>
            <Text fontSize="lg">{resultText}</Text>
          </VStack>
        </CardBody>
      </Card>

      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>簡易レポート</Tab>
          <Tab>AIプロンプト</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Text fontSize="md">
                {resultText}
              </Text>
              <Button colorScheme="blue" onClick={() => copyToClipboard(resultText)}>
                結果をコピー
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Text fontSize="md" whiteSpace="pre-line">
                {aiPrompt}
              </Text>
              <Button colorScheme="green" onClick={() => copyToClipboard(aiPrompt)}>
                AIプロンプトをコピー
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Divider my={4} />

      <Button colorScheme="gray" onClick={onRestart}>
        もう一度診断する
      </Button>
    </VStack>
  );
};

export default ResultScreen; 