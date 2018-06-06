const jwt = require('jsonwebtoken')

const Authenticata = (req, res, next) => {
    const token = req.header('X-Access-Token')

    jwt.verify(token, 'gp5', (err, decoded) => {
        if (err) {
            res.render('users/issignin.ejs', { username: '', issignin: false })
        } else {
            req.username = decoded.username
            next()
        }
    })
    
}

module.exports = Authenticata
