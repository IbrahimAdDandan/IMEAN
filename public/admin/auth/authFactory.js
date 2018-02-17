angular.module('admin').factory('AuthFactory', AuthFactory);

function AuthFactory (jwtHelper, $window) {
    
    var auth = {
        isLoggedIn: false,
        adminType: 'admin'
    };

    return {
        auth: auth
    };

}