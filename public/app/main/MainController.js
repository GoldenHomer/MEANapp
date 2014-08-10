angular.module('app').controller('MainController', function($scope){
		$scope.courses = [
			{name: 'Wordpress Expert', featured:true, published: new Date('Aug 1')},
			{name: 'Senior Coffee Maker', featured:true, published: new Date('Jul 4')},
			{name: 'Google Search Master', featured:false, published: new Date('Jun 13')},
			{name: 'Cmd + C & Cmd + V Guru', featured: true, published: new Date('Aug 7')},
			{name: 'Lead File Uploaded', featured: false, published: new Date('Aug 2')}
		]
});