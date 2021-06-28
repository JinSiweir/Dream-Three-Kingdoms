const express = require("express");

const app = express();

//添加 跨域和 json
app.use(require("cors")());
app.use(express.json());
//静态路由托管
app.use("/uploads", express.static(__dirname + "/uploads"));

//require 第一个参数 表示导入的模块  第二个是一个回调函数 在第一步执行后 作为参数调用这个回调函数;
require("./plugins/db")(app);
require("./router/admin")(app);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
