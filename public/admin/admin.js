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
        .when('/createCategory', {
            templateUrl: 'admin/createCategory/createCategory.html',
            controller: CreateCategory,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/pages', {
            templateUrl: 'admin/pages/pages.html',
            controller: PagesController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/page/:pageId', {
            templateUrl: 'admin/page/page.html',
            controller: PageController,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/editPage/:pageId', {
            templateUrl: 'admin/editCategory/editCategory.html',
            controller: EditCategory,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/:pageId/createChild', {
            templateUrl: 'admin/createChild/createChild.html',
            controller: CreateChild,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .when('/page/:pageId/child/:childId', {
            templateUrl: 'admin/editChild/editChild.html',
            controller: EditChild,
            controllerAs: 'vm',
            access: {
                restricted: true
            }
        })
        .otherwise({
            redirectTo: '/admin'
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
