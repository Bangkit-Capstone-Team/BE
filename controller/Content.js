const { Content } = require('../src/models')
const multer = require('multer')

//content
const getContents = (req, res) => {
    Content
      .findAll()
      .then((datas) => res.json(datas))
      .catch((err) => console.error(err));
  };
  
  const getContentById = (req, res) => {
    Content.findAll({ where: { id: req.params.id } })
          .then((data) => res.json(data))
          .catch(err => {
              res.statusCode = 500
              res.send("Server Error")
          })
  };

  //storage
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      return cb(null, '../../app/frontend-app/public/files')
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
  const upload = multer({storage})

// PERBAIKI
const insertContent = (req, res) => {
  upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'source', maxCount: 1 }])(req, res, function (err) {
    if (err) {
      // Handle Multer error
      console.error(err);
      return res.status(500).json({ status: 'error', msg: 'Multer error', error: err.message });
    }

    // Create Content instance using both req.body and req.files
    const contentData = {
      id_creator: req.body.id_creator,
      type_content: req.body.type_content,
      title: req.body.title,
      thumbnail: req.files['thumbnail'][0].filename,
      description: req.body.description,
      source: req.files['source'][0].filename,
      status: req.body.status
    };

    Content
      .create(contentData)
      .then(() => res.json({ status: 'ok', msg: 'Data berhasil ditambahkan' }))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ status: 'error', msg: 'Gagal menambahkan data', error: error.message });
      });
  });
};

// PERBAIKI

// PERBAIKI
const updateContent = (req, res) => {
  upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'source', maxCount: 1 }])(req, res, async function (err) {
    if (err) {
      // Handle Multer error
      console.error(err);
      return res.status(500).json({ status: 'error', msg: 'Multer error', error: err.message });
    }

    try {
      const existingContent = await Content.findOne({ where: { id: req.params.id } });

      if (!existingContent) {
        return res.status(404).json({ status: 'error', msg: 'Data not found' });
      }
      const contentData = {
        id_creator: req.body.id_creator,
        type_content: req.body.type_content,
        title: req.body.title,
        thumbnail: req.files['thumbnail'] ? req.files['thumbnail'][0].filename : existingContent.thumbnail,
        description: req.body.description,
        source: req.files['source'] ? req.files['source'][0].filename : existingContent.source,
        status: req.body.status,
      };

      // Perform the update
      await Content.update(contentData, { where: { id: req.params.id } });

      res.json({ status: 'ok', msg: 'Data berhasil diperbarui' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', msg: 'Gagal memperbarui data', error: error.message });
    }
  });
};
// PERBAIKI

  
  const deleteContent = (req, res) => {
    Content.destroy({ where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }));
  };

  module.exports = {

    getContents,
    getContentById,
    insertContent,
    updateContent,
    deleteContent
  }