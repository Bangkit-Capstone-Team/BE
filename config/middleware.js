const jwt = require('jsonwebtoken')

module.exports = {
    verifyUser: (req, res, next) => {
        console.log(req.cookies)
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.replace("Bearer ", "")

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
            if (err) return res.status(401).json({msg: "Invalid Token"})
            // if(decode.role == "user") return res.sendStatus(403)
            next()
        })
    },
}