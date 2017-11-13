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
 .factory('Schedules', ['$resource', function($resource){
     return $resource('/api/schedule/:id', { id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
 }])
 .factory('singleSchedule', ['$resource', function($resource){
    return $resource('/api/schedule/single/:id', { id: '@id'}, {
       update: {
           method: 'PUT',
           url: '/api/schedule/single/:id'
       }
   });
}])
 .factory('TrucksByCatID', ['$resource', function($resource){
     return $resource('/api/categories/:id', { id: '@id'});
 }])
 .factory('DailySchedule', ['$resource', function($resource){
    return $resource('/api/schedule/daily/:id', { id: '@id'}, {
        update: {
            method: 'PUT',
            url: 'api/schedule/daily/:id'
        }
    });
}])
.factory('Users', ['$resource', function($resource) {
    return $resource('/api/users/:id', { id: '@id'});
}])
.factory('Categories', ['$resource', function($resource) {
    return $resource('/api/categories/:id', { id: '@id'});
}])

.factory('Single', ['$resource', function($resource) {
    return $resource('/api/schedule/:id', {id: '@id'}, {
    });
}])
.factory('Menu', ['$resource', function($resource) {
    return $resource('/api/menu/:id/truck/:foodTruckId', {id: '@id'}, {
        update: {
            method: 'PUT',
            url: '/api/menu/:id'
        }
        // ,
        // getMenuItem: {
        //     method: 'GET',
        //     url: '/api/menu/truck/:truckid/item/:itemid',
        //     isArray: false
        // }
    });
}])
.factory('Items', ['$resource', function($resource) {
    return $resource('api/all/:idmenus', {idmenus: '@idmenus'}, {
        update: {
            method: 'PUT',
            url: '/api/all/:idmenus'
        }
    });
}])
.factory('Create', ['$resource', function($resource){
    return $resource('/api/trucks/:id', { id: '@id' })
}])
.factory('TruckMenu', ['$resource', function($resource) {
    return $resource('/api/menu/truck/:foodTruckId', {id: '@foodTruckId'}, {
        update: {
            method: 'PUT',
            url: '/api/menu/:id'
        }
        // ,
        // getMenuItem: {
        //     method: 'GET',
        //     url: '/api/menu/truck/:truckid/item/:itemid',
        //     isArray: false
        // }
    });
}])