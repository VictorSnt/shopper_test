import { UploadAndProcessImageResponse } from 'application/usecases/uploadAndProcessImage';
import { ImageReader } from 'domain/interfaces/imageReader';

export class MockImageReader implements ImageReader {
  async uploadAndReadImage(base64Image: string):
    Promise<UploadAndProcessImageResponse> {
    return {
      imageUrl: 'http://localhost:3000/uploads/',
      measureValue: 12
    }
  }
}