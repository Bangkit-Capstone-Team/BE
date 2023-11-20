const UserModel = require('../models/UserModel');

const getUsers = (req, res) => {
  UserModel
    .findAll()
    .then((datas) => res.json(datas))
    .catch((err) => console.error(err));
};

const getUserById = (req, res) => {
    UserModel.findAll({ where: { id: req.params.id } })
        .then((data) => res.json(data))
        .catch(err => {
            res.statusCode = 500
            res.send("Server Error")
        })
};

const insertUser = (req, res) => {
  UserModel.create(req.body).then(() => res.json({ status: 'ok', msg: 'Data berhasil ditambahkan' }));
};

const updateDataUser = (req, res) => {
    UserModel.update(req.body, { where: { id_product: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil diperbarui' }));
};

const deleteUser = (req, res) => {
    UserModel.destroy({ where: { id_product: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }));
};

module.exports = {
    getUsers,
    getUserById,
    insertUser,
    updateDataUser,
    deleteUser
};
