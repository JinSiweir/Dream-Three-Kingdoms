//登录状态中间件
module.exports = (options) => {
  const jwt = require("jsonwebtoken"); //登录状态校验
  const assert = require("http-assert"); //捕获错误状态
  const AdminUser = require("../models/AdminUser");

  return async (req, res, next) => {
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    assert(token, 401, "请先登录");
    const { id } = jwt.verify(token, req.app.get("secret"));
    assert(id, 401, "请先登录");
    req.user = await AdminUser.findById(id);
    assert(req.user, 401, "请先登录");

    await next();
  };
};
