const {Users} = require('../database/models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authLogin = async (req, res) => {
    // console.log(req.body)
    const { username, password } = req.body

    try {
        const userData = await Users.findAll({ where: { username } })
        const match = await bcrypt.compare(password, userData[0].password)
        if (!match) return res.status(400).json({ msg: "Password salah" })
        
        const {id, email, type_role} = userData[0]
        const access_token = jwt.sign({ id, email, role: type_role }, process.env.ACCESS_TOKEN, {expiresIn: '60s'});
        const refresh_token = jwt.sign({ id, email, role: type_role }, process.env.REFRESH_TOKEN, {expiresIn: '90d'});

        res.json({access_token, refresh_token})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg: "Username tidak ditemukan"})
    }
}

module.exports = {authLogin}