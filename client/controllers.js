angular.module('TruckHunt.controllers', [])
.controller('ContactUsController', ['$scope', 'ContactForm', function ($scope, ContactForm) {
    $scope.send = function () {
        let contact = new ContactForm({
            from: $scope.email,
            message: $scope.message
        });
        console.log(contact);
        contact.$save(function () {
            alert('Thank you for your message. We will get back with you as soon as possible.')
        }, function (err) {
            console.log(err)
        });
    }
}])
.controller('MapController', function(NgMap) {
    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });
  });