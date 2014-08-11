angular.module('app').factory('User', function ($resource) {
	var UserResource = $resource('/api/users/:id', {_id:'@id'});

	UserResource.prototype.isAdmin = function() { // Create isAdmin method for all instances of UserResource
		return this.roles && this.roles.indexOf('admin') > -1;
	}
	return UserResource;
})