const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name: String,
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Category", CategorySchema);
