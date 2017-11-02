angular.module('TruckHunt.factories', [])
.factory('ContactForm', ['$resource', function($resource){
    return $resource('/api/contactforms/:id', { id: '@id' });
 }])
 .factory('Stripe', ['$resource', function($resource){
     return $resource('/api/stripe/:id', { id: '@id'});
 }])
 .factory('Donations', ['$resource', function($resource){
     return $resource('/api/donations/:id', { id: '@id'});
 }])
 .factory('Trucks', ['$resource', function($resource){
     return $resource('/api/trucks/:id', { id: '@id'});
 }])
 .factory('Schedule', ['$resource', function($resource){
     return $resource('/api/schedule/:id', { id: '@id'});
 }])
 .factory('TrucksByCatID', ['$resource', function($resource){
     return $resource('/api/categories/:id', { id: '@id'});
 }])
 .factory('dailySchedule', ['$resource', function($resource){
    return $resource('/api/schedule/daily', { id: '@id'});
}])
.factory('Users', ['$resource', function($resource) {
    return $resource('/api/users/:id', { id: '@id'});
}])
.factory('Categories', [$resource], function($resource) {
    return $resource('/api/categories/:id', { id: '@id'});
})