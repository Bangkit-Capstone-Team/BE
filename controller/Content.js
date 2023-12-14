const { Contents, Products } = require('../database/models');
const { Op } = require('sequelize');

//content
const getContents = (req, res) => {
  Contents.findAll()
    .then((datas) => res.json(datas))
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send('Server Error');
    });
};

const getContentById = (req, res) => {
  Contents.findAll({ where: { id: req.params.id } })
    .then((data) => {
      if (data.length == 0) return res.status(404).json({ msg: 'id content not found' });
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send('Server Error');
    });
};

const searchContent = (req, res) => {
  const keyword = req.params.keyword;

  Contents.findAll({ where: { title: { [Op.like]: `%${keyword}%` } } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server Error');
    });
};

const searchContentByImage = (req, res) => {
  res.status(200).json(req.file);
};

const insertContent = (req, res) => {
  const thumbnail = req.files['thumbnail'][0];
  const source = req.files['source'][0];
  req.body.thumbnail = thumbnail.filename
  req.body.source = source.filename

  Contents.create(req.body)
    .then(() => res.json({ status: true, msg: 'Data berhasil ditambahkan' }))
    .catch((error) => {
      console.error(error);
      res.status(500).send('server error');
    });
};

const updateContent = (req, res) => {
  Contents.update(req.body, { where: { id: req.params.id } })
    .then(() => res.json({ status: true, msg: 'Data berhasil diupdate' }))
    .catch((error) => {
      console.error(error);
      res.status(500).send('server error');
    });
};

const deleteContent = (req, res) => {
  Contents.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ status: true, msg: 'Data berhasil terhapus' }))
    .catch((error) => {
      console.error(error);
      res.status(500).send('server error');
    });
};

module.exports = {
  getContents,
  getContentById,
  searchContent,
  searchContentByImage,
  insertContent,
  updateContent,
  deleteContent,
};
