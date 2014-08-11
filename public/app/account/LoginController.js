angular.module('app').controller('LoginController',function ($scope, $http, Identity, Notifier, Auth, $location) {
	$scope.identity = Identity;	
	$scope.signin = function(username, password){
		Auth.authenticateUser(username, password).then(function(success){
			success ? Notifier.notify('You have logged in.') : Notifier.notify('Incorrect username or password');
		});
	}

	$scope.signout = function(){
		Auth.logoutUser().then(function(){
			$scope.username = "";
			$scope.password = "";
			Notifier.notify('You have logged out.');
			$location.path('/');
		})
	}
});