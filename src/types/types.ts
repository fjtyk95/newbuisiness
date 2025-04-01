export interface Question {
  id: number;
  category: string;
  questionText: string;
  yesScore: number;
  noScore: number;
  type: 'business' | 'tech' | 'target' | 'feature';
}

export interface Answer {
  questionId: number;
  answer: boolean;
  totalScore: number;
} 