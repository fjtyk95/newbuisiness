import React, { useState, useEffect } from 'react';
import { ChakraProvider, Container, Box } from '@chakra-ui/react';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { Question, Answer } from './types/types';
import './styles/App.css';

// サンプルの質問データ
const sampleQuestions: Question[] = [
  {
    id: 1,
    category: 'ビジネスモデル',
    questionText: '法人向けのサービスを作りたいですか？',
    yesScore: 5,
    noScore: -3,
    type: 'business'
  },
  {
    id: 2,
    category: 'ビジネスモデル',
    questionText: 'サブスクリプション型の収益モデルに興味がありますか？',
    yesScore: 3,
    noScore: -1,
    type: 'business'
  },
  {
    id: 3,
    category: '技術スタック',
    questionText: 'モバイルアプリよりもWebアプリの方が得意ですか？',
    yesScore: 2,
    noScore: -2,
    type: 'tech'
  },
  {
    id: 4,
    category: 'ターゲット',
    questionText: '個人ユーザーをターゲットにしたいですか？',
    yesScore: -3,
    noScore: 4,
    type: 'target'
  },
  {
    id: 5,
    category: '機能',
    questionText: 'ユーザー同士のコミュニケーション機能は重要ですか？',
    yesScore: 2,
    noScore: -1,
    type: 'feature'
  },
  // 新しい質問を追加
  {
    id: 6,
    category: '技術スタック',
    questionText: 'AIやML技術を活用したいですか？',
    yesScore: 4,
    noScore: -2,
    type: 'tech'
  },
  {
    id: 7,
    category: 'ビジネスモデル',
    questionText: 'グローバル展開を視野に入れていますか？',
    yesScore: 3,
    noScore: -1,
    type: 'business'
  },
  {
    id: 8,
    category: 'ターゲット',
    questionText: '若年層（10-20代）をメインターゲットにしたいですか？',
    yesScore: -2,
    noScore: 2,
    type: 'target'
  },
  {
    id: 9,
    category: '機能',
    questionText: 'リアルタイムでのデータ更新や通知機能は必要ですか？',
    yesScore: 3,
    noScore: -2,
    type: 'feature'
  },
  {
    id: 10,
    category: '技術スタック',
    questionText: 'ブロックチェーン技術に興味がありますか？',
    yesScore: 4,
    noScore: -3,
    type: 'tech'
  }
];

enum AppState {
  START,
  QUESTION,
  RESULT,
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.START);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const shuffled = [...sampleQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled); // すべての質問を使用
  }, []);

  const handleStart = () => {
    setAppState(AppState.QUESTION);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTotalScore(0);
  };

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    const newTotalScore = totalScore + (answer.answer ? questions[currentQuestionIndex].yesScore : questions[currentQuestionIndex].noScore);
    setTotalScore(newTotalScore);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setAppState(AppState.RESULT);
    }
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.START:
        return <StartScreen onStart={handleStart} />;
      case AppState.QUESTION:
        return questions.length > 0 ? (
          <QuestionScreen
            question={questions[currentQuestionIndex]}
            currentQuestionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        ) : (
          <Box textAlign="center" p={8}>質問を読み込み中...</Box>
        );
      case AppState.RESULT:
        return (
          <ResultScreen
            answers={answers}
            questions={questions}
            totalScore={totalScore}
            onRestart={handleStart}
          />
        );
      default:
        return <Box textAlign="center" p={8}>エラーが発生しました</Box>;
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.lg" py={8}>
        {renderContent()}
      </Container>
    </ChakraProvider>
  );
};

export default App; 