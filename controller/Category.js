const { Categories } = require('../database/models');

//categories
const getCategories = (req, res) => {
  Categories.findAll()
    .then((datas) => res.json(datas))
    .catch((err) => {
      res.statusCode = 500;
      res.send('Server Error');
    });
};

const getCategoryById = (req, res) => {
  Categories.findAll({ where: { id: req.params.id } })
    .then((data) => {
      if (data.length == 0) return res.status(404).json({ status: false, msg: 'id tidak ditemukan' });
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.send('Server Error');
    });
};

const insertCategory = (req, res) => {
  Categories.create(req.body)
    .then(() => res.json({ status: true, msg: 'Data berhasil ditambahkan' }))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server Error');
    });
};

const updateCategory = (req, res) => {
  Categories.update(req.body, { where: { id: req.params.id } })
    .then(() => res.json({ status: true, msg: 'Data berhasil diperbarui' }))
    .catch((err) => {
      console.log(err);
      res.status(500).send('server error');
    });
};

const deleteCategory = (req, res) => {
  Categories.destroy({ where: {id: req.params.id} })
    .then(() => res.json({ status: true, msg: 'Data berhasil terhapus' }))
    .catch(err => {
      console.log(err);
      res.status(500).send('server error');
    })
};

module.exports = {
  getCategories,
  getCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory,
};
