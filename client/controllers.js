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
    .controller('MapController', ['$scope', 'NgMap', 'dailySchedule','SEOService', function ($scope, NgMap, dailySchedule, SEOService) {
        let vm = this

        NgMap.getMap().then(function(map) {
            console.log('map', map);
            vm.map = map;
        });
        
        vm.clicked = function () {
            alert('Clicked a link inside infoWindow')
        };

        vm.shops = dailySchedule.query();

        vm.shop = vm.shops[0];
        console.log(vm.shop)

        vm.showDetail = function(e, shop){
            vm.shop = shop;
            console.log(shop);
            console.log(vm.shop);
            console.log(shop.truckId);
            vm.map.showInfoWindow('foo-iw', shop.truckId.toString());
            
        };

        SEOService.setSEO({
            title: 'Welcome to Truck Hunt!',
            description: 'We give so many Trucks.',
            url: $location.url()
        });
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
    .controller('TruckController', ['$scope', 'Trucks', '$location', '$routeParams','NgMap','SEOService', function ($scope, Trucks, $location, $routeParams, NgMap) {
        let route = $routeParams.id
        $scope.trucks = Trucks.get({ id: route });
        console.log($scope.trucks);
        SEOService.setSEO({
            title: $scope.trucks.name,
            description: $scope.trucks.description,
            url: $location.url()
        });
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