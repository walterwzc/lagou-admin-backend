const db = require('./config')

const PositionSchema = new db.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyLogo: {
        type: String,
        required: true
    },
    positionName: {
        type: String,
        required: true
    },
    positionSalary: {
        type: String,
        required: true
    },
    createTime: {
        type: String,
        required: true
    }
})

const Position = db.model('Position', PositionSchema)

const add = ({
    companyName,
    companyLogo,
    positionName,
    positionSalary,
    createTime,
    cb
}) => {
    new Position({
        companyName,
        companyLogo,
        positionName,
        positionSalary,
        createTime
    })
        .save()
        .then(() => {
            cb(true)
        })
        .catch(err => {
            cb(false)
        })
}

const list = ({ limit, skip, cb }) => {
    Position.find()
        .limit(limit)
        .skip(skip)
        .sort({ _id: -1 })
        .then(result => {
            cb(result)
        })
        .catch(err => {
            cb(false)
        })
}

const findAll = async () => {
    return Position.find()
        .then(result => {
            return result
        })
        .catch(() => {
            return false
        })
}

const findOne = id => {
    return Position.findById(id)
        .then(result => {
            return result
        })
        .catch(() => {
            return false
        })
}

const update = ({
    id,
    companyLogo,
    companyName,
    positionName,
    positionSalary,
    createTime
}) => {
    const update = companyLogo
        ? {
              companyName,
              companyLogo,
              positionName,
              positionSalary,
              createTime
          }
        : {
              companyName,
              positionName,
              positionSalary,
              createTime
          }
    return Position.findByIdAndUpdate(id, update)
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}

const remove = id => {
    return Position.findByIdAndRemove(id)
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}

const search = keywords => {
    return Position.find({
        positionName: new RegExp(keywords)
    })
        .then(result => {
            return result
        })
        .catch(() => {
            return false
        })
}

module.exports = {
    add,
    list,
    findAll,
    findOne,
    update,
    remove,
    search
}

//end
