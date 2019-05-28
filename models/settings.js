// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settingsSchema = new Schema({
  websiteurl: { type: String, required: true, unique: true },
  logoimage: String,
  companyname:String,
  addressline1: String,
  addressline1: String,
  city:String,
  state:String,
  country:String,
  contactno:String,
  twitterurl:string,
  linkedinurl:String,
  facebookurl:String,
  instagramurl:String,
  footertext:String,
  copyright:String,
  created_at: Date,
  updated_at: Date
});

settingsSchema.pre('save', function(next) {
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
var settings = mongoose.model('settings', settingsSchema);

// make this available to our users in our Node applications
module.exports = settings;