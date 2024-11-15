import multer from 'multer';
import fs from 'node:fs';

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public');
}

//Todo: multer multipart file handler setup.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public');
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
export default upload;
