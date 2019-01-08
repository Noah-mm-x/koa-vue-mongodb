const Router = require("koa-router");

// 用于连接数据库
const Monk = require("monk");

const json = require("koa-json")  

const db = new Monk("localhost:27017/games"); //链接到库
const switchGames = db.get("switch"); //表

// 状态码
const statusCode = require('./../statusCode')

const router = new Router();
router.post("/ARPGGames", async ctx => {
    let result = await switchGames.find({
        type: "ARPG"
    });
    ctx.response.type = "application/json";
    if(result.length){
        ctx.response.body = {
            code: statusCode.SUCCESS.code,
            msg: statusCode.SUCCESS.msg,
            data: result
        }
    }
});

router.post("/RPGGames", async ctx => {
    let result = await switchGames.find({
        type: "RPG"
    });
    ctx.response.type = "application/json";
    ctx.response.body = result;
});

module.exports = router;
