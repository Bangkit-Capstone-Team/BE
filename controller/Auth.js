const {Users} = require('../database/models');
const { decrypt } = require('../helper/bcrypt');
const jwt = require('jsonwebtoken')

const authLogin = async (req, res) => {
    const { username, password } = req.body

    Users
        .findAll({ where: { username } })
        .then(data => {
            if (data.length == 0) return res.status(404).json({ msg: 'Username tidak ditemukan' });
            const match = decrypt(password, data[0].password);
            if (!match) return res.status(400).json({ msg: 'Password salah' });
            const { id, email, type_role } = userData[0];
            const access_token = jwt.sign({ id, email, role: type_role }, process.env.ACCESS_TOKEN, { expiresIn: '600s' });
            const refresh_token = jwt.sign({ id, email, role: type_role }, process.env.ACCESS_TOKEN, { expiresIn: '600s' });

            return res.json({ access_token, refresh_token });
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.send('Server Error');
        })

}

module.exports = {authLogin}