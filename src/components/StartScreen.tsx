import React from 'react';
import '../styles/StartScreen.css';

interface Props {
  onStart: () => void;
}

const StartScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="start-container">
      <h1 className="title">サービス方向性診断</h1>
      <p className="description">
        はい/いいえでサクサク答えて、あなたの開発アイデアを可視化しましょう！
        簡単な質問に答えるだけで、あなたに最適なサービスの方向性が見えてきます。
      </p>
      <button className="start-button" onClick={onStart}>
        スタート
      </button>
    </div>
  );
};

export default StartScreen; 