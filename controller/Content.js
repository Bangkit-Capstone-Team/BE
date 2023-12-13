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
  const keyword = req.params.keyword

  Contents.findAll({ where: { title: { [Op.like]: `%${keyword}%` } } }).then((data) => {
    res.json(data);
  });
};

const searchContentByImage = (req, res) => {
  res.status(200).json(req.file)
};

const insertContent = (req, res) => {
  Contents.create(req.body)
    .then(() => res.json({ status: 'ok', msg: 'Data berhasil ditambahkan' }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'error', msg: 'Gagal menambahkan data', error: error.message });
    });
};

const updateContent = (req, res) => {
  Contents.update(req.body, { where: { id: req.params.id } })
    .then(() => res.json({ status: 'ok', msg: 'Data berhasil diupdate' }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'error', msg: 'Gagal menambahkan data', error: error.message });
    });
};
// PERBAIKI

const deleteContent = (req, res) => {
  Contents.destroy({ where: { id: req.params.id } })
    .then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ status: 'error', msg: 'Gagal menambahkan data', error: error.message });
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
