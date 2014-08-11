angular.module('app').factory('Auth', function($http, Identity, $q, User){// $q is "a promise/deferred implementation". Since Auth will be communicating with Login controller, a promise can be used there.
	return {
		authenticateUser: function(username, password){
			var deferPromise = $q.defer();
			$http.post('/login', {username:username, password:password}).then(function(response){
				if(response.data.success){
					var user = new User();
					angular.extend(user, response.data.user); // .extend copys all props from data.user to user (determine if user is admin or not here)
					Identity.currentUser = user;
					deferPromise.resolve(true);
				}
				else{
					deferPromise.resolve(false);
				}
			}); 
			return deferPromise.promise;
		},
		createUser: function(newUserData){
			var newUser = new User(newUserData);
			var deferPromise = $q.defer();

			newUser.$save().then(function(){ 
				// THEN if save is successful...
				Identity.currentUser = newUser;
				deferPromise.resolve();
			}, function(response){
				deferPromise.reject(response.data.reason); // else give reason why new user could not be created.
			});
			return deferPromise.promise;
		},

		updateCurrentUser: function(newUserData){
			var deferPromise = $q.defer();

			var clone = angular.copy(Identity.currentUser);
			angular.extend(clone, newUserData);
			clone.$update().then(function(){
				Identity.currentUser = clone;
				deferPromise.resolve();
			}, function(response){
				deferPromise.reject(response.data.reason);
			});
			return deferPromise.promise;
		},

		logoutUser: function(){
			var deferPromise = $q.defer();
			$http.post('/logout',{logout:true}).then(function(){
				Identity.currentUser = undefined;
				deferPromise.resolve();
			});
			return deferPromise.promise;
		},
		authorizeCurrentUserForRoute: function(role){
			if(Identity.isAuthorized(role)){
						return true;
			}
			else{
				return $q.reject('Not authorized to view');
			}
		},
		authorizeAuthenticatedUserForRoute: function(){
			if(Identity.isAuthenticated()){
				return true;
			}
			else{
				return $q.reject('Why are you even trying that? Not authorized.')
			}
		}
	}
});