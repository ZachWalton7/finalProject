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
    .controller('MapController', ['$scope', 'NgMap', 'dailySchedule', function ($scope, NgMap, dailySchedule) {

        NgMap.getMap().then(function (map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });

        $scope.clicked = function() {
            alert('Clicked a link inside infoWindow');
          };
        
          $scope.shops = dailySchedule.query()
        
          $scope.shop = $scope.shops[0];
          console.log($scope.shop)
        
          $scope.showDetail = function(e, shop) {
            $scope.shop = shop;
            $scope.map.showInfoWindow('foo-iw', $scope.shop.id);
            console.log(scope.shop.id)
          };
        
          $scope.hideDetail = function() {
            $scope.map.hideInfoWindow('foo-iw');
          };

        
        //   vm.hideDetail = function() {
        //     vm.map.hideInfoWindow('foo-iw');
        //   };



        function getSchedule() {
            $scope.schedules = dailySchedule.query();
            console.log($scope.schedules);
        };
        getSchedule();
        // SEOService.setSEO({
        //     title: 'Welcome to Truck Hunt!',
        //     description: 'We give so many Trucks.',
        //     url: $location.url()
        // });
    }])
    .controller('DonateController', ['$scope', 'Donations', '$rootScope', 'Stripe', '$location', 'SEOService', function ($scope, Donations, $rootScope, Stripe, $location, SEOService) {
        let elements = stripe.elements();
        let card = elements.create('card');
        card.mount('#card-field');
        $scope.process = function () {
            $scope.error = '';
            stripe.createToken(card)
                .then((result) => {
                    if (result.error) {
                        $scope.error = result.error.message;
                    } else {
                        let d = new Stripe({
                            token: result.token.id,
                            amount: $scope.amount
                        });
                        d.$save(function () {
                            alert('Thank you for helping us keep on Truck Hunting!');
                            $location.path('/');
                        }, function (err) {
                            $scope.error = err.data;
                        }).then(function () {
                            let newPurchase = new Donations({
                                amount: $scope.amount,
                                stripetransactionid: result.token.id
                            });
                            newPurchase.$save(function (success) {
                                console.log(success);
                            });
                        })
                    }
                });
        }
    }])
    .controller('TruckController', ['$scope', 'Trucks', '$location', '$routeParams','NgMap', function ($scope, Trucks, $location, $routeParams, NgMap) {
        let route = $routeParams.id
        $scope.trucks = Trucks.get({ id: route });
        console.log($scope.trucks);
        // SEOService.setSEO({
        //     title: $scope.trucks.name,
        //     description: $scope.trucks.description,
        //     url: $location.url()
        // });
        NgMap.getMap().then(function (map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });
    }])
    .controller('ListController', ['$scope', 'Trucks', 'SEOService', '$location', function ($scope, Trucks, SEOService, $location) {
        $scope.trucks = Truck.query();
        SEOService.setSEO({
            title: 'Truck it. Lets go Hunting.',
            description: 'Trucks trucks everywhere!',
            url: $location.url()
        });
    }])