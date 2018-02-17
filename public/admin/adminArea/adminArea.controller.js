angular.module('admin').controller('AdminArea', AdminArea);

function AdminArea ($window) {
    var vm = this;
    vm.username = $window.sessionStorage.getItem('username');
    vm.logout = function () {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $window.location.href = '/';
    };
}