angular.module('app').controller('SignUpController', function ($scope, User, Notifier, $location, Auth) {
	$scope.signup = function(){
		var newUserData = {
			username: $scope.email,
			password: $scope.password,
			firstName: $scope.firstname,
			lastName: $scope.lastname
		};
		Auth.createUser(newUserData).then(function(){
			Notifier.notify('User account created');
			$location.path('/');
		}, function(reason){
			Notifier.error(reason);
		})
	}
})