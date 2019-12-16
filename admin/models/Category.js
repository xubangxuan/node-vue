const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false)

const schema = new mongoose.Schema({
  name: {type: String},
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
})

module.exports = mongoose.model('Category', schema)
