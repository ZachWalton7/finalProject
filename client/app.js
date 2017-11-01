angular.module('TruckHunt', [
    'ngRoute',
    'ngResource',
    'ngMap',
    'TruckHunt.factories',
    'TruckHunt.controllers',
    'TruckHunt.services',
    'TruckHunt.directives'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
    .when('/', {
        templateUrl: 'views/map.html',
        controller: 'MapController'
    })
    .when('/donate', {
        templateUrl: 'views/donate.html',
        controller: 'DonateController'
    })
    .when('/contactus', {
        templateUrl: 'views/contactus.html',
        controller: 'ContactUsController'
    })
    .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListController'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutController'
    })
    .when('/:theId', {
        templateUrl: 'views/truck.html',
        controller: 'TruckController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);