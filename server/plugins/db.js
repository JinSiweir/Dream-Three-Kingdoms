const mongoose = require("mongoose");
//导出匿名函数在index文件中使用
module.exports = (app) => {
  mongoose.connect("mongodb://127.0.0.1:27017/Honor-of-Kings", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
