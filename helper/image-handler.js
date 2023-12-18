const multer = require('multer');
const path = require('path');
const fs = require('fs')
const {Storage} = require('@google-cloud/storage')

const storageBucket = new Storage({keyFilename: path.join(__dirname, '../service_account.json')})
const bucketName = "e_doc"
const bucket = storageBucket.bucket(bucketName)

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
  process_image: (req, res, next) => {
    next()
  },
  get_files_content: multer({ storage: diskStorage }).fields([{ name: 'thumbnail' }, { name: 'source' }]),
  upload_to_bucket: (req, res, next) => {
    const keyFiles = Object.keys(req.files)

    if (!req.files['thumbnail'][0].mimetype.includes('image') || !req.files['source'][0].mimetype.includes('video')) {
      keyFiles.forEach(key => fs.unlinkSync(req.files[key][0].path))
      return res.status(400).json({status: false, msg: 'thumbnail atau source yang diinputkan harus image atau video'})
    }

    keyFiles.forEach(async key => {
      const {path, filename, mimetype} = req.files[key][0]
      const folder = mimetype.includes('image') ? 'images' : 'videos'
      
      bucket.upload(path, {destination: `${folder}/${filename}`}, (err, file) => {
        if(err) {
          console.log(err);
          res.status(500).send("Server Error");
          return;
        }
        fs.unlinkSync(path)
      })
    })

    next()
  }
};