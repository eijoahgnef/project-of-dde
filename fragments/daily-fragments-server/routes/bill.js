const router = require('koa-router')()
const jwt = require('../utils/jwt')
const userService = require('../controllers/mySqlConfig')
const moment = require('moment')

// 添加账单
router.post('/bill/add', jwt.verify(), async (ctx) => {
    let info = ctx.request.body
    let { account, amount, pay_type, type_name, icon, remarks, date } = info
    // let account = '15807096130'
    await userService.addBill([account, pay_type, amount, type_name, icon, date, remarks])
        .then(async (res) => {
            if (res) {
                ctx.body = {
                    code: 201,
                    msg: '添加成功'
                }
            } else {
                ctx.body = {
                    code: 400,
                    msg: '添加出了问题'
                }
            }
        })
})

// 查询账单列表
router.get('/bill/getlist', jwt.verify(), async (ctx) => {
    let account = ctx.query.account
    let date = ctx.query.date
    await userService.getBillList(account, date)
        .then(async (res) => {
            if (res.length) {
                let indexId = 0
                let flag = ''
                let list = []
                // 修改date格式
                for (let i = 0; i < res.length; i++) {
                    res[i].date = moment(res[i].date).format("MM-DD")
                }
                // 修改返回的list数据结构
                for (let i = 0; i < res.length; i++) {
                    if(res[i].date === flag) {
                        list[indexId-1].dayList.push(res[i])
                        
                    } else {
                        list.push({
                            id: ++indexId,
                            date: res[i].date,
                            dayList: [res[i]]
                        })
                        flag = res[i].date
                        
                    }
                }
                // 计算返回的日收入与支出
                for (let i = 0; i < list.length; i++) {
                    let dayList = list[i].dayList
                    let expend = 0
                    let income = 0
                    for (let j = 0; j < dayList.length; j++) {
                        if (dayList[j].pay_type === 1) {
                            expend += dayList[j].amount
                        } else {
                            income += dayList[j].amount
                        }
                    }
                    list[i]['expend'] = expend
                    list[i]['income'] = income
                }
                ctx.body = {
                    code: 200,
                    data: list
                }
            } else {
                ctx.body = {
                    code: 200,
                    data: '没有月账单'
                }
            }
        })
})

// 查询月账单
router.get('/bill/month',  jwt.verify(), async (ctx) => {
    let account = ctx.query.account
    let date = ctx.query.date
    let totalExpend = 0
    let totalIncome = 0
    let expendMap = new Map()
    let incomeMap = new Map()
    let incomeList = []
    let expendList = []
    await userService.getMonthIncome(account, date).then(res => {
        for (let i = 0; i < res.length; i++) {
            if (incomeMap.has(res[i].icon)) {
                totalIncome += res[i].amount
                res[i].amount = incomeMap.get(res[i].icon).amount + res[i].amount
                incomeMap.set(res[i].icon, res[i])
            } else {
                totalIncome += res[i].amount
                incomeMap.set(res[i].icon, res[i])
            }
        }
        incomeMap.forEach((value) => {
            incomeList.push(value)
        })
    })
    await userService.getMonthExpend(account, date).then(res => {
        for (let i = 0; i < res.length; i++) {
            if (expendMap.has(res[i].icon)) {
                totalExpend += res[i].amount
                res[i].amount = expendMap.get(res[i].icon).amount + res[i].amount
                expendMap.set(res[i].icon, res[i])
            } else {
                totalExpend += res[i].amount
                expendMap.set(res[i].icon, res[i])
            }
        }
        expendMap.forEach((value) => {
            expendList.push(value)
        })
    })
    let data = {
        totalExpend,
        totalIncome,
        expendList,
        incomeList
    }

    ctx.body = {
        code: 200,
        data: data
    }
})
module.exports = router