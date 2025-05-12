import { diskStorage } from 'multer';

export const MulterOptions = {
  storage: diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      const originalNameSplit = file.originalname.split('.');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname +
          '-' +
          uniqueSuffix +
          '.' +
          originalNameSplit[originalNameSplit.length - 1],
      );
    },
  }),
};
