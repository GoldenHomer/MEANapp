angular.module('app').controller('UserListController', function ($scope, User, ) {
	$scope.users = User.query(); // .query will grab list of user
});