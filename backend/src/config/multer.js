import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),

    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname);
    const extok = ['.png', '.PNG', '.jpg', '.JPG', '.jpeg', '.JPEG'];
    if (!extok.includes(ext)) {
      return cb(new Error('Only images are allowed'));
    }
    return cb(null, true);
  },
};
