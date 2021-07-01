const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  username: String,
  password: {
    type: String,
    //为了保持散列不必每一次保存都被散列 所以使用select不被从查出
    select: false,
    set(val) {
      return require("bcrypt").hashSync(val, 10);
    },
  },
});

module.exports = mongoose.model("AdminUser", CategorySchema);
