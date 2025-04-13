export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  currentPdf: File | null;
}