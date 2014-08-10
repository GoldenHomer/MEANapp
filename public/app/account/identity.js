angular.module('app').factory('Identity', function () {
	return{
		currentUser: undefined,
		isAuthenticated: function(){
			return !!this.currentUser; // short hand trick for returning boolean from and object !(!this.currentuser)
		}
	}
})