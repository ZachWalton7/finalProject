angular.module('TruckHunt.directives', [])

.directive('mainNavigation', [function() {
    return {
        templateUrl: 'directives/navbar.html',
        restrict: 'E',
        scope: {
            activePage: '='
        }
    };
}])

// Directive for Footer
.directive('footerNav', [function() {
    return {
        templateUrl: 'directives/footer.html',
        restrict: 'E',
    };
}]);