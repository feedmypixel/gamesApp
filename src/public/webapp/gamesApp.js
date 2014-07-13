(function( angular ){
    'use strict';

    var gamesApp = angular.module( 'gamesApp', [

        'ngRoute',
        'ngResource',
        'gamesApp.flashMessageDirective',
        'gamesApp.showPasswordDirective',
        'gamesApp.throbberDirective',
        'gamesApp.camelCaseToUppercaseWordsFilter',
        'gamesApp.preserveObjectOrderFilter',
        'gamesApp.httpInterceptor',
        'gamesApp.flashMessageService',
        'gamesApp.httpStatusService',
        'gamesApp.userService',
        'gamesApp.indexController',
        'gamesApp.navigationController',
        'gamesApp.registerController',
        'gamesApp.signinController',
        'gamesApp.userController',
        'gamesApp.apiService'

    ] );

    gamesApp.config( [ '$httpProvider', '$routeProvider', '$locationProvider',
        function( $httpProvider, $routeProvider, $locationProvider ){

        $routeProvider.when( '/', {

            templateUrl: '/views/partials/index.html',
            controller: 'IndexController'

        } ).when( '/signin', {

            templateUrl: '/views/partials/signin.html',
            controller: 'SigninController'

        } ).when( '/register', {

            templateUrl: '/views/partials/register.html',
            controller: 'RegisterController'

        } ).when( '/user', {

            templateUrl: '/views/partials/userProfile.html',
            controller: 'UserController'

        } ).when( '/signout', {

            resolve: { load: [ '$location', 'UserService', 'FlashMessageService', 'ApiService',
                function( $location, UserService, FlashMessageService, ApiService ){

                    ApiService.logoutUser().$promise.then(function(){
                        UserService.logout();
                    } );
                }
            ] }

        } ).otherwise( { redirectTo: '/' } );

        $locationProvider.html5Mode( true ).hashPrefix( '!' );

        $httpProvider.interceptors.push( 'HttpInterceptor' );
    } ] );

}( angular ) );