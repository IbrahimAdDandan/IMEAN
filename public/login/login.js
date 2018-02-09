angular.module('login', [])
    .controller('LoginController', LoginController);

function LoginController($http) {
    var vm = this;

    vm.message = 'Please login to get the admin\'s dashboard.';
    vm.login = function () {
        var user ='username=' + vm.username + '&password=' + vm.password;
        if (!vm.username || !vm.password) {
            console.log('error, no username or password entered!!');
        } else {
            var req = {
                method: 'POST',
                url: '/api/login',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                data: user
            };
            $http(req)
                .then(function (response) {
                    console.log(response);
                }, function (err) {
                    console.log(err);
                });
        }
    };
}