const express = require("express");
const multer = require("multer"); //处理文件上传
const jwt = require("jsonwebtoken"); //登录状态校验
const assert = require("http-assert"); //捕获错误状态
const AdminUser = require("../../models/AdminUser");

//登录校验中间件
const authMiddleware = require("../../middleware/auth");
//路由转换中间件
const resourceMiddleware = require("../../middleware/resource");

module.exports = (app) => {
  //Router添加一个子路由
  const router = express.Router({
    mergeParams: true, // 保留来自父路由器的req.params值。
  });

  //创建资源
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  //更新资源
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  //删除资源
  router.delete("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true,
    });
  });
  //资源列表
  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send(items);
  });

  //资源详情
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  //使用一个中间件函数来实现针对于不同model的导入和名字转换
  app.use(
    "/admin/api/rest/:resource",
    authMiddleware(), //登陆状态中间件
    resourceMiddleware(), //导入数据模型
    router
  );
  //图片数据上传
  //multer中间件  处理文件的上传
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post(
    "/admin/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  //管理员账号路由
  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    //根据用户名查找数据库用户
    const user = await AdminUser.findOne({ username }).select("+password");
    assert(user, 422, "用户不存在");
    //校验密码
    //compareSync: Load hash from your password DB.
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");
    //返回token
    const token = jwt.sign({ id: user.id }, app.get("secret"));
    res.send({ token });
  });
  //错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
