angular.module('app',['ngResource','ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
	var routeRoleChecks = {
		admin: {auth: function(Auth){
			return Auth.authorizeCurrentUserForRoute('admin');
		}},
		user: {auth: function(Auth){
			return Auth.authorizeAuthenticatedUserForRoute(); // allow logged user to see own profile
		}}
	}

	$locationProvider.html5Mode(true); // Turn on HTML5 for routing
	$routeProvider
		.when('/',{
			templateUrl: '/partials/main/main',
			controller: 'MainController'
		})
		.when('/admin/users',{
			templateUrl: '/partials/admin/userlist',
			controller: 'UserListController',
			resolve: routeRoleChecks.admin // route resolvers are objects and each of its property must be a function.
			})
		.when('/signup',{
			templateUrl: '/partials/account/signup',
			controller: 'SignUpController'
		})
		.when('/profile',{
			templateUrl: '/partials/account/profile',
			controller: 'ProfileController', resolve: routeRoleChecks.user
		})
		.when('/courses',{
			templateUrl: '/partials/courses/courselist',
			controller: 'CourseListController'
		})
});
// Run the module below after the modules above are done.
angular.module('app').run(function($rootScope, $location){// $rootScope to listen to route change error event
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
		if(rejection === 'Not authorized to view'){
			$location.path('/');
		}
	})
});