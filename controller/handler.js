const model = require('../models/model');

const getDataAll = (req, res) => {
  model
    .findAll()
    .then((datas) => res.json(datas))
    .catch((err) => console.error(err));
};

const getDataById = (req, res) => {
    model.findAll({ where: { id_product: req.params.id } })
        .then((data) => res.json(data))
        .catch(err => {
            res.statusCode = 500
            res.send("Server Error")
        })
};

const insertProduct = (req, res) => {
  model.create(req.body).then(() => res.json({ status: 'ok', msg: 'Data berhasil ditambahkan' }));
};

const updateProduct = (req, res) => {
    model.update(req.body, { where: { id_product: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil diperbarui' }));
};

const deleteProduct = (req, res) => {
    model.destroy({ where: { id_product: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }));
};

module.exports = {
    getDataAll,
    getDataById,
    insertProduct,
    updateProduct,
    deleteProduct
};
