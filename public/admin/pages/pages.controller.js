angular.module('admin').controller('PagesController', PagesController);

function PagesController($http, $route) {
    var vm = this;
    $http
        .get('/api/page')
        .then(function (response) {
            //console.log(response);
            vm.pages = response.data;
        });

    vm.deleteCat = function (pageId) {
        $http
            .delete('/api/page/' + pageId)
            .then(function(response){
                if(response.status == 204) {
                    $route.reload();
                } else {
                    $window.alert('There is an error occured, please try again!');
                }
            })
            .catch();
    };
}