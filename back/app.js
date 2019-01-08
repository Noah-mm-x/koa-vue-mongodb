// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 用于打开网站
const opn = require("opn");

// 用于打开文件 
const fs = require('fs.promised');

const getData = require('./router/get.js')

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.body = `首页`;
    await next();
});

app.use(getData.routes(),getData.allowedMethods());


// 在端口3000监听:
app.listen(3000);
// opn("http://localhost:3000/")
console.log('app started at port 3000...');