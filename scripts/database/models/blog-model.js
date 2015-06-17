var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
	title : String,
	content : String,
  tags: [String]
});

mongoose.model('Blog', BlogSchema);
