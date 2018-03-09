angular.module('admin').controller('LoginController', LoginController);

function LoginController($http, $window, $location, AuthFactory, jwtHelper) {
    var vm = this;

    vm.message = 'Please login to get the admin\'s dashboard.';
    vm.login = function () {
        var user ='username=' + vm.username + '&password=' + vm.password;
        if (!vm.username || !vm.password) {
            console.log('error, no username or password entered!!');
            $window.alert('Error, no username or password entered!!');
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
                    if (response.data.success) {
                        //$window.alert('welcome ' + vm.username);
                        $window.sessionStorage.token = response.data.token;
                        AuthFactory.isLoggedIn = true;
                        var token = $window.sessionStorage.token;
                        var decodedToken = jwtHelper.decodeToken(token);
                        var username = decodedToken.username;
                        $window.sessionStorage.setItem('username', username);
                        $window.sessionStorage.setItem('userType', 'admin');
                        //$window.location.href = 'admin.html';
                        $location.path('/admin');
                    } else {
                        $window.alert('something went wrong! please try again later.');
                    }
                }, function (err) {
                    console.log(err);
                    $window.alert('Invalid username or password!');
                });
        }
    };

    vm.logout = function () {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        //redirect to the login page.
    };
}