// db.js

const mongoose = require('mongoose');

//schemas:
//User
const User = new mongoose.Schema({
  //username?
  //pw?
  categs: [{type: String}],
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]

});

/*const Category = new mongoose.Schema({
  //?
});*/

const Task = new mongoose.Schema({
  user: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  cat: {type: String}
  //priority
  //etc..
});

mongoose.model('User', User);
mongoose.model('Category', Category);
mongoose.model('Task', Task);

mongoose.connect('mongodb://localhost/prioritize');
