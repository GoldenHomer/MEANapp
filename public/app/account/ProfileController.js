angular.module('app').controller('ProfileController', function($scope, Auth, Identity, Notifier){
	$scope.email = Identity.currentUser.username;
	$scope.firstname = Identity.currentUser.firstname;
	$scope.lastname = Identity.currentUser.lastname;

	$scope.update = function(){
		var newUserData = {
			username: $scope.email,
			firstname: $scope.firstname,
			lastname: $scope.lastname
		}
		if($scope.password && $scope.password.length > 0){
			newUserData.password = $scope.password;
		}
		Auth.updateCurrentUser(newUserData).then(function(){
			Notifier.notify('You have updated your profile.');
		}, function(reason){
			Notifier.error(reason);
		})
	}
})