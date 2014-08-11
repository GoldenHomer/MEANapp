angular.module('app').controller('CourseListController', function ($scope, Course) {
	$scope.courses = Course.query();

	$scope.sortOptions = [{value:"title", text:"Sort by Title"},
	{value:"published", text:"Sort by Publish Date"}];

	$scope.sortOrder = $scope.sortOptions[0].value;
});