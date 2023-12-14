const  { Users }  = require('../database/models');


//Handler User
const getUsers = (req, res) => {
  Users
    .findAll()
    .then((datas) => res.status(200).json(datas))
    .catch((err) => {
        console.error(err)
        res.statusCode = 500
        res.send("Server Error")
    });
};

const getUserById = (req, res) => {
    Users.findAll({ where: { id: req.params.id } })
        .then((data) => {
            if(data.length == 0) return res.status(404).json({status: true, msg: "id user not found"})
            res.json(data)
        })
        .catch(err => {
            console.log(err)
            res.statusCode = 500
            res.send("Server Error")
        })
};

const insertUser = (req, res) => {
    Users
        .create(req.body)
        .then(() => res.json({ status: true, msg: 'Data berhasil ditambahkan' }))
        .catch(err => {
            console.error(err)
            res.statusCode = 500
            res.send("Server Error")
        })
};

const updateDataUser = (req, res) => {
    Users
        .update(req.body, { where: { id: req.params.id } })
        .then(() => res.json({ status: true, msg: 'Data berhasil diperbarui' }))
        .catch(err => {
            console.error(err)
            res.statusCode = 500
            res.send("Server Error")
        })
};

const deleteUser = (req, res) => {
    Users
        .destroy({ where: { id: req.params.id } })
        .then(() => res.json({ status: true, msg: 'Data berhasil terhapus' }))
        .catch(err => {
            console.error(err)
            res.statusCode = 500
            res.send("Server Error")
        })
};

module.exports = {
    getUsers,
    getUserById,
    insertUser,
    updateDataUser,
    deleteUser,
}