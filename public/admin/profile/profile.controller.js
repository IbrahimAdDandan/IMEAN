angular.module('admin').controller('ProfileController', ProfileController);

function ProfileController($window) {
    var vm = this;
    vm.logout = function () {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $window.location.href = '/';
    };
}