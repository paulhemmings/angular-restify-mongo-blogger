'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
  userId: {type: Schema.ObjectId},
	title : String,
	content : String,
  tags: [String],
  createdAt: {type: Date, required: true, default: Date},
  updatedAt: {type: Date, required: true, default: Date}
});

mongoose.model('Blog', BlogSchema);
