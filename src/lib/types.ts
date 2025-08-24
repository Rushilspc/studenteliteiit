export type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
  imageUrl?: string;
  feedback?: 'positive' | 'negative';
  isLoading?: boolean;
};
