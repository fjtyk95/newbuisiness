export interface Question {
  id: number;
  category: string;
  questionText: string;
  yesScore: number;
  noScore: number;
}

export interface Answer {
  questionId: number;
  answer: boolean;
  totalScore: number;
} 