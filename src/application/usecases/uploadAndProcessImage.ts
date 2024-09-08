import { ImageProcessingService } from '../services/imageProcessingService';
import { GoogleAIFileManagerAdapter } from '../../adapters/services/googleFileManager';
import { GoogleGenerativeAIAdapter } from '../../adapters/services/googleGenerativeAi';
import { GeminiImageReader } from '../../adapters/services/geminiImageReader';
import { GEMINI_API_KEY } from '../../adapters/config/enviroment';


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
    
    const fileManager = new GoogleAIFileManagerAdapter(GEMINI_API_KEY);
    const generativeAI = new GoogleGenerativeAIAdapter(GEMINI_API_KEY);
    const geminiReader = new GeminiImageReader(fileManager, generativeAI);
    const imgProcessor = new ImageProcessingService(geminiReader)
    const response = await imgProcessor.processImage(imageBase64String);

    return response;
  }
}
