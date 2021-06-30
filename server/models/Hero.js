const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;
const HeroSchema = new Schema({
  name: String,
  avatar: String,
  title: String,
  //类别
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  //星级得分
  scores: {
    difficult: Number,
    skills: Number,
    attack: Number,
    survive: Number,
  },
  //技能
  skills: [
    {
      icon: String,
      name: String,
      description: String,
      tips: String,
    },
  ],
  //顺风出装
  items1: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Item",
    },
  ],
  //逆风出装
  items2: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Item",
    },
  ],
  //使用技巧
  usageTips: String,
  //对抗技巧
  battleTips: String,
  //团战技巧
  teamTips: String,
  // 英雄关系
  partner: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      description: String,
    },
  ],
});

module.exports = mongoose.model("Hero", HeroSchema);
