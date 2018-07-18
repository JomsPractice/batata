var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});


let Schema = mongoose.Schema; // Create a mongoose schema 


let userSchema = new Schema({
  fullname: {type: String},
  username: {type: String},
  email: {type: String},
  password: {type: String}
})

userSchema = mongoose.model('userSchema', userSchema);

module.exports.userSchema = userSchema;