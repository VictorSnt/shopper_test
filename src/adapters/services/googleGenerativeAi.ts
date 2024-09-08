import { GoogleGenerativeAI } from '@google/generative-ai';
import { GenerativeAI } from '../../application/interfaces/generativeAi';

export class GoogleGenerativeAIAdapter implements GenerativeAI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateContent(params: any[]): Promise<any> {
    const genAI = new GoogleGenerativeAI(this.apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    return model.generateContent(params);
  }
}