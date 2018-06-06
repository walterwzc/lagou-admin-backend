const mongoose = require('./config')

const User = mongoose.model('User', {
    username: String,
    password: String
})

const signup = ({ username, password, cb }) => {
    // 先查询数据库，确定本用户是否在数据库里存在
    User.find({ username })
        .then(result => {
            if (result.length > 0) {
                cb(false)
            } else {
                new User({ username, password })
                    .save()
                    .then(() => {
                        cb(true)
                    })
                    .catch(() => {
                        cb(false)
                    })
            }
        })
        .catch(() => {
            cb(false)
        })
}

const signin = ({ username, cb }) => {
    User.findOne({ username })
        .then(result => {
            if (result) {
                cb(result)
            } else {
                cb(false)
            }
            console.log(result)
        })
        .catch(error => {
            console.log(error)
            cb(false)
        })
}

module.exports = {
    signup,
    signin
}
