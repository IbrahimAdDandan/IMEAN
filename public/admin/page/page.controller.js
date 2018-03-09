angular.module('admin').controller('PageController', PageController);

function PageController($http, $routeParams, $route) {
    var vm = this;
    vm.pageId = $routeParams.pageId;
    $http
        .get('api/page/' + vm.pageId)
        .then(function(response){
            vm.page = response.data;
        });
    vm.deleteChild = function(spId) {
        var pageId = vm.page._id;
        console.log("spId: " + spId);
        $http
            .delete('api/page/' + pageId + '/subpage/' + spId)
            .then(function(response) {
                $route.reload();
            })
            .catch();
    };
}