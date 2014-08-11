angular.module('app').factory('Auth', function($http, Identity, $q){// $q is "a promise/deferred implementation". Since Auth will be communicating with Login controller, a promise can be used there.
	return {
		authenticateUser: function(username, password){
			var deferPromise = $q.defer();
			$http.post('/login', {username:username, password:password}).then(function(response){
				if(response.data.success){
					Identity.currentUser = response.data.user;
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