import React from 'react';
import { Answer } from '../types/types';
import '../styles/ResultScreen.css';

interface Props {
  answers: Answer[];
  totalScore: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<Props> = ({ answers, totalScore, onRestart }) => {
  // 実際のプロジェクトでは、ここでスコアに基づいて結果テキストを生成するロジックを実装
  const generateResultText = () => {
    // 簡易的な例
    if (totalScore > 10) {
      return "あなたのサービスは「法人向けSaaS」の方向性が強いです。サブスクリプションモデルでの収益化が期待できます。";
    } else if (totalScore > 0) {
      return "あなたのサービスは「個人向けWebアプリ」の方向性が強いです。フリーミアムモデルでの展開が適しています。";
    } else {
      return "あなたのサービスは「モバイルアプリ」の方向性が強いです。アプリ内課金での収益化を検討してみてください。";
    }
  };

  const resultText = generateResultText();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultText)
      .then(() => alert('結果をクリップボードにコピーしました！'))
      .catch(err => console.error('コピーに失敗しました:', err));
  };

  return (
    <div className="result-container">
      <h1 className="result-title">診断結果</h1>
      
      <div className="result-box">
        <h2 className="result-subtitle">あなたのサービス方向性</h2>
        <p className="result-text">{resultText}</p>
      </div>
      
      <div className="result-actions">
        <button className="copy-button" onClick={copyToClipboard}>
          結果をコピー
        </button>
        <button className="restart-button" onClick={onRestart}>
          もう一度診断する
        </button>
      </div>
    </div>
  );
};

export default ResultScreen; 