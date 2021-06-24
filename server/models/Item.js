const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name: String,
  icon: String,
});

module.exports = mongoose.model("Item", CategorySchema);
