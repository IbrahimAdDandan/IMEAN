angular.module('admin').controller('CreateCategory', CreateCategory);

function CreateCategory($http, $location, $window) {
    var vm = this;
    vm.createCategory = function() {
        var category = {
            title: vm.title,
            order: vm.order,
            description: vm.description
        };
        $http
            .post('/api/page', category)
            .then(function(response){
                if(response.status == 201) {
                    $location.path('/pages');
                } else {
                    $window.alert('There is an error occured, please try again!');
                }
            })
            .catch();
    };
}