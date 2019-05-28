// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = require('./user');

var cmspageSchema = new Schema({
  pagename: { type: String, required: true, unique: true },
  title: String,
  description: String,
  author: { type: String, required: true },
  isActive: Boolean,
  created_at: Date,
  updated_at: Date
});

cmspageSchema.pre('save', function(next) {
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
var cmspage = mongoose.model('cmspage', cmspageSchema);

// make this available to our users in our Node applications
module.exports = cmspage;
