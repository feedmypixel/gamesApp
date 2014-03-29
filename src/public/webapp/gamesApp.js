(function( angular ){
    'use strict';

    var INDEX_PAGE_URL               = '/';
    var SIGNOUT_SUCCESS_MESSAGE = 'Bye bye!';
    var gamesApp                = angular.module( 'gamesApp', [

        'ngRoute',
        'ngResource',
        'gamesApp.service',
        'gamesApp.directive',
        'gamesApp.controller'

    ] );

    gamesApp.config( [ '$httpProvider', '$routeProvider', '$locationProvider', function( $httpProvider, $routeProvider, $locationProvider ){

        $routeProvider.when( '/', {

            templateUrl: '/views/partials/index.html',
            controller: 'IndexController'

        } ).when( '/signin', {

            templateUrl: '/views/partials/signin.html',
            controller: 'SigninController'

        } ).when( '/register', {

            templateUrl: '/views/partials/register.html',
            controller: 'RegisterController'

        } ).when( '/user/titles', {

            templateUrl: '/views/partials/userTitles.html',
            controller: 'UserTitlesController'

        } ).when( '/user', {

            templateUrl: '/views/partials/userProfile.html',
            controller: 'UserController'

        } ).when( '/signout', {

            resolve: { load: [ '$location', 'UserService', 'FlashMessageService', function( $location, UserService, FlashMessageService ){

                UserService.logout();
                FlashMessageService.setSuccessMessage( SIGNOUT_SUCCESS_MESSAGE );
                $location.path( INDEX_PAGE_URL );

            } ] }

        } ).otherwise( { redirectTo: '/' } );

        $locationProvider.html5Mode( true ).hashPrefix( '!' );

        $httpProvider.interceptors.push( 'AuthInterceptor' );
    } ] );

    // init app modules
    angular.module( 'gamesApp.controller', [] );
    angular.module( 'gamesApp.service', [] );
    angular.module( 'gamesApp.directive', [] );

}( angular ) );