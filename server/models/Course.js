var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
	title: {type:String, required:'{PATH} is required.'},
	featured: {type:Boolean, required:'{PATH} is required.'},
	published: {type:Date, required:'{PATH} is required'},
	tags:[String]
});
var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses () {
	Course.find({}).exec(function(err, collection){
		if(collection.length === 0){
			Course.create({title: 'Wordpress Expert', featured:true, published: new Date('08/01/2014'), tags:['Wordpress']});
			Course.create({title: 'Senior Coffee Maker', featured:true, published: new Date('07/04/2014'), tags:['Intern']});
			Course.create({title: 'Google Search Master', featured:false, published: new Date('06/13/2014'), tags:['Senior']});
			Course.create({title: 'Cmd + C & Cmd + V Guru', featured: true, published: new Date('08/05/2014'), tags:['Junior']});
			Course.create({title: 'Lead File Uploaded', featured: false, published: new Date('08/02/2014'), tags:['Mid']});
		}
	})
}

exports.createDefaultCourses = createDefaultCourses;