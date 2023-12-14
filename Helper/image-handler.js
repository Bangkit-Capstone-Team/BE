const multer = require('multer');
const path = require('path');
const fs = require('fs')
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
  get_image_search: multer({ storage: diskStorage }).single('image'),
  get_files_content: multer({ storage: diskStorage }).fields([{ name: 'thumbnail' }, { name: 'source' }]),
  proses_image: (req, res, next) => {
    next();
  },
};