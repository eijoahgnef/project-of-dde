const router = require('koa-router')()
const jwt = require('../utils/jwt')
const userService = require('../controllers/mySqlConfig')
const moment = require('moment')

// 上传图文
router.post('/upload/post',  jwt.verify(),async (ctx) => {
    let info = ctx.request.body
    let account = info.account
    let img_id = account + info.imgId
    let date = info.date
    let text = info.text
    let img_url = info.uploadList
    await userService.uploadPic([account, date, text, img_id]).then(async (res) => {
        for (let i = 0; i < img_url.length; i++) {
            await userService.storeUrl([img_id, img_url[0], account]).then((res) => {
                console.log(res);
            }, (err) => {
                ctx.body = {
                    code: 400,
                    msg: err
                }
                return
            }
            )
        }
        ctx.body = {
            code: 200,
            msg: '上传成功'
        }
    })
})

// 获取图文
router.get('/upload/get',  jwt.verify(),async (ctx) => {
    let account = ctx.query.account
    await userService.getHomeList(account).then(async (res) => {
        let totalList = res
        for (let i = 0; i < totalList.length; i++) {
            totalList[i].date = moment(totalList[i].date).format("YYYY-MM-DD hh:mm:ss")
            await userService.getPicUrlList(totalList[i].img_id).then(res => {
                totalList[i]["imgList"] = [].concat(res)
            })
        }

        ctx.body = {
            code: 200,
            data: totalList
        }
    })
})
module.exports = router