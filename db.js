// db.js

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

//schemas:
//User
const User = new mongoose.Schema({
  //username provided by auth plugin
  //pw provided by auth plugin
  categs: [{type: String}],
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]

});
User.plugin(passportLocalMongoose);

/*const Category = new mongoose.Schema({
  //?
});*/

const Task = new mongoose.Schema({
  user: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  cat: {type: String},
  name: {type: String},
  desc: {type: String},
  priority: {type: Number, min: 1, max: 4, default: 1}
  //1 = lowest priority, 4 = highest priority

});

mongoose.model('User', User);
//mongoose.model('Category', Category);
mongoose.model('Task', Task);

mongoose.connect('mongodb://localhost/prioritize');
