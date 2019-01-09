const Router = require("koa-router");

// 用于连接数据库
const Monk = require("monk");

const json = require("koa-json")

const db = new Monk("localhost:27017/games"); //链接到库
const switchGames = db.get("switch"); //表

// 状态码
const statusCode = require('./../statusCode')

const router = new Router();

router.post("/getGamesByName", async ctx => {
    const val = ctx.request.body && ctx.request.body.val;
    if (!val) {
        ctx.response.body = {
            code: statusCode.PARAM_ERROR.code,
            msg: statusCode.PARAM_ERROR.msg
        }
        return false;
    }
    // 名字模糊查询
    let reg = new RegExp(val) //正则加入变量的方式
    const result = await switchGames.find({
        name: { $regex: reg, $options: "i" }
    });
    ctx.response.type = "application/json";
    if (result.length) {
        ctx.response.body = {
            code: statusCode.SUCCESS.code,
            msg: statusCode.SUCCESS.msg,
            data: result
        }
    } else {
        ctx.response.body = {
            code: statusCode.NOT_DATA.code,
            msg: statusCode.NOT_DATA.msg,
            data: result
        }
    }
});

router.post("/getGamesByType", async ctx => {
    const val = ctx.request.body && ctx.request.body.val;
    if (!val) {
        ctx.response.body = {
            code: statusCode.PARAM_ERROR.code,
            msg: statusCode.PARAM_ERROR.msg
        }
        return false;
    }
    // 名字精确查询
    const result = await switchGames.find({
        type: val
    });
    ctx.response.type = "application/json";
    if (result.length) {
        ctx.response.body = {
            code: statusCode.SUCCESS.code,
            msg: statusCode.SUCCESS.msg,
            data: result
        }
    } else {
        ctx.response.body = {
            code: statusCode.NOT_DATA.code,
            msg: statusCode.NOT_DATA.msg,
            data: result
        }
    }
});

router.post("/getGamesByPrice", async ctx => {
    const minVal = ctx.request.body && parseInt(ctx.request.body.minVal);
    const maxVal = ctx.request.body && parseInt(ctx.request.body.maxVal);
    let result;
    if (minVal && !maxVal) {
        result = await switchGames.find({
            price: { $gte: minVal }
        });
    } else if (!minVal && maxVal) {
        result = await switchGames.find({
            price: { $lte: maxVal }
        });
    } else if (minVal && maxVal) {
        // 坑：菜鸟教程说这样写等同于and,但是不行
        // result = await switchGames.find({
        //     price: { $gte: minVal },
        //     price: { $lte: maxVal }
        // });
        result = await switchGames.find({
            $and: [{ price: { $gte: minVal }, }, { price: { $lte: maxVal }}]
        });
    } else {
        ctx.response.body = {
            code: statusCode.PARAM_ERROR.code,
            msg: statusCode.PARAM_ERROR.msg
        }
        return false;
    }

    ctx.response.type = "application/json";
    if (result.length) {
        ctx.response.body = {
            code: statusCode.SUCCESS.code,
            msg: statusCode.SUCCESS.msg,
            data: result
        }
    } else {
        ctx.response.body = {
            code: statusCode.NOT_DATA.code,
            msg: statusCode.NOT_DATA.msg,
            data: result
        }
    }
});

module.exports = router;
