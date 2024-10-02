import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

//Storage setup
const storage = multer.diskStorage({
  // You can immediately write it like this! => destination: TEMP_UPLOAD_DIR
  destination: function (req, file, callback) {
    callback(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now();
    const filename = `${uniqueSuffix}_${file.originalname}`;
    callback(null, filename);
  },
});

export const upload = multer({ storage });
