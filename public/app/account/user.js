angular.module('app').factory('User', function ($resource) {
	var UserResource = $resource('/api/users/:id', {_id:'@id'}, {
		update: {method: 'PUT', isArray: false} //Used in updateCurrentUser method in client auth.js
	});

	UserResource.prototype.isAdmin = function() { // Create isAdmin method for all instances of UserResource
		return this.roles && this.roles.indexOf('admin') > -1;
	}
	return UserResource;
});