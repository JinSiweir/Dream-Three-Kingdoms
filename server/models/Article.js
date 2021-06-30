const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  title: String,
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  body: String,
});

module.exports = mongoose.model("Article", CategorySchema);
