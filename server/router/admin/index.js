const express = require("express");
const Category = require("../../models/Category");
module.exports = (app) => {
  //Router添加一个子路由
  const router = express.Router();

  router.post("/categories", async (req, res) => {
    const model = await Category.create(req, body);
    res.send(model);
  });

  app.use("/admin/api", router);
};
