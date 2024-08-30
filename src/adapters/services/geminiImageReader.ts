import { ImageReader } from '../../domain/interfaces/imageReader';
import { FileManager } from '../../domain/interfaces/fileManager';
import { GenerativeAI } from '../../domain/interfaces/generativeAi';
import { UploadAndProcessImageResponse } from '../../application/usecases/uploadAndProcessImage';
import { extractNumericContent } from '../../application/util/formaters';

export class GeminiImageReader implements ImageReader {
  private fileManager: FileManager;
  private generativeAI: GenerativeAI;

  constructor(fileManager: FileManager, generativeAI: GenerativeAI) {
    this.fileManager = fileManager;
    this.generativeAI = generativeAI;
  }

  async uploadAndReadImage(imagePath: string):
    Promise<UploadAndProcessImageResponse> {

    const uploadResponse = await this.fileManager.uploadFile(imagePath, {
      mimeType: 'image/jpeg',
      displayName: 'Measurement device',
    });
    
    const operation = async () => {
      return await this.generativeAI.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri,
          },
        },
        { text: 'what is the measurement of this device using only numbers.' },
      ]);
    };

    const result = await this.retryOperation(operation, 3, 10000);
    const numericString = extractNumericContent(result.response.text());
    const response: UploadAndProcessImageResponse = {
      imageUrl: uploadResponse.file.uri,
      measureValue: parseInt(numericString),
    };
    return response;
  }

  async retryOperation<T>(
    operation: () => Promise<T>, maxRetries: number, delay: number
  ): Promise<T> {
    let lastError: any;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        lastError = error;
        console.error(`Attempt ${attempt + 1} failed: ${error.message}`);
        if (attempt < maxRetries - 1) {
          await new Promise(res => setTimeout(res, delay));
        }
      }
    }
    throw new Error(`Operation failed after ${maxRetries} attempts: ${lastError.message}`);
  }
}