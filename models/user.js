// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var friensSchema = new Schema({
  name: String,
  city: { type: String, required: true, unique: true }
});


var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  location: String,
  age: Number,
  friends:[friensSchema],
  cars:[{
    type: Schema.Types.ObjectId,
    ref: 'car'
  }],
  cmspages:[{
    type: Schema.Types.ObjectId,
    ref: 'cmspage'
  }],
  blog:[{
    type: Schema.Types.ObjectId,
    ref: 'blog'
  }],
  services:[{
    type: Schema.Types.ObjectId,
    ref: 'services'
  }],
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
      this.created_at = currentDate;
    next();
  });

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;