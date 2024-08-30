export interface FileManager {
  uploadFile(
    filePath: string,
    options: {
      mimeType: string;
      displayName: string
    }): Promise<any>;
}