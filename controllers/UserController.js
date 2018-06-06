const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const issignin = (req, res, next) => {
    res.render('users/issignin.ejs', { issignin: true, username: req.username })
}

const signup = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    bcrypt.hash(password, 10).then(cryptPassword => {
        userModel.signup({
            username,
            password: cryptPassword,
            cb: result => {
                if (result) {
                    res.render('users/signup.ejs', { success: result })
                } else {
                    res.render('users/signup.ejs', { success: false })
                }
            }
        })
    })
}

const signin = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    userModel.signin({
        username,
        password,
        cb: result => {
            if (result) {
                bcrypt
                    .compare(password, result.password)
                    .then(compareResult => {
                        if (compareResult) {
                            res.render('users/signin.ejs', {
                                success: true,

                                // 在异步之中，所以 const getToken 可以进行提升的提升。

                                token: genToken(result.username),
                                username: result.username
                            })
                        } else {
                            res.render('users/signin.ejs', {
                                success: false,
                                token: '',
                                username: ''
                            })
                        }
                    })
            } else {
                res.render('users/signin.ejs', {
                    success: false,
                    token: '',
                    username: ''
                })
            }
        }
    })
}

const genToken = username => {
    const payload = {
        username
    }
    const secret = 'gp5'
    const token = jwt.sign(payload, secret)
    return token
}

module.exports = {
    issignin,
    signup,
    signin
}
