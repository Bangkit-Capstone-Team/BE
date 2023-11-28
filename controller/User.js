const  { User }  = require('../src/models');


//Handler User
const getUsers = (req, res) => {
  User
    .findAll()
    .then((datas) => res.json(datas))
    .catch((err) => console.error(err));
};

const getUserById = (req, res) => {
    User.findAll({ where: { id: req.params.id } })
        .then((data) => res.json(data))
        .catch(err => {
            res.statusCode = 500
            res.send("Server Error")
        })
};

const insertUser = (req, res) => {
  User.create(req.body).then(() => res.json({ status: 'ok', msg: 'Data berhasil ditambahkan' }));
};

const updateDataUser = (req, res) => {
    User.update(req.body, { where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil diperbarui' }));
};

const deleteUser = (req, res) => {
    User.destroy({ where: { id: req.params.id } }).then(() => res.json({ status: 'ok', msg: 'Data berhasil terhapus' }));
};

module.exports = {
    getUsers,
    getUserById,
    insertUser,
    updateDataUser,
    deleteUser,
}