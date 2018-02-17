angular.module('admin').directive('adminNavbar', adminNavbar);

function adminNavbar () {
    return {
        restrict: 'E',
        templateUrl: 'admin/adminNavbar/adminNavbar.html'
    };
}