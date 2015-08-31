'use strict';

/*
 * Main Angular module
 *
 * Style guide:
 * avoid polluting global namespace:
 *  var app = angular.module('app');
 */

angular.module('MainApplicationModule', ['ui.router', 'ngAnimate', /* 'ngCookies' */ ]);

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
                'navigation': {
                    templateUrl: '/app/partials/navigation.html',
                    controller: 'NavigationController'
                },
                'content': {
                    templateUrl: '/app/partials/welcome.html',
                    controller: 'WelcomeController'
                }
            }
        })
        .state('logging-in', {
            url:'/login',
            views: {
                'navigation': {
                    templateUrl: '/app/partials/navigation.html',
                    controller: 'NavigationController'
                },
                'content': {
                    templateUrl: '/app/partials/login.html',
                    controller: 'LoginController'
                }
            }
        })
        .state('logging-out', {
            url:'/logout',
            views: {
                'navigation': {
                    templateUrl: '/app/partials/navigation.html',
                    controller: 'NavigationController'
                },
                'content': {
                    templateUrl: '/app/partials/logout.html',
                    controller: 'LogoutController'
                }
            }
        })
        .state('existing-blogger', {
            url:'/blogger/:username',
            views: {
                'navigation': {
                    templateUrl: '/app/partials/navigation.html',
                    controller: 'NavigationController'
                },
                'content': {
                    templateUrl: '/app/partials/blogger.html',
                    controller: 'BloggerController'
                },
                'sidebar': {
                    templateUrl: '/app/partials/blogger-sidebar.html',
                    controller: 'BloggerSidebarController'
                }
            }
        })
        .state('authenticated-blogger', {
            url:'/blogger',
            views: {
                'navigation': {
                    templateUrl: '/app/partials/navigation.html',
                    controller: 'NavigationController'
                },
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
    }])
    .run( function($rootScope) {
        // register listener to watch route changes
        $rootScope.$on("$locationChangeStart", function(event, next, current) {
            $rootScope.$broadcast('page-reloaded');
        });

    });
