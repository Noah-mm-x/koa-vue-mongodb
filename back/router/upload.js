const Koa = require("koa");
const Router = require("koa-router");
const multiparty = require('koa2-multiparty');
const fs = require("fs.promised");
const path = require("path");
const koaBody = require('koa-body');
// 状态码
const statusCode = require('./../statusCode')
const router = new Router();
router.post('/upload', async (ctx, next) => {
    // 上传单个文件
    const readfile = ctx.request.files && ctx.request.files.file; // 获取上传文件
    if(!readfile){
        ctx.response.body = {
            code: statusCode.PARAM_ERROR.code,
            msg: statusCode.PARAM_ERROR.msg
        }
        return false;
    }
    // 创建可读流
    const reader = fs.createReadStream(readfile.path);
    let filePath = path.join(__dirname, '../../../images/');
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath); 
    }
    let writeFile = filePath + `${readfile.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(writeFile);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    ctx.response.body = {
        code: statusCode.SUCCESS.code,
        msg: statusCode.SUCCESS.msg,
        data: {
            imgUrl: `http://www.mfx55.top/website/images/${readfile.name}`
        }
    }
});
module.exports = router;
