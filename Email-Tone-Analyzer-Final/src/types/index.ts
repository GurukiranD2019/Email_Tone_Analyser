export interface ToneAnalysis {
  id: string;
  emailContent: string;
  timestamp: Date;
  overallSentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  tones: {
    positive: number;
    negative: number;
    neutral: number;
    angry: number;
    enthusiastic: number;
    formal: number;
    informal: number;
    analytical: number;
    confident: number;
    tentative: number;
  };
  suggestions: string[];
  keywords: string[];
}

export interface AnalysisResult {
  success: boolean;
  data?: ToneAnalysis;
  error?: string;
}

export interface EmailSample {
  id: string;
  title: string;
  content: string;
  category: 'business' | 'complaint' | 'appreciation' | 'inquiry' | 'casual' | 'urgent' | 'follow-up' | 'announcement';
}
