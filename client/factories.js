angular.module('TruckHunt.factories', [])

.factory('ContactForm', ['$resource', function($resource){
    return $resource('/api/contactforms/:id', { id: '@id' })
 }])