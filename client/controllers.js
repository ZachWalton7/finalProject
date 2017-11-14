angular.module('TruckHunt.controllers', [])
    .controller('ContactUsController', ['$scope', 'ContactForm','$location', function ($scope, ContactForm, $location) {
        $scope.send = function () {
            
            
            let contact = new ContactForm({
                from: $scope.email,
                message: $scope.message
            });
            console.log(contact);
            
            contact.$save(alert('Thank you for your message. We will get back with you as soon as possible.'));
        }
    }])
    .controller('MapController', ['$scope', 'NgMap', 'DailySchedule', 'SEOService', '$location', function ($scope, NgMap, DailySchedule, SEOService, $location) {
        let vm = this

        NgMap.getMap().then(function (map) {
            vm.map = map;
        });

        vm.clicked = function () {
            alert('Clicked a link inside infoWindow')
        };

        vm.shops = DailySchedule.query();

        vm.shop = vm.shops[0];

        vm.showDetail = function (e, shop) {
            vm.shop = shop;
            console.log(shop);
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
    .controller('TruckController', [
        '$scope',
        'Menu',
        'Trucks',
        '$location',
        '$routeParams',
        'NgMap',
        'DailySchedule',
        'SEOService',
        'TruckMenu', function (
            $scope,
            Menu,
            Trucks,
            $location,
            $routeParams,
            NgMap,
            DailySchedule,
            SEOService,
            TruckMenu
        ) {

            $('.carousel').carousel();

            const route = $routeParams.theId;
            $scope.single = DailySchedule.get({ id: route });
            console.log($scope.single);

            $scope.menu = TruckMenu.query({ foodTruckId: route });
            console.log($scope.menu);



            NgMap.getMap().then(function (map) {
                console.log(map.getCenter());
                console.log('markers', map.markers);
                console.log('shapes', map.shapes);
            });

            SEOService.setSEO({
                title: $scope.single.truckName,
                description: $scope.single.truckDescription,
                url: $location.url()
            });
        }])
    .controller('ListController', ['$scope', 'Trucks', 'SEOService', '$location', function ($scope, Trucks, SEOService, $location) {
        $scope.trucks = Trucks.query();
        console.log($scope.trucks);

        SEOService.setSEO({
            title: 'Truck it. Lets go Hunting.',
            description: 'Trucks trucks everywhere!',
            url: $location.url()
        });

    }])
    .controller('LoginController', ['$scope', 'UserService', '$location', function ($scope, UserService, $location) {
        UserService.me()
            .then((me) => {
                redirect();
            });

        function redirect() {
            let dest = $location.search().dest;
            if (!dest) {
                dest = '/truckOwners';
            }
            $location.replace().path(dest).search('dest', null);
        }

        $scope.login = function () {
            UserService.login($scope.email, $scope.password)
                .then((user) => {
                    redirect();
                });
        }
        $scope.createUser = function () {
            $location.path('/signup');
        }
    }])
    .controller('LogoutController', ['$location', 'UserService', function ($location, UserService) {
        UserService.logout()
            .then(() => {
                $location.path('/');
            });
    }])
    .controller('MenuUpdate', ['$scope', '$routeParams', 'Menu', 'UserService', 'Items', '$location', function ($scope, $routeParams, Menu, UserService, Items, $location) {

        getMenus = function () {
            UserService.me()
                .then((me) => {
                    console.log(me);
                    $scope.menus = Menu.query({ foodTruckId: me.truckId });

                })
        };

        getMenus();



        $scope.updateMenu = function (menu) {
            console.log(menu)
            menu.$update(function () {
                // $location.path('/menu');
            });
        };
    }])
    .controller('SignupController', ['$scope', '$location', 'Users', function ($scope, $location, Users) {

        $scope.save = function () {
            let u = new Users({
                username: $scope.username,
                email: $scope.email,
                password: $scope.password
            });
            u.$save(function (sucess) {
                $location.path('/');
            }, function (err) {
                console.log(err);
            });
        }
    }])
    .controller('CreateTruckController', ['$scope', '$location', 'Categories', 'Users', 'Create', function ($scope, $location, Categories, Users, Create) {
        $scope.categories = Categories.query();
        $scope.users = Users.query();
        $scope.save = function () {
            let t = new Create({
                userid: $scope.userid,
                categoryid: $scope.categoryid,
                name: $scope.name,
                description: $scope.description,
                imgone: $scope.imgone,
                imgtwo: $scope.imgtwo,
                imgthree: $scope.imgthree
            });
            t.$save(function (sucess) {
                $location.path('/truckOwners');
            }, function (err) {
                console.log(err);
            });
        }
    }])
    .controller('LogoutController', ['$location', 'UserService', function ($location, UserService) {
        UserService.logout()
            .then(() => {
                $location.replace().path('/');
            });
    }])
    .controller('TruckOwnersController', ['$scope', '$location', function ($scope, $location) {
        $scope.createTruck = function () {
            $location.path('/createTruck');
        };
        $scope.updteMenu = function () {
            $location.path('/updateMenu');
        }
    }])
    .controller('updateItem', ['$scope', '$routeParams', 'Items', '$location', function ($scope, $routeParams, Items, $location) {
        const idToGet = $routeParams.idmenus;
        console.log(idToGet)
        $scope.item = Items.get({ idmenus: idToGet });

        $scope.updateItem = function () {


            $scope.item.$update(function () {
                $location.path('/menu');
            });
        }

        $scope.deleteItem = function () {
            console.log('clicked')
            $scope.item.$delete(function () {
                $location.path('/menu');
                $('#delete-modal').on('hidden.bs.modal', () => {
                    $scope.$apply();
                });

                $('#delete-modal').modal('hide');
            });
        }
    }])
    .controller('createItem', ['$scope', '$routeParams', 'Items', '$location', 'UserService', function ($scope, $routeParams, Items, $location, UserService) {

        $scope.save = function () {
            UserService.me().then((me) => {
                console.log(me.truckId);

                let i = new Items({
                    foodTruckId: me.truckId,
                    item: $scope.item,
                    cost: $scope.price,

                })
                i.$save(function (success) {
                    $location.path('/menu');
                }, function (err) {
                    console.log(err);
                });
            });
        };




        $scope.updateItem = function () {

            getMenus = function () {
                UserService.me()
                    .then((me) => {
                        console.log(me);
                        $scope.menus = Menu.query({ foodTruckId: me.truckId });

                    })
            };

            getMenus();

            $scope.item.$update(function () {
                $location.path('/menu');

            });
        }
    }])
    .controller('ScheduleUpdate', ['$scope', '$routeParams', '$location', 'Schedules', 'Trucks', 'UserService','singleSchedule', function ($scope, $routeParams, $location, Schedules, Trucks, UserService, singleSchedule) {

        $scope.save = function () {
            UserService.me().then((me) => {
                console.log(me.truckId);

                let s = new DailySchedule({
                    truckId: me.truckId,
                    location: $scope.location,
                    locationname: $scope.locationname,
                    dayofweek: $scope.dayofweek,
                    lunchdinner: $scope.lunchdinner,
                    lat: $scope.lat,
                    lng: $scope.lng,
                    open: $scope.open,
                    close: $scope.close

                })
                s.$save(function (success) {
                    $location.path('/');
                }, function (err) {
                    console.log(err);
                });
            });
        };

        getSchedule = function () {
            UserService.me()
                .then((me) => {
                    console.log(me.truckId);
                    $scope.schedules = Schedules.query({ id: me.truckId });
                    console.log($scope.schedules)
                })
        };

        getSchedule();
    }])
    .controller('SingleScheduleUpdate', ['$scope', '$routeParams', '$location', 'Schedules', 'Trucks', 'UserService','singleSchedule','NgMap', function ($scope, $routeParams, $location, Schedules, Trucks, UserService, singleSchedule, NgMap) {
        $scope.trucks = Trucks.query();
        

        $scope.single = singleSchedule.get({ id: $routeParams.id })
        console.log($scope.single)

        $scope.save = function () {
            UserService.me().then((me) => {
                console.log(me.truckId);

                let s = new DailySchedule({
                    truckId: me.truckId,
                    location: $scope.location,
                    locationname: $scope.locationname,
                    dayofweek: $scope.dayofweek,
                    lunchdinner: $scope.lunchdinner,
                    lat: $scope.lat,
                    lng: $scope.lng,
                    open: $scope.open,
                    close: $scope.close

                })
                s.$save(function (success) {
                    $location.path('/');
                }, function (err) {
                    console.log(err);
                });
            });
        };


         $scope.updateSchedule = function () {
            console.log("clicked")
            console.log($scope.single)
            $scope.single.$update(function () {
                $location.path('/schedule');
            });
        }

        var vm = this;
        vm.types = "['establishment']";
        vm.placeChanged = function() {
          vm.place = this.getPlace();
          vm.place.geometry.location.latLng;
          document.getElementById("lat").ngmodel = vm.place.geometry.location.lat();
          document.getElementById("lng").ngmodel = vm.place.geometry.location.lng();
        //   document.getElementById("lat").value = vm.place.geometry.location.lat();
        //   document.getElementById("lng").value = vm.place.geometry.location.lng();
          $scope.single.lat = vm.place.geometry.location.lat();
          $scope.single.lng = vm.place.geometry.location.lng();
        }
        
        NgMap.getMap().then(function(map) {
          vm.map = map;
        });

    }])