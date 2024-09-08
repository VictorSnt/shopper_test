import { expect, it } from 'vitest';
import { UploadAndProcessImageRequest, UploadAndProcessImage } from './uploadAndProcessImage';
import { readFileSync } from 'fs';
import path from 'path';
import { MockImageReader } from '../../adapters/services/mockImageReader';

it('Upload a valid image', async () => {
    const uploader = new MockImageReader();
    const imagePath = path.join(
        __dirname, '../../test/assert/test-image.png'
    );
    const imageBuffer = readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const response = await uploader.uploadAndReadImage(base64Image);
    expect(response.measureValue).toEqual(12);
    expect(response.imageUrl).toContain('http://localhost:3000/uploads/');
});

it('Image with wrong format', async () => {
    const uploader = new UploadAndProcessImage();

    const invalidBuffer = Buffer.from('this is not a valid image');
    const base64Image = invalidBuffer.toString('base64');
    const request: UploadAndProcessImageRequest = { imageBase64String: base64Image }

    await expect(uploader.execute(request))
        .rejects
        .toThrow();
});
