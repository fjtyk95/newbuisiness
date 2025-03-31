import React, { useState } from 'react';
import { Question, Answer } from '../types/types';

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

  return (
    <div className="question-container">
      <div className="progress">
        質問 {currentQuestionNumber} / {totalQuestions}
      </div>
      
      <h2 className="question-text">{question.questionText}</h2>
      
      <div className="button-container">
        <button 
          className="answer-button yes-button"
          onClick={() => handleAnswer(true)}
        >
          はい
        </button>
        <button 
          className="answer-button no-button"
          onClick={() => handleAnswer(false)}
        >
          いいえ
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen; 