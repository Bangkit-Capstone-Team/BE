const {Users} = require('../database/models');
const { decrypt } = require('../helper/bcrypt');
const jwt = require('jsonwebtoken')

const authLogin = async (req, res) => {
    // console.log(req.body)
    const { username, password } = req.body

    Users
        .findAll({ where: { username } })
        .then(data => {
            if (data.length == 0) return res.status(401).json({status: false, msg: 'Username atau password salah' });

            decrypt(password, data[0].password, match => {
                if (!match) return res.status(401).json({ status: false, msg: 'Username atau password salah' });

                const { id, email, type_role } = data[0];
                const access_token = jwt.sign({ id, email, role: type_role }, process.env.ACCESS_TOKEN, { expiresIn: '600s' });
                const refresh_token = jwt.sign({ id, email, role: type_role }, process.env.REFRESH_TOKEN, { expiresIn: '90d' });
    
                return res.json({status: true, access_token, refresh_token });
            });
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.send('Server Error');
        })
}

const register =  (req, res) => {
    Users.create(req.body)
    .then(() => res.status(201).json({ status: true, msg: 'Registrasi berhasil' }))
    .catch((err) => {
        console.error(err);
        res.statusCode = 500;
        res.send('Server Error');
    });
}

module.exports = {authLogin, register}