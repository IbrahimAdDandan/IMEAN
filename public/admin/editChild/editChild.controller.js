angular.module('admin').controller('EditChild', EditChild);

function EditChild ($routeParams, $http, $location) {
    var vm = this;
    var childId = $routeParams.childId;
    var pageId = $routeParams.pageId;
    $http
        .get('/api/page/' + pageId + '/subpage/' + childId)
        .then(function(response){
            if(response.status == 200) {
                var child = response.data;
                vm.title = child.title;
                vm.order = child.order;
                vm.description = child.description;
                vm.body = child.body;
            } else {
                $window.alert('There is an error occured!');
            }
        })
        .catch();
    vm.editChild = function () {
        var editedChild = {
            title: vm.title,
            order: vm.order,
            description: vm.description,
            body: vm.body
        };
        $http
            .put('/api/page/' + pageId + '/subpage/' + childId, editedChild)
            .then(function(response){
                if(response.status == 204) {
                    $location.path('/page/' + pageId);
                }
            })
            .catch();
    };
}