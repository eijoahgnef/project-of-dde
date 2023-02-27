const router = require('koa-router')()
const jwt = require('../utils/jwt')
const userService = require('../controllers/mySqlConfig')

// 登录
router.post('/user/login',async (ctx) => {

    let user = ctx.request.body
    let _account = user.account
    let _password = user.password
    await userService.userLogin(_account, _password)
    .then(res => {
        if(res.length) {
            let jwtToken = jwt.sign({ id: res.userId, account: _account })
            ctx.body = {
                code: 0,
                data: _account,
                msg: '登录成功',
                token: jwtToken
            }
        } else {
            ctx.body = {
                code: 1,
                data: '账号或密码错误'
            } 
        }
    })
})

// 注册
router.post('/user/register',async (ctx) => {
    let user = ctx.request.body
    let _account = user.account
    let _password = user.password
    await userService.findUser(_account)
    .then(async(res) => {
        if (res.length) {
            ctx.body = {
                code: 400,
                data: 'error',
                msg: '账号已存在'
            }
        } else{
            await userService.insertUser([_account,_password])
            .then(res => {
                ctx.body = {
                    code: 200,
                    data: 'success',
                    msg: '注册成功'
                }
            })
        }
    })
})



module.exports = router