module.exports = (options) => {
  return async (req, res, next) => {
    //modelName 使用inflation 对resource进行转换
    const modelName = require("inflection").classify(req.params.resource);
    req.Model = require(`../models/${modelName}`);
    next();
  };
};
