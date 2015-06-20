'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
  user_id: {type: Schema.ObjectId},
	title : String,
	content : String,
  tags: [String],
  created_at: {type: Date, required: true, default: Date},
  updated_at: {type: Date, required: true, default: Date}
});

mongoose.model('Blog', BlogSchema);
