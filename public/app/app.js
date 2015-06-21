'use strict';

/*
 * Main Angular module
 *
 * Style guide:
 * avoid polluting global namespace:
 *  var app = angular.module('app');
 */

angular.module('MainApplicationModule', ['ui.router', 'ngAnimate']);

/*
 * Add SPA Routing using route provider
 *
 * Style guide:
 * avoid using a variable and instead use chaining with the getter syntax
 *
 */

angular
    .module('MainApplicationModule')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/welcome');

    $stateProvider
        .state('just-arrived', {
            url:'/welcome',
            views: {
                'content': {
                    templateUrl: '/app/partials/welcome.html',
                    controller: 'WelcomeController'
                }
            }
        })
        .state('unauthenticated', {
            url:'/login',
            views: {
                'content': {
                    templateUrl: '/app/partials/login.html',
                    controller: 'LoginController'
                }
            }
        })
        .state('blogger', {
            url:'/blogger',
            views: {
                'content': {
                    templateUrl: '/app/partials/blogger.html',
                    controller: 'BloggerController'
                },
                'sidebar': {
                    templateUrl: '/app/partials/blogger-sidebar.html',
                    controller: 'BloggerSidebarController'
                }
            }
        });
}]);
