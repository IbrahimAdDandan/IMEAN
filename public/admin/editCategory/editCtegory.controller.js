angular.module('admin').controller('EditCategory', EditCategory);

function EditCategory ($http, $routeParams, $location, $window) {
    var vm = this;
    var pageId = $routeParams.pageId;
    $http
        .get('/api/page/' + pageId)
        .then(function(response){
            vm.page = response.data;
            //console.log(vm.page);
            vm.title = vm.page.title;
            vm.order = vm.page.order;
            vm.description = vm.page.description;
        })
        .catch();
    vm.editCategory = function() {
        var catUpdated = {
            title: vm.title,
            order: vm.order,
            description: vm.description
        };
        $http
            .put('/api/page/' + pageId, catUpdated)
            .then(function(response) {
                if(response.status == 204) {
                    $location.path('/pages');
                } else {
                    $window.alert('There is an error occured, please try again!');
                }
            })
            .catch();
    };
}