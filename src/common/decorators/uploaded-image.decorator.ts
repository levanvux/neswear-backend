import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
} from '@nestjs/common';

// Decorator for uploading one file
export const UploadedImage = () =>
  UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 5 * 1024 * 1024,
        }),
        new FileTypeValidator({
          fileType: /^image\/(jpeg|jpg|png|webp)$/,
        }),
      ],
    }),
  );
