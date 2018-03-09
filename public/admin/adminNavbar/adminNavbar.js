angular.module('admin').directive('adminNavbar', adminNavbar).controller('NavbarController', NavbarController);

function adminNavbar () {
    return {
        restrict: 'E',
        templateUrl: 'admin/adminNavbar/adminNavbar.html'
    };
}

function NavbarController($window) {
    var nb = this;
    nb.username = $window.sessionStorage.getItem('username');
    nb.logout = function () {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $window.location.href = '/';
    };
}