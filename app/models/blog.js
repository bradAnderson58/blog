// app/models/blog.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
	title: String,
	biline: String,
	body: String,
	comments: [
		{
			author: String,
			body: String,
			date: Date
		}
	]
});

module.exports = mongoose.model('Blog', BlogSchema);