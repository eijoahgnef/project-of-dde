const koa = require('koa')
const cors = require('koa2-cors')
const userRouter = require('./routes/user')
const billRouter = require('./routes/bill')
const diaryRouter = require('./routes/diary')
const uploadRouter = require('./routes/upload')
const bodyParser = require('koa-bodyparser')
// const { koaBody } = require('koa-body')
// const formidable = require('koa-formidable')

const app = new koa()
app.use(cors())
// app.use(koaBody({
//     multipart:true
// }
// ))
// app.use((ctx) => {
//     ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
// })
app.use(bodyParser())  // 让koa可以解析post请求接受的参数
// app.use(formidable())
//  userRouter.routes() 启动路由
app.use(userRouter.routes(), userRouter.allowedMethods())
app.use(billRouter.routes(), billRouter.allowedMethods())
app.use(diaryRouter.routes(), diaryRouter.allowedMethods())
app.use(uploadRouter.routes(), uploadRouter.allowedMethods())
// 为了让模块生效，还得去启用它的routes。启用配好的userRoute允许他使用所有方法

app.listen(3000, () => console.log('服务器已启动在3000端口'))