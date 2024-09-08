import { GoogleAIFileManager } from '@google/generative-ai/server';
import { FileManager } from '../../application/interfaces/fileManager';

export class GoogleAIFileManagerAdapter implements FileManager {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async uploadFile(
    filePath: string, options: {
      mimeType: string;
      displayName: string
    }): Promise<any> {
    const fileManager = new GoogleAIFileManager(this.apiKey);
    return fileManager.uploadFile(filePath, options);
  }
}