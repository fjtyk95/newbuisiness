import React, { useState, useEffect } from 'react';
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
  },
  {
    id: 2,
    category: 'ビジネスモデル',
    questionText: 'サブスクリプション型の収益モデルに興味がありますか？',
    yesScore: 3,
    noScore: -1,
  },
  {
    id: 3,
    category: '技術スタック',
    questionText: 'モバイルアプリよりもWebアプリの方が得意ですか？',
    yesScore: 2,
    noScore: -2,
  },
  {
    id: 4,
    category: 'ターゲット',
    questionText: '個人ユーザーをターゲットにしたいですか？',
    yesScore: -3,
    noScore: 4,
  },
  {
    id: 5,
    category: '機能',
    questionText: 'ユーザー同士のコミュニケーション機能は重要ですか？',
    yesScore: 2,
    noScore: -1,
  },
  // 実際のアプリでは、より多くの質問を追加
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

  // 初期質問をランダムに選択
  useEffect(() => {
    // 実際のアプリでは、APIからデータを取得するなどの処理を行う
    // ここでは簡易的にサンプルデータをシャッフル
    const shuffled = [...sampleQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5)); // 5問だけ選択（デモ用）
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
          <div>質問を読み込み中...</div>
        );
      case AppState.RESULT:
        return (
          <ResultScreen
            answers={answers}
            totalScore={totalScore}
            onRestart={handleStart}
          />
        );
      default:
        return <div>エラーが発生しました</div>;
    }
  };

  return <div className="app">{renderContent()}</div>;
};

export default App; 