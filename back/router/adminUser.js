const Router = require("koa-router");

// 用于连接数据库
const Monk = require("monk");

const json = require("koa-json")

// const db = new Monk("localhost:27017/games"); //链接到库
const db = new Monk("202.5.18.148/adminUser"); //链接到库
const userInfo = db.get("info"); //表

// 状态码
const statusCode = require('./../statusCode')

const router = new Router();
router.post("/adminRegister", async ctx => {
    const name = ctx.request.body && ctx.request.body.name;
    const pwd = ctx.request.body && ctx.request.body.pwd;
    ctx.response.type = "application/json";
    if (!name || !pwd) {
        ctx.response.body = {
            code: statusCode.PARAM_ERROR.code,
            msg: statusCode.PARAM_ERROR.msg
        }
        return false;
    }
    const result = await userInfo.find({
        name: name
    });
    if (result.length) {
        ctx.response.body = {
            code: statusCode.USER_IS_ALREADY_EXISTED.code,
            msg: statusCode.USER_IS_ALREADY_EXISTED.msg
        }
    } else {
        await userInfo.insert({
            name: name,
            pwd: pwd,
        });
        ctx.response.body = {
            code: statusCode.SUCCESS.code,
            msg: statusCode.SUCCESS.msg
        }
    }
});
router.post("/adminLogin", async ctx => {
    const name = ctx.request.body && ctx.request.body.name;
    const pwd = ctx.request.body && ctx.request.body.pwd;
    ctx.response.type = "application/json";
    if (!name || !pwd) {
        ctx.response.body = {
            code: statusCode.PARAM_ERROR.code,
            msg: statusCode.PARAM_ERROR.msg
        }
        return false;
    }
    const result = await userInfo.find({
        name: name,
        pwd: pwd
    });
    if (result.length) {
        ctx.response.body = {
            code: statusCode.SUCCESS.code,
            msg: statusCode.SUCCESS.msg
        }
    } else {
        ctx.response.body = {
            code: statusCode.NOT_DATA.code,
            msg: statusCode.NOT_DATA.msg
        }
    }
});
module.exports = router;

