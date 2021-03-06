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
    .when('/trucks', {
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
    .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupController'
    })
    .when('/createTruck', {
        templateUrl: 'views/createTruck.html',
        controller: 'CreateTruckController',
        requiresLogin: true
    })
    .when('/menu', {
        templateUrl: 'views/menuUpdate.html',
        controller: 'MenuUpdate'
    })
    .when('/menu/create', {
        templateUrl: 'views/create.html',
        controller: 'createItem'
    })
    .when('/truckOwners', {
        templateUrl: '/views/truckOwners.html',
        controller: 'TruckOwnersController'
    })
    .when('/schedule', {
        templateUrl: 'views/schedule.html',
        controller: 'ScheduleUpdate'
    })
    .when('/schedule/:id', {
        templateUrl: 'views/scheduleUpdate.html',
        controller: 'SingleScheduleUpdate'
    })
    .when('/menu/:idmenus', {
        templateUrl: 'views/singleMenu.html',
        controller: 'updateItem'
    })
    .when('/:theId', {
        templateUrl: 'views/truck.html',
        controller: 'TruckController'
    }) 
    .otherwise({
        redirectTo: '/'
    });
}])
.run(['$rootScope', '$location', 'UserService', function($rootScope, $location, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, previousRoute) {
        if (nextRoute.$$route && nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()) {
            event.preventDefault();
            UserService.loginRedirect();
        }
    });
 }]);