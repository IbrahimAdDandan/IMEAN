angular.module('site', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'site/home/home.html',
            controller: homeController,
            controllerAs: 'vm'
        })
        .when('/category/:pageId', {
            templateUrl: 'site/category/category.html',
            controller: CatController,
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
}