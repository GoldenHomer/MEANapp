angular.module('app').factory('Identity', function ($window, User) {
	var currentUser;
	if(!!$window.bootstrappedUserObject){
		currentUser = new User();
		angular.extend(currentUser, $window.bootstrappedUserObject)
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function(){
			return !!this.currentUser; // short hand trick for returning boolean from and object !(!this.currentuser)
		},
		isAuthorized: function(role){
			return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
		}
	}
});