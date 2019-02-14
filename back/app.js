// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require("koa");
// 用于打开网站
const opn = require("opn");
// 用于打开文件
const fs = require("fs.promised");
// 解决跨域
// const cors = require("koa-cors");
const cors = require("koa2-cors");
// request参数挂载
const bodyParser = require("koa-bodyparser");
//session支持
const session = require("koa-session");
//返回结果json化
const json = require("koa-json");
// 上传图片
const koaBody = require('koa-body');

const getData = require("./router/get.js");
const upload = require("./router/upload.js");

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    // ctx.response.type = "text/html";
    // ctx.response.body = `首页`;
    // ctx.body = ctx.request.body;
    await next();
});
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
}));

app.use(cors());
app.use(bodyParser());
app.use(json());

app.use(getData.routes(), getData.allowedMethods());
app.use(upload.routes(), upload.allowedMethods());

// app.use(async ctx => {
// ctx.body = ctx.request.body;
// });

// 在端口3000监听:
app.listen(3000);
// opn("http://localhost:3000/")
console.log("app started at port 3000...");
