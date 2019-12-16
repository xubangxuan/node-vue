const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const schema = new mongoose.Schema({
  name: {type: String},
  avatar: {type: String},
  banner: { type: String },
  title: {type: String},
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [{
    icon: {type: String},
    name: {type: String},
    description: {type: String},
    tips: { type: String },
  }],
  items1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  usageTips: {type: String},
  battleTips: {type: String},
  teamTips: {type: String},
  partners: [{
    hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
    description: {type: String}
  }],
})
// category属性 中的ref为关联其他表(models中的)的模型名称(就是下面这一行的引号内容) 后面的是表名称
module.exports = mongoose.model('Hero', schema, 'heros')
