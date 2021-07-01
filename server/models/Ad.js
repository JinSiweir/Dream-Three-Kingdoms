const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name: String,
  items: [
    {
      image: String,
      url: String,
    },
  ],
});

module.exports = mongoose.model("Ad", CategorySchema);
