angular.module('admin', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: 'admin/login/login.html',
            controller: LoginController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/admin', {
            templateUrl: 'admin/adminArea/adminArea.html',
            controller: AdminArea,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/profile', {
            templateUrl: 'admin/profile/profile.html',
            controller: ProfileController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}

function run($window, $rootScope, AuthFactory) {
    
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
        if(nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $window.location.href = '/';
        }
    });
}
