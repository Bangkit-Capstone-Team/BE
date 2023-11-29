const { Has_categories } = require('../database/models')

//has_categories
const getHasCategories = (req, res) => {
    Has_categories
      .findAll()
      .then((datas) => res.json(datas))
      .catch((err) => console.error(err));
  };
  
  const getHasCategoryById = (req, res) => {
    Has_categories.findAll({ where: { id: req.params.id } })
          .then((data) => res.json(data))
          .catch(err => {
              res.statusCode = 500
              res.send("Server Error")
          })
  };
  
  const insertHasCategory = (req, res) => {
    Has_categories.create(req.body).then(() => res.json({ status: 'ok', msg: 'Data berhasil ditambahkan' }));
  };
  
  const updateDataHasCategory = (req, res) => {
    Has_categories.update(req.body, { where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil diperbarui' }));
  };
  
  const deleteHasCategory = (req, res) => {
    Has_categories.destroy({ where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }));
  };

  module.exports = {
    getHasCategories,
    getHasCategoryById,
    insertHasCategory,
    updateDataHasCategory,
    deleteHasCategory
  }