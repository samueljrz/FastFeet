import multer from 'multer';
import multerConfig from '../../config/multer';

const upload = multer(multerConfig);
const multerMiddleware = upload.single('file');

export default multerMiddleware;
