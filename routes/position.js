const express = require('express')
const PositionController = require('../controllers/PositionController')
const Fileupload = require('../middlewares/fileupload')

const router = express.Router()

// 管理系统接口
router.route('/add').post(Fileupload('companyLogo'), PositionController.add)

router.route('/item/:id').get(PositionController.item)

router.route('/edit/:id')
    .post(Fileupload('companyLogo'), PositionController.edit)

router.route('/remove/:id').get(PositionController.remove)

router.route('/list/:pageno').get(PositionController.list)

router.route('/search').post(PositionController.search)

// M站的接口
router.route('/m/list').get(PositionController.m_list)

module.exports = router
