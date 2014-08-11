angular.module('app').controller('MainController', function($scope, Course){
		$scope.courses = Course.query();
});