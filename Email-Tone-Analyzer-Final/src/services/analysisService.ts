import type { ToneAnalysis, AnalysisResult } from '../types';
import { mockAnalysisResults } from '../data/sampleData';

// Simulated NLP analysis service
export class EmailAnalysisService {
  private static instance: EmailAnalysisService;
  private analysisHistory: ToneAnalysis[] = [];

  private constructor() {}

  public static getInstance(): EmailAnalysisService {
    if (!EmailAnalysisService.instance) {
      EmailAnalysisService.instance = new EmailAnalysisService();
    }
    return EmailAnalysisService.instance;
  }

  public async analyzeEmail(emailContent: string): Promise<AnalysisResult> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if we have a mock result for this content
      const mockResult = Object.values(mockAnalysisResults).find(
        result => result.emailContent === emailContent
      );

      if (mockResult) {
        this.analysisHistory.push(mockResult);
        return { success: true, data: mockResult };
      }

      // Generate simulated analysis for new content
      const analysis = this.generateAnalysis(emailContent);
      this.analysisHistory.push(analysis);

      return { success: true, data: analysis };
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to analyze email. Please try again.' 
      };
    }
  }

  private generateAnalysis(emailContent: string): ToneAnalysis {
    const id = Math.random().toString(36).substr(2, 9);
    
    // Simple sentiment analysis based on keywords
    const positiveWords = ['thank', 'great', 'excellent', 'appreciate', 'wonderful', 'amazing', 'fantastic', 'love', 'pleased', 'happy'];
    const negativeWords = ['terrible', 'awful', 'disappointed', 'angry', 'frustrated', 'unacceptable', 'complaint', 'problem', 'issue', 'wrong'];
    const formalWords = ['dear', 'sincerely', 'regards', 'respectfully', 'professional', 'kindly', 'please', 'thank you'];
    const angryWords = ['furious', 'outraged', 'disgusted', 'livid', 'infuriated', 'demand', 'immediately', 'unacceptable'];

    const words = emailContent.toLowerCase().split(/\s+/);
    
    const positiveCount = words.filter(word => positiveWords.some(pw => word.includes(pw))).length;
    const negativeCount = words.filter(word => negativeWords.some(nw => word.includes(nw))).length;
    const formalCount = words.filter(word => formalWords.some(fw => word.includes(fw))).length;
    const angryCount = words.filter(word => angryWords.some(aw => word.includes(aw))).length;

    const totalWords = words.length;
    const formalityScore = Math.min(90, (formalCount / totalWords) * 500);
    
    let overallSentiment: 'positive' | 'negative' | 'neutral';
    let positiveScore = Math.max(10, Math.min(90, (positiveCount / totalWords) * 400));
    let negativeScore = Math.max(5, Math.min(85, (negativeCount / totalWords) * 400));
    let angryScore = Math.max(0, Math.min(80, (angryCount / totalWords) * 600));

    if (positiveCount > negativeCount) {
      overallSentiment = 'positive';
      positiveScore += 20;
    } else if (negativeCount > positiveCount) {
      overallSentiment = 'negative';
      negativeScore += 20;
    } else {
      overallSentiment = 'neutral';
    }

    const neutralScore = Math.max(10, 100 - positiveScore - negativeScore);

    const suggestions = this.generateSuggestions(overallSentiment, formalityScore, angryScore);
    const keywords = this.extractKeywords(emailContent);

    return {
      id,
      emailContent,
      timestamp: new Date(),
      overallSentiment,
      confidence: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
      tones: {
        positive: Math.round(positiveScore),
        negative: Math.round(negativeScore),
        neutral: Math.round(neutralScore),
        angry: Math.round(angryScore),
        enthusiastic: Math.round(positiveScore * 0.8),
        formal: Math.round(formalityScore),
        informal: Math.round(100 - formalityScore),
        analytical: Math.round(Math.random() * 40 + 40),
        confident: Math.round(Math.random() * 30 + 50),
        tentative: Math.round(Math.random() * 30 + 20)
      },
      suggestions,
      keywords
    };
  }

  private generateSuggestions(sentiment: string, formality: number, anger: number): string[] {
    const suggestions: string[] = [];

    if (sentiment === 'negative') {
      suggestions.push('Consider using more positive language to improve the tone');
    }

    if (anger > 60) {
      suggestions.push('The email contains strong negative emotions. Consider revising for a more professional tone');
      suggestions.push('Try to focus on solutions rather than problems');
    }

    if (formality < 40) {
      suggestions.push('Consider using more formal language for professional communication');
    }

    if (formality > 80) {
      suggestions.push('The tone is very formal. Consider adding some warmth if appropriate');
    }

    if (sentiment === 'positive') {
      suggestions.push('Great job! The email has a positive and engaging tone');
    }

    return suggestions;
  }

  private extractKeywords(content: string): string[] {
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .filter(word => !['this', 'that', 'with', 'have', 'will', 'been', 'from', 'they', 'were', 'said', 'each', 'which', 'their', 'time', 'would', 'there', 'about', 'could', 'other', 'make', 'what', 'know', 'just', 'first', 'into', 'over', 'think', 'also', 'your', 'work', 'life', 'only', 'can', 'still', 'should', 'after', 'being', 'now', 'made', 'before', 'here', 'through', 'when', 'where', 'much', 'good', 'well', 'some', 'very', 'more', 'most', 'many'].includes(word));

    // Get word frequency
    const wordCount = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Return top keywords
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);
  }

  public getAnalysisHistory(): ToneAnalysis[] {
    return [...this.analysisHistory];
  }

  public getAnalysisById(id: string): ToneAnalysis | undefined {
    return this.analysisHistory.find(analysis => analysis.id === id);
  }
}
