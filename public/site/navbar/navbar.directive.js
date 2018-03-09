angular.module('site').directive('navbar', navbar);

function navbar () {
    return {
        restrict: 'E',
        templateUrl: 'site/navbar/navbar.html',
        controller: Navbar,
        controllerAs: 'nav'
    };
}