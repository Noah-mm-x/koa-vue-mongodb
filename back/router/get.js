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
            $and: [{ price: { $gte: minVal }, }, { price: { $lte: maxVal } }]
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

router.post("/addData", async ctx => {
    const name = ctx.request.body && ctx.request.body.name;
    const type = ctx.request.body && ctx.request.body.type;
    const price = ctx.request.body && ctx.request.body.price;
    if (!name || !type || !price) {
        ctx.response.body = {
            code: statusCode.PARAM_ERROR.code,
            msg: statusCode.PARAM_ERROR.msg
        }
        return false;
    }
    await switchGames.insert({
        name: name,
        type: type,
        price: price
    });
    const result = await switchGames.find({
        name: name
    });
    ctx.response.type = "application/json";
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

router.post("/getAllData", async ctx => {
    const result = await switchGames.find({});
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

router.post("/updateData", async ctx => {
    const sourceName = ctx.request.body && ctx.request.body.sourceName;
    const targetData = ctx.request.body && ctx.request.body.targetData;
    if (!sourceName) {
        ctx.response.body = {
            code: statusCode.PARAM_ERROR.code,
            msg: statusCode.PARAM_ERROR.msg
        }
        return false;
    }
    let reg = new RegExp(sourceName)
    console.log('targetData', targetData);
    await switchGames.update(
        { name: { $regex: reg, $options: "i" } },
        { $set: targetData }
    );
    ctx.response.type = "application/json";
    ctx.response.body = {
        code: statusCode.SUCCESS.code,
        msg: statusCode.SUCCESS.msg
    };
})

router.post("/sortAllData", async ctx => {
    const type = ctx.request.body.type;
    const order = ctx.request.body.order == 'asc' ? 1 : -1;
    console.log('type', type);
    if (!type || !order) {
        ctx.response.body = {
            code: statusCode.PARAM_ERROR.code,
            msg: statusCode.PARAM_ERROR.msg
        }
        return false;
    }
    // const result = await switchGames.find().sort({[type]:[order]});
    const result = await switchGames.find();
    // const result = await switchGames.find().sort({price:-1});
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

// 脚本：把所有数据的价格改为num类型
router.post("/updateDataPriceToNum", async ctx => {
    const result = await switchGames.find();
    for (let index = 0; index < result.length; index++) {
        let item = result[index];
        (function (item) {
            item.price = parseInt(item.price);
            switchGames.update(
                { _id: item._id },
                { $set: item }
            );
        })(item)

    }
});
module.exports = router;
