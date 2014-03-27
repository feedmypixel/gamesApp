(function( angular ){
    'use strict';

    var gamesApp = angular.module( 'gamesApp', [

        'ngRoute',
        'ngResource',
        'gamesApp.service',
        'gamesApp.directive',
        'gamesApp.controller'

    ] );

    gamesApp.config( [ '$httpProvider', '$routeProvider', '$locationProvider', function( $httpProvider, $routeProvider, $locationProvider ){

        $routeProvider.when( '/', {

            templateUrl: '/partials/index.html',
            controller: 'IndexController'

        } ).when( '/login', {

            templateUrl: '/partials/login.html',
            controller: 'LoginController'

        } ).when( '/register', {

            templateUrl: '/partials/register.html',
            controller: 'RegisterController'

        } ).otherwise( { redirectTo: '/' } );

        $locationProvider.html5Mode( true ).hashPrefix( '!' );

        $httpProvider.interceptors.push( 'AuthInterceptor' );

    } ] );

    // init app modules
    angular.module( 'gamesApp.controller', [] );
    angular.module( 'gamesApp.service', [] );
    angular.module( 'gamesApp.directive', [] );

}( angular ) );