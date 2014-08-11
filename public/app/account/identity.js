angular.module('app').factory('Identity', function ($window) {
	var currentUser;
	if(!!$window.bootstrappedUserObject){
		currentUser = $window.bootstrappedUserObject;
	}
	return{
		currentUser: currentUser,
		isAuthenticated: function(){
			return !!this.currentUser; // short hand trick for returning boolean from and object !(!this.currentuser)
		}
	}
})