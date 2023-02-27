const jwt = require('jsonwebtoken')

function sign(option) {
    return jwt.sign(option, 'fhj', {
        expiresIn: 3600
    })
}

//  token校验
let verify = () => async (ctx, next) => {
    let jwtToken = ctx.req.headers.authorization
    if (jwtToken) {  //  校验token是否合法
        try {
            jwt.verify(jwtToken, 'fhj')
            await next()
        } catch (error) {

            ctx.body = {
                code: 401,
                msg: '身份已过期！'
            }
        }
    } else {
        ctx.body = {
            code: 401,
            msg: "身份已过期"
        }
    }


}

module.exports = {
    sign,
    verify
}