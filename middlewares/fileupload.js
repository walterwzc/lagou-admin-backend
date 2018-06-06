const multer = require('multer')
const path = require('path')

let fileName = ''


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/uploads/'))
    },
    filename: (req, file, cb) => {
        fileName =
            file.fieldname +
            '-' +
            new Date().getTime() +
            '.' +
            getExtention(file.originalname);

        // console.log(fileName);
        
        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.originalname.match(/\.(png|jpg|jpeg|gif)$/i)) {
        cb(null, true)
    } else {
        cb(new Error('image only.'))
    }
}

function getExtention(str) {
    const ext = str.split('.')
    return ext[ext.length - 1]
}

const Fileupload = fieldName => {
    return (req, res, next) => {
        res.set('Content-Type', 'application/json; charset=utf8')
        const upload = multer({ storage, fileFilter }).single(fieldName)
        upload(req, res, err => {
            if (err) {
                res.render('position/err.ejs', { errorMsg: err.message })
            } else {
                // console.log(req.body)
                req.fileName = fileName
                next()
            }
        })
    }
}

module.exports = Fileupload
