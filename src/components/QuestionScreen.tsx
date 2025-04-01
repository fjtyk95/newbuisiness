import React from 'react';
import { Question, Answer } from '../types/types';
import {
  VStack,
  Heading,
  Text,
  Button,
  Progress,
  Container,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
} from '@chakra-ui/react';

interface Props {
  question: Question;
  currentQuestionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: Answer) => void;
}

const QuestionScreen: React.FC<Props> = ({
  question,
  currentQuestionNumber,
  totalQuestions,
  onAnswer,
}) => {
  const handleAnswer = (isYes: boolean) => {
    onAnswer({
      questionId: question.id,
      answer: isYes,
      totalScore: isYes ? question.yesScore : question.noScore,
    });
  };

  const progress = (currentQuestionNumber / totalQuestions) * 100;

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6}>
        <Progress
          value={progress}
          size="sm"
          width="100%"
          colorScheme="green"
          borderRadius="full"
        />
        <Text fontSize="md" color="gray.600">
          質問 {currentQuestionNumber} / {totalQuestions}
        </Text>

        <Card>
          <CardHeader>
            <Text color="gray.500" fontSize="sm">
              {question.category}
            </Text>
          </CardHeader>
          <CardBody>
            <Heading size="lg" mb={8} textAlign="center">
              {question.questionText}
            </Heading>
            <ButtonGroup spacing={4} width="100%">
              <Button
                colorScheme="green"
                size="lg"
                flex={1}
                onClick={() => handleAnswer(true)}
                _hover={{ transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                はい
              </Button>
              <Button
                colorScheme="gray"
                size="lg"
                flex={1}
                onClick={() => handleAnswer(false)}
                _hover={{ transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                いいえ
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default QuestionScreen; 