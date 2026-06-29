// import { BadRequestException } from '@nestjs/common';

// // Multer configurations for uploading multiple files
// export const uploadImagesConfig = {
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },

//   fileFilter(req, file, cb) {
//     if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
//       return cb(
//         new BadRequestException('Only JPEG, PNG, WEBP files are allowed'),
//         false,
//       );
//     }

//     cb(null, true);
//   },
// };
