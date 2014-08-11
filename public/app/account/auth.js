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
		logoutUser: function(){
			var deferPromise = $q.defer();
			$http.post('/logout',{logout:true}).then(function(){
				Identity.currentUser = undefined;
				deferPromise.resolve();
			});
			return deferPromise.promise;
		}
	}
})