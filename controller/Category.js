const  { Category }  = require('../src/models');
  
  //categories
  const getCategories = (req, res) => {
    Category
      .findAll()
      .then((datas) => res.json(datas))
      .catch((err) => console.error(err));
  };
  
  const getCategoryById = (req, res) => {
    Category.findAll({ where: { id: req.params.id } })
          .then((data) => res.json(data))
          .catch(err => {
              res.statusCode = 500
              res.send("Server Error")
          })
  };
  
  const insertCategory = (req, res) => {
    Category.create(req.body).then(() => res.json({ status: 'ok', msg: 'Data berhasil ditambahkan' }));
  };
  
  const updateCategory = (req, res) => {
    Category.update(req.body, { where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil diperbarui' }));
  };
  
  const deleteCategory = (req, res) => {
    Category.destroy({ where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }));
  };

  module.exports = {

    getCategories,
    getCategoryById,
    insertCategory,
    updateCategory,
    deleteCategory
  }