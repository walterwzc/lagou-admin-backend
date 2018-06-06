const positionModel = require('../models/position')
require('../utils/date.format')

// 后台管理系统接口
const add = (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8')

    // console.log('---------------------------------------------------')
    // console.log(req.body);

    positionModel.add({
        ...req.body,
        companyLogo: req.fileName,
        createTime: new Date().Format('yyyy-MM-dd hh:mm'),
        cb: result => {
            if (result) {
                res.render('position/succ.ejs', {
                    data: JSON.stringify({
                        message: '恭喜你:) 数据添加成功'
                    })
                })
            } else {
                res.render('position/err.ejs', {
                    errorMsg: '数据添加失败:('
                })
            }
        }
    })
}

const list = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8')
    const pagesize = 5
    const pageno = parseInt(req.params.pageno, 10)
    const docs = (await positionModel.findAll()) || 0
    positionModel.list({
        limit: pagesize,
        skip: pageno * pagesize,
        cb: result => {
            if (result) {
                res.render('position/succ.ejs', {
                    data: JSON.stringify({
                        result,
                        pageno,
                        pagesize,
                        total: docs.length
                    })
                })
            } else {
                res.render('position/err.ejs', {
                    errorMsg: '数据获取失败~'
                })
            }
        }
    })
}

const item = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8')
    const id = req.params.id
    const result = await positionModel.findOne(id)
    res.render('position/succ.ejs', {
        data: JSON.stringify(result)
    })
}

const edit = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8')
    const id = req.params.id
    const result = await positionModel.update({
        id,
        ...req.body,
        companyLogo: req.fileName,
        createTime: new Date().Format('yyyy-MM-dd hh:mm')
    })
    if (result) {
        res.render('position/succ.ejs', {
            data: true
        })
    } else {
        res.render('position/err.ejs', {
            data: false
        })
    }
}

const remove = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8')
    const id = req.params.id
    const result = await positionModel.remove(id)
    if (result) {
        res.render('position/succ.ejs', {
            data: true
        })
    } else {
        res.render('position/err.ejs', {
            data: false
        })
    }
}

const search = async (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf8')
    const keywords = req.body.keywords
    const result = await positionModel.search(keywords)
    if (result) {
        res.render('position/succ.ejs', {
            data: JSON.stringify(result)
        })
    } else {
        res.render('position/err.ejs', {
            data: {
                message: '查询失败~'
            }
        })
    }
}

// M站接口
const m_list = (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')
    const { count, start } = req.query
    positionModel.list({
        count,
        start,
        cb: result => {
            if (result) {
                res.render('position/succ.ejs', {
                    data: JSON.stringify(result)
                })
            } else {
                res.render('position/err.ejs', {
                    data: {}
                })
            }
        }
    })
}

module.exports = {
    add,
    list,
    item,
    edit,
    remove,
    search,
    m_list
}
