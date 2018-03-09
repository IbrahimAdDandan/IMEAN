angular.module('site').controller('CatController', CatController);

function CatController($routeParams, $http) {
    var vm = this;
    var catId = $routeParams.pageId;
    $http
        .get('/api/page/' + catId)
        .then(function (response) {
            if (response.status == 200) {
                vm.category = response.data;
                vm.title = vm.category.childs[0].title;
                vm.description = vm.category.childs[0].description;
                vm.body = vm.category.childs[0].body;
            } else {
                $window.alert('There is an error occured, please try again!');
            }
        })
        .catch();
    vm.toggle = function (index) {
        vm.title = vm.category.childs[index].title;
        vm.description = vm.category.childs[index].description;
        vm.body = vm.category.childs[index].body;
    };
}