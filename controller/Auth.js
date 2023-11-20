const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authLogin = async (req, res) => {
    const { username, password } = req.body

    try {
        const userData = await UserModel.findAll({ where: { username } })
        const match = await bcrypt.compare(password, userData[0].password)
        if (!match) return res.status(400).json({ msg: "Password salah" })
        
        const {id, email, type_role} = userData[0]
        const token = jwt.sign({ id, email, role: type_role }, process.env.TOKEN_SECRET, {expiresIn: '1d'});
        res.cookie('token', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        res.send(token)
    } catch (error) {
        res.status(404).json({msg: "Username tidak ditemukan"})
    }
}

module.exports = {authLogin}