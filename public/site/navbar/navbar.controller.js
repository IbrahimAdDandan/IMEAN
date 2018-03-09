angular.module('site').controller('Navbar', Navbar);

function Navbar ($http) {
    var nav = this;
    $http
        .get('/api/page')
        .then(function(response){
            nav.pages = response.data;
        });
}