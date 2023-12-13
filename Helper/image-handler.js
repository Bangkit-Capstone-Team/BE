const multer = require('multer');
const path = require('path');
const diskStorage = multer.diskStorage({
  // konfigurasi folder penyimpanan file
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../cache_images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

module.exports = {
  get_image: multer({ storage: diskStorage }).single('image'),
  proses_image: (req, res, next) => {
    next()
  }
}