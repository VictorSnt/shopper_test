import * as dotenv from 'dotenv';
import { ImageProcessingService } from '../services/imageProcessingService';
import { GoogleAIFileManagerAdapter } from '../../adapters/services/googleFileManager';
import { GoogleGenerativeAIAdapter } from '../../adapters/services/googleGenerativeAi';
import { GeminiImageReader } from '../../adapters/services/geminiImageReader';



dotenv.config();
export interface UploadAndProcessImageRequest {
  imageBase64String: string;
}

export interface UploadAndProcessImageResponse {
  imageUrl: string,
  measureValue: number
}

export class UploadAndProcessImage {
  async execute(request: UploadAndProcessImageRequest):
    Promise<UploadAndProcessImageResponse> {

    const { imageBase64String } = request;
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY must be set in .env file');
    }
    const fileManager = new GoogleAIFileManagerAdapter(process.env.GEMINI_API_KEY);
    const generativeAI = new GoogleGenerativeAIAdapter(process.env.GEMINI_API_KEY);
    const geminiReader = new GeminiImageReader(fileManager, generativeAI);
    const imgProcessor = new ImageProcessingService(geminiReader)
    const response = await imgProcessor.processImage(imageBase64String);

    return response;
  }


}
