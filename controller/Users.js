const { Users } = require('../database/models');

const bcrypt = require('bcrypt')

const getUsers = (req, res) => {
  Users.findAll()
    .then((datas) => res.json(datas))
    .catch((err) => console.error(err));
};

const getUserById = (req, res) => {
  Users.findAll({ where: { id: req.params.id } })
    .then((data) => res.json(data))
    .catch((err) => {
      res.statusCode = 500;
      res.send('Server Error');
    });
};

const insertUser = (req, res) => {
  const { password } = req.body;
  req.body.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  
  Users.create(req.body).then(() => res.json({ status: 'ok', msg: 'Data berhasil ditambahkan' }));
};

const updateDataUser = (req, res) => {
  Users.update(req.body, { where: { id_product: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil diperbarui' }));
};

const deleteUser = (req, res) => {
  Users.destroy({ where: { id_product: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }));
};

module.exports = {
  getUsers,
  getUserById,
  insertUser,
  updateDataUser,
  deleteUser,
};
