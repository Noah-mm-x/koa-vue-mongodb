const Router = require("koa-router");

// 用于连接数据库
const Monk = require("monk");

const db = new Monk("localhost:27017/games"); //链接到库
const switchGames = db.get("switch"); //表

const router = new Router();
router.get("/ARPGGames", async ctx => {
    let st = await switchGames.find({
        type: "ARPG"
    });
    ctx.response.type = "application/json";
    ctx.response.body = st;
});

router.get("/RPGGames", async ctx => {
    let st = await switchGames.find({
        type: "RPG"
    });
    ctx.response.type = "application/json";
    ctx.response.body = st;
});

module.exports = router;
