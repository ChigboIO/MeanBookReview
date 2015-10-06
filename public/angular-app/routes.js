reviewApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'angular-app/views/home.html'
		})
		.when('/about', {
			templateUrl: 'angular-app/views/about.html'
		});

	// $locationProvider.html5mode(true);
}]);
