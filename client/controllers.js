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
    .controller('MapController', ['$scope', 'NgMap', 'DailySchedule','SEOService','$location', function ($scope, NgMap, DailySchedule, SEOService, $location) {
        let vm = this

        NgMap.getMap().then(function(map) {
            vm.map = map;
        });
        
        vm.clicked = function () {
            alert('Clicked a link inside infoWindow')
        };

        vm.shops = DailySchedule.query();

        vm.shop = vm.shops[0];

        vm.showDetail = function(e, shop){
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
        'SEOService', function (
            $scope, 
            Menu,
            Trucks, 
            $location, 
            $routeParams, 
            NgMap, 
            DailySchedule,
            SEOService
        ) {

            $('.carousel').carousel();
        
        const route = $routeParams.theId;
        $scope.single = DailySchedule.get({ id: route });
        console.log($scope.single);

        $scope.menu = Menu.query({ id: route });
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
    .controller('LoginController', ['$scope', 'UserService', '$location', function($scope, UserService, $location) {
        UserService.me()
        .then((me) => {
            redirect();
        });
    
        function redirect() {
            let dest = $location.search().dest;
            if (!dest) {
                dest = '/';
            }
            $location.replace().path(dest).search('dest', null);
        }
    
        $scope.login = function() {
            UserService.login($scope.email, $scope.password)
            .then((user) => {
                redirect();
            });
        }
        $scope.createUser = function() {
            $location.path('/signup');
        }
    }])
    .controller('LogoutController', ['$location', 'UserService', function($location, UserService) {
        UserService.logout()
        .then(() => {
            $location.replace().path('/');
        });
    }])
    .controller('MenuUpdate', ['$scope', '$routeParams', 'Menu', 'UserService', 'Items', function($scope, $routeParams, Menu, UserService, Items){
       
        getMenus = function () {
            UserService.me()
        .then((me) => {
            console.log(me);
           $scope.menus = Menu.query({ id: me.truckId });
           
        })};

        getMenus();
        
        

        // const idToGet = $routeParams.id
        // console.log(idToGet)
        
        // console.log($scope.menu);
        $scope.updateMenu = function (menuid) {
            console.log(menuid)
            $scope.singleItem = Items.get({ id: menuid });
            console.log($scope.singleItem);

            $scope.singleItem.$update(function () {
                $location.path('/menu');
            });
        };
    }])
    .controller('SignupController', ['$scope', '$location', 'Users', function($scope, $location, Users){

        $scope.save = function() {
            let u = new Users({
                username: $scope.username,
                email: $scope.email,
                password: $scope.password
            });
            u.$save(function(sucess) {
                $location.path('/');
            }, function(err) {
                console.log(err);
            });
        }
    }]) 
    .controller('CreateTruckController', ['$scope', '$location', 'Categories', 'Users', 'Create', function($scope, $location, Categories, Users, Create){
        $scope.categories = Categories.query();
        $scope.users = Users.query();
        $scope.save = function() {
        let t = new Create({
            userid: $scope.userid,
            categoryid: $scope.categoryid,
            name: $scope.name,
            description: $scope.description,
            imgone: $scope.imgone,
            imgtwo: $scope.imgtwo,
            imgthree: $scope.imgthree
        });
        t.$save(function(sucess) {
            $location.path('/');
        }, function(err) {
            console.log(err);
        });
    }
    }])
    .controller('LogoutController', ['$location', 'UserService', function($location, UserService) {
        UserService.logout()
        .then(() => {
            $location.replace().path('/');
        });
    }])