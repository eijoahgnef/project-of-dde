const router = require('koa-router')()
const jwt = require('../utils/jwt')
const userService = require('../controllers/mySqlConfig')
const moment = require('moment')

// 日记本列表
router.get('/diary/list', jwt.verify(), async (ctx) => {
 
    let info = ctx.query.data
    await userService.getDiaryList(info).then(res => {
        for (let i = 0; i < res.length; i++) {
            res[i].keep_date = moment(res[i].keep_date).format("YYYY-MM-DD")
        }
        ctx.body = {
            code: 200,
            data: res
        }
    })
})

// 写日记
router.post('/diary/keep', jwt.verify(), async (ctx) => {
    await userService.addDiary(ctx.request.body)
    ctx.body = {
        code: 200,
        msg: "记录每一天"
    }
}) 

// 查看日记内容
router.get('/diary/content', jwt.verify(), async (ctx) => {
    let account = ctx.query.account
    let insert_id = ctx.query.insert_id
    await userService.getDiaryContent(account, insert_id).then(res => {
        if (res.length) {
            res[0].keep_date = moment(res[0].keep_date).format("YYYY-MM-DD")
            ctx.body = {
                code: 200,
                data: res
            }
        } else {
            ctx.body = {
                code: 404,
                data: '未知原因，找不到数据'
            }
        }
    })
})

module.exports = router