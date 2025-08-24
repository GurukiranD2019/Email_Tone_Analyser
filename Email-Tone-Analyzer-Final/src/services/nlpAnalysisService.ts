import Sentiment from 'sentiment';
import nlp from 'compromise';
import { PorterStemmer, WordTokenizer } from 'natural';
import type { ToneAnalysis, AnalysisResult } from '../types';

// Advanced NLP-based analysis service
export class NLPAnalysisService {
  private static instance: NLPAnalysisService;
  private sentiment: Sentiment;
  private analysisHistory: ToneAnalysis[] = [];

  private constructor() {
    this.sentiment = new Sentiment();
    
    // Add custom words to sentiment lexicon for email context
    this.sentiment.registerLanguage('en', {
      labels: { 'positive': 1, 'negative': -1 }
    });
  }

  public static getInstance(): NLPAnalysisService {
    if (!NLPAnalysisService.instance) {
      NLPAnalysisService.instance = new NLPAnalysisService();
    }
    return NLPAnalysisService.instance;
  }

  public async analyzeEmail(emailContent: string): Promise<AnalysisResult> {
    try {
      // Simulate processing time for realistic UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      const analysis = await this.performNLPAnalysis(emailContent);
      this.analysisHistory.push(analysis);

      return { success: true, data: analysis };
    } catch (error) {
      console.error('NLP Analysis Error:', error);
      return { 
        success: false, 
        error: 'Failed to analyze email with NLP. Please try again.' 
      };
    }
  }

  private async performNLPAnalysis(emailContent: string): Promise<ToneAnalysis> {
    const id = Math.random().toString(36).substr(2, 9);
    
    // Use compromise for advanced text parsing
    const doc = nlp(emailContent);
    
    // Sentiment analysis using the sentiment library
    const sentimentResult = this.sentiment.analyze(emailContent);
    
    // Extract linguistic features
    const sentences = doc.sentences().out('array');
    const verbs = doc.verbs().out('array');
    const adjectives = doc.adjectives().out('array');
    const nouns = doc.nouns().out('array');
    
    // Analyze formality
    const formalityAnalysis = this.analyzeFormalityLevel(doc, emailContent);
    
    // Analyze emotional intensity
    const emotionalAnalysis = this.analyzeEmotionalIntensity(emailContent, adjectives, verbs);
    
    // Analyze confidence and certainty
    const confidenceAnalysis = this.analyzeConfidenceLevel(doc, emailContent);
    
    // Determine overall sentiment
    const overallSentiment = this.determineOverallSentiment(sentimentResult.score);
    
    // Calculate tone scores using NLP
    const tones = this.calculateToneScores(
      sentimentResult,
      formalityAnalysis,
      emotionalAnalysis,
      confidenceAnalysis
    );
    
    // Generate intelligent suggestions
    const suggestions = this.generateIntelligentSuggestions(
      overallSentiment,
      formalityAnalysis,
      emotionalAnalysis,
      confidenceAnalysis,
      sentimentResult
    );
    
    // Extract meaningful keywords using NLP
    const keywords = this.extractNLPKeywords(emailContent, nouns, adjectives);
    
    // Calculate confidence score based on text length and complexity
    const confidence = this.calculateConfidenceScore(emailContent, sentences.length);

    return {
      id,
      emailContent,
      timestamp: new Date(),
      overallSentiment,
      confidence,
      tones,
      suggestions,
      keywords
    };
  }

  private analyzeFormalityLevel(doc: any, content: string): number {
    const formalIndicators = [
      'dear', 'sincerely', 'regards', 'respectfully', 'kindly', 'please',
      'thank you', 'appreciate', 'professional', 'formal', 'official'
    ];
    
    const informalIndicators = [
      'hey', 'hi', 'sup', 'yeah', 'ok', 'cool', 'awesome', 'thanks',
      'cheers', 'catch up', 'hang out', 'stuff', 'things'
    ];
    
    const contractions = doc.contractions().length;
    const avgSentenceLength = doc.sentences().length > 0 ? 
      content.split(' ').length / doc.sentences().length : 0;
    
    const formalCount = formalIndicators.reduce((count, word) => 
      count + (content.toLowerCase().includes(word) ? 1 : 0), 0);
    
    const informalCount = informalIndicators.reduce((count, word) => 
      count + (content.toLowerCase().includes(word) ? 1 : 0), 0);
    
    let formalityScore = 50; // Base neutral score
    
    // Adjust based on formal vs informal indicators
    formalityScore += (formalCount * 10) - (informalCount * 8);
    
    // Longer sentences suggest formality
    if (avgSentenceLength > 15) formalityScore += 15;
    if (avgSentenceLength < 8) formalityScore -= 10;
    
    // Contractions suggest informality
    formalityScore -= contractions * 5;
    
    return Math.max(0, Math.min(100, formalityScore));
  }

  private analyzeEmotionalIntensity(content: string, adjectives: string[], verbs: string[]): {
    enthusiasm: number;
    anger: number;
    analytical: number;
  } {
    const enthusiasticWords = [
      'amazing', 'fantastic', 'excellent', 'wonderful', 'outstanding',
      'brilliant', 'incredible', 'awesome', 'excited', 'thrilled'
    ];
    
    const angryWords = [
      'terrible', 'awful', 'disgusting', 'furious', 'outraged',
      'unacceptable', 'disappointed', 'frustrated', 'angry', 'livid'
    ];
    
    const analyticalWords = [
      'analyze', 'consider', 'evaluate', 'assess', 'examine',
      'therefore', 'however', 'consequently', 'furthermore', 'moreover'
    ];
    
    const allWords = [...adjectives, ...verbs, ...content.toLowerCase().split(' ')];
    
    const enthusiasmCount = allWords.filter(word => 
      enthusiasticWords.some(ew => word.includes(ew))).length;
    
    const angerCount = allWords.filter(word => 
      angryWords.some(aw => word.includes(aw))).length;
    
    const analyticalCount = allWords.filter(word => 
      analyticalWords.some(anw => word.includes(anw))).length;
    
    const totalWords = allWords.length;
    
    return {
      enthusiasm: Math.min(100, (enthusiasmCount / totalWords) * 500),
      anger: Math.min(100, (angerCount / totalWords) * 600),
      analytical: Math.min(100, (analyticalCount / totalWords) * 400 + 30)
    };
  }

  private analyzeConfidenceLevel(doc: any, content: string): {
    confident: number;
    tentative: number;
  } {
    const confidentWords = [
      'will', 'definitely', 'certainly', 'absolutely', 'confident',
      'sure', 'guarantee', 'promise', 'commit', 'determined'
    ];
    
    const tentativeWords = [
      'maybe', 'perhaps', 'possibly', 'might', 'could',
      'uncertain', 'unsure', 'think', 'believe', 'seem'
    ];
    
    const words = content.toLowerCase().split(' ');
    const questions = doc.questions().length;
    
    const confidentCount = words.filter(word => 
      confidentWords.some(cw => word.includes(cw))).length;
    
    const tentativeCount = words.filter(word => 
      tentativeWords.some(tw => word.includes(tw))).length;
    
    const totalWords = words.length;
    
    let confidentScore = 50 + (confidentCount / totalWords) * 300;
    let tentativeScore = 30 + (tentativeCount / totalWords) * 400;
    
    // Questions suggest uncertainty
    tentativeScore += questions * 10;
    confidentScore -= questions * 5;
    
    return {
      confident: Math.max(0, Math.min(100, confidentScore)),
      tentative: Math.max(0, Math.min(100, tentativeScore))
    };
  }

  private determineOverallSentiment(sentimentScore: number): 'positive' | 'negative' | 'neutral' {
    if (sentimentScore > 2) return 'positive';
    if (sentimentScore < -2) return 'negative';
    return 'neutral';
  }

  private calculateToneScores(
    sentimentResult: any,
    formalityAnalysis: number,
    emotionalAnalysis: any,
    confidenceAnalysis: any
  ): ToneAnalysis['tones'] {
    const score = sentimentResult.score;
    const positiveWords = sentimentResult.positive.length;
    const negativeWords = sentimentResult.negative.length;
    const totalWords = sentimentResult.tokens.length;
    
    // Calculate scores based on sentiment analysis
    let positive = Math.max(10, Math.min(90, 
      50 + score * 8 + (positiveWords / totalWords) * 200));
    
    let negative = Math.max(5, Math.min(85, 
      20 - score * 6 + (negativeWords / totalWords) * 200));
    
    let neutral = Math.max(10, Math.min(80, 
      100 - positive - negative + 20));
    
    // Normalize to ensure they don't exceed reasonable bounds
    const total = positive + negative + neutral;
    if (total > 100) {
      const factor = 100 / total;
      positive *= factor;
      negative *= factor;
      neutral *= factor;
    }
    
    return {
      positive: Math.round(positive),
      negative: Math.round(negative),
      neutral: Math.round(neutral),
      angry: Math.round(emotionalAnalysis.anger),
      enthusiastic: Math.round(emotionalAnalysis.enthusiasm),
      formal: Math.round(formalityAnalysis),
      informal: Math.round(100 - formalityAnalysis),
      analytical: Math.round(emotionalAnalysis.analytical),
      confident: Math.round(confidenceAnalysis.confident),
      tentative: Math.round(confidenceAnalysis.tentative)
    };
  }

  private generateIntelligentSuggestions(
    sentiment: string,
    formality: number,
    emotional: any,
    confidence: any,
    sentimentResult: any
  ): string[] {
    const suggestions: string[] = [];
    
    // Sentiment-based suggestions
    if (sentiment === 'negative' && sentimentResult.score < -5) {
      suggestions.push('Consider revising negative language to maintain professional relationships');
      suggestions.push('Try to frame concerns as opportunities for improvement');
    }
    
    if (sentiment === 'positive' && sentimentResult.score > 8) {
      suggestions.push('Excellent positive tone! This email should be well-received');
    }
    
    // Emotional intensity suggestions
    if (emotional.anger > 70) {
      suggestions.push('High emotional intensity detected. Consider cooling down before sending');
      suggestions.push('Focus on specific actions rather than emotional responses');
    }
    
    if (emotional.enthusiasm > 80) {
      suggestions.push('Great enthusiasm! Ensure the energy matches your audience');
    }
    
    // Formality suggestions
    if (formality < 30) {
      suggestions.push('Consider using more formal language for professional communication');
      suggestions.push('Add proper greetings and closings to improve professionalism');
    }
    
    if (formality > 85) {
      suggestions.push('Very formal tone detected. Consider adding warmth if appropriate for the relationship');
    }
    
    // Confidence suggestions
    if (confidence.tentative > 70) {
      suggestions.push('Consider using more decisive language to convey confidence');
      suggestions.push('Replace uncertain phrases with more assertive alternatives');
    }
    
    if (confidence.confident > 85) {
      suggestions.push('Strong confident tone. Ensure it doesn\'t come across as arrogant');
    }
    
    // Neutral sentiment suggestions
    if (sentiment === 'neutral' && sentimentResult.score === 0) {
      suggestions.push('Consider adding more emotional connection to engage your reader');
    }
    
    return suggestions.length > 0 ? suggestions : 
      ['Your email has a balanced tone appropriate for professional communication'];
  }

  private extractNLPKeywords(content: string, nouns: string[], adjectives: string[]): string[] {
    const tokenizer = new WordTokenizer();
    const tokens = tokenizer.tokenize(content.toLowerCase()) || [];
    
    // Remove common stop words and short words
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have',
      'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you',
      'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
    ]);
    
    const meaningfulWords = tokens
      .filter(token => token.length > 3)
      .filter(token => !stopWords.has(token))
      .filter(token => /^[a-zA-Z]+$/.test(token));
    
    // Use stemming to group similar words
    const stemmedWords = meaningfulWords.map(word => PorterStemmer.stem(word));
    
    // Count frequency
    const frequency: Record<string, { count: number; original: string }> = {};
    meaningfulWords.forEach((word, index) => {
      const stem = stemmedWords[index];
      if (!frequency[stem] || frequency[stem].original.length > word.length) {
        frequency[stem] = { 
          count: (frequency[stem]?.count || 0) + 1, 
          original: word 
        };
      } else {
        frequency[stem].count++;
      }
    });
    
    // Prioritize nouns and adjectives
    const importantWords = [...nouns, ...adjectives].map(word => word.toLowerCase());
    
    // Sort by frequency and importance
    const keywords = Object.entries(frequency)
      .map(([, data]) => ({
        word: data.original,
        count: data.count,
        important: importantWords.includes(data.original)
      }))
      .sort((a, b) => {
        if (a.important && !b.important) return -1;
        if (!a.important && b.important) return 1;
        return b.count - a.count;
      })
      .slice(0, 8)
      .map(item => item.word);
    
    return keywords;
  }

  private calculateConfidenceScore(content: string, sentenceCount: number): number {
    const wordCount = content.split(' ').length;
    
    // Base confidence on text length and complexity
    let confidence = 0.6; // Base confidence
    
    // More text generally means higher confidence
    if (wordCount > 100) confidence += 0.2;
    if (wordCount > 200) confidence += 0.1;
    
    // Reasonable sentence structure
    if (sentenceCount > 0) {
      const avgWordsPerSentence = wordCount / sentenceCount;
      if (avgWordsPerSentence >= 8 && avgWordsPerSentence <= 25) {
        confidence += 0.1;
      }
    }
    
    // Penalize very short content
    if (wordCount < 20) confidence -= 0.2;
    
    return Math.max(0.5, Math.min(0.95, confidence));
  }

  public getAnalysisHistory(): ToneAnalysis[] {
    return [...this.analysisHistory];
  }

  public getAnalysisById(id: string): ToneAnalysis | undefined {
    return this.analysisHistory.find(analysis => analysis.id === id);
  }
}
