const Koa = require("koa");
const Router = require("koa-router");
const multiparty = require('koa2-multiparty');
const fs = require("fs.promised");
const path = require("path");
// 状态码
const statusCode = require('./../statusCode')
// app.use(koaBody({
//     multipart: true, // 支持文件上传
//     formidable: {
//         uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
//         keepExtensions: true, // 保持文件的后缀
//         maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小，缺省2M
//         onFileBegin: (name, file) => { // 文件上传前的设置
//             const fp = path.join(__dirname, '/home/website/images/');
//             if (!fs.existsSync(fp)) { // 检查是否有“/home/website/images/”文件夹
//                 fs.mkdirSync(fp); // 没有就创建
//             }
//             console.log(`bodyparse: name:${name}; file:${util.inspect(file)}`);
//         }
//     }
// }));
const router = new Router();
router.post('/upload', async (ctx, next) => {
    // 上传单个文件
    const readfile = ctx.request.files.img; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(readfile.path);
    // let filePath = path.join(__dirname, '../home/website/images');
    let filePath = path.join(__dirname, '../../../images');
    let writeFile = filePath + `/${readfile.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(writeFile);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    ctx.response.body = {
        code: statusCode.SUCCESS.code,
        msg: statusCode.SUCCESS.msg
    }
});
module.exports = router;
