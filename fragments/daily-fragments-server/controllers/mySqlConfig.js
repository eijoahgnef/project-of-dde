const mysql = require('mysql')
const config = require('./default')

// 创建线程池
let pool = mysql.createPool({
    host: config.dataBase.HOST,
    user: config.dataBase.USERNAME,
    password: config.dataBase.PASSWORD,
    database: config.dataBase.DATABASE,
    port: config.dataBase.PORT,
})

// 连接线程池，做sql查找
let allServices = {
    query: function(sql,values) {
        return new Promise((resolve,reject) => {
            pool.getConnection(function(err,connection) {
                if (err) {
                    reject(err)
                } else { // 连接成功
                    connection.query(sql,values,(err,rows) =>{
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release() // 释放连接
                    })
                }
            })
        })
    }
}
/*---- 登录页面----- */
// 用户登录
let userLogin = function(account,password) {
    let _sql = `select * from useraccount where account="${account}" and password="${password}";`
    return allServices.query(_sql)
}

// 查找用户
let findUser = function(account) {
    let _sql = `select * from useraccount where account="${account}";`
    return  allServices.query(_sql)
}

// 用户注册
let insertUser = function(value) {
    let _sql = `insert into useraccount set account=?,password=?;`
    return  allServices.query(_sql, value)
}

/* ----- 账单页面 ----- */
// 账单添加
let addBill = function(value) {
    let _sql = `insert into bill set account=?,pay_type=?,amount=?,type_name=?,icon=?,date=?,remarks=?;` 
    return allServices.query(_sql, value)
}

// 获取账单列表
let getBillList = function(account, data) {
    let _sql = `select * from bill where account="${account}" and (date regexp "${data}") order by date desc, bill_nums desc;`
    return allServices.query(_sql)
}

// 获取月收入账单
let getMonthIncome = function(account, date) {
    let _sql = `select pay_type, amount, type_name, icon from bill where account="${account}" and (date regexp "${date}") and pay_type=2;`
    return allServices.query(_sql)
}
// 获取月支出账单
let getMonthExpend = function(account, date) {
    let _sql = `select pay_type, amount, type_name, icon from bill where account="${account}" and (date regexp "${date}") and pay_type=1;`
    return allServices.query(_sql)
}

/* ----- 图文模块 -----  */
// 上传图文
let uploadPic = function(data) {
    let _sql = `insert into upload set account=?,date=?,text=?,img_id=?;`
    return allServices.query(_sql, data)
}

//  存取图片地址
let storeUrl = function(data) {
    let _sql = `insert into image set img_id=?,img_url=?,account=?;`
    return allServices.query(_sql, data)
} 

// 获取用户图文
// let getHomeList = function(account) {
//     let _sql = `select *,img_url from upload, image where upload.account="${account}" and upload.img_id = image.img_id order by upload.insert_id desc;`
//     return allServices.query(_sql, account)
// }
let getHomeList = function(account) {
    let _sql = `select * from upload where account="${account}" order by insert_id desc;`
    return allServices.query(_sql, account)
}

// 获取图片列表
let getPicUrlList = function(img_id) {
    let _sql = `select img_url from image where img_id="${img_id}";`
    return allServices.query(_sql, img_id)
}


/* ----- 日记模块 -----  */
//  插入日记
let addDiary = function(data) {
    let _sql = `insert into diary set account=?,keep_date=?,keep_week=?,text=?,title=?;`
    return allServices.query(_sql, data)
}
// 获取日记列表
let getDiaryList = function(account) {
    let _sql = `select insert_id, title, keep_date, keep_week from diary where account="${account}" order by insert_id desc;`
    return allServices.query(_sql)
}

//  获取日记内容
let getDiaryContent = function(account, insert_id) {
    let _sql = `select * from diary where account="${account}" and insert_id="${insert_id}"`
    return allServices.query(_sql)
}
module.exports = {
    userLogin,
    findUser,
    insertUser,
    addBill,
    getBillList,
    addDiary,
    getDiaryList,
    getDiaryContent,
    uploadPic,
    storeUrl,
    getHomeList,
    getPicUrlList,
    getMonthIncome,
    getMonthExpend

}