angular.module('admin').controller('CreateChild', CreateChild);

function CreateChild($http, $routeParams, $location, $window) {
    var vm = this;
    var pageId = $routeParams.pageId;
    vm.createChild = function() {
        console.log("worked!" + pageId);
        var child = {
            title: vm.title,
            description: vm.description,
            order: vm.order,
            body: vm.body
        };
        $http
            .post('/api/page/' + pageId, child)
            .then(function(response){
                if(response.status == 201) {
                    $location.path("/page/" + pageId);
                }
            })
            .catch(function(){
                $window.alert("There was an error occured, please try again.");
            });
    };
}