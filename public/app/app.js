angular.module('app',['ngResource','ngRoute'])

angular.module('app').config(function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true); // Turn on HTML5 for routing
	$routeProvider
		.when('/',{
			templateUrl: '/partials/main/main',
			controller: 'MainController'
		})
});