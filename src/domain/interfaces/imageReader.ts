import { UploadAndProcessImageResponse } from 'application/usecases/uploadAndProcessImage';

export interface ImageReader {
  uploadAndReadImage(base64Image: string):
    Promise<UploadAndProcessImageResponse>;
}