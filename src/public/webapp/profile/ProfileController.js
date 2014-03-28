(function( angular ){
    'use strict';

    var HOME_PAGE_URL           = '/';
    var AUTHORIZATION_MESSAGE   = 'You need to be loggedIn to view that page!';
    var gamesAppController      = angular.module( 'gamesApp.controller' );

    var ProfileController = function( $scope, $location, UserService, ApiService, FlashMessageService ){

        this.$scope = $scope;
        this._$location = $location;
        this._UserService = UserService;
        this._ApiService = ApiService;
        this._FlashMessageService = FlashMessageService

        this._getUserDetail.call( this );
    };

    ProfileController.prototype._getUserDetail = function(){

        var userId = this._UserService.getUserId();

        if( !userId ){

            this._$location.path( HOME_PAGE_URL );
            this._FlashMessageService.setInformationMessage( AUTHORIZATION_MESSAGE );
        }

        this._ApiService.getUserDetail( { userId: userId } ).$promise.then( function( response ){

          console.log( response );

            this.$scope.user = response;

        }.bind( this ), function( err ){} );
    };

    ProfileController.$inject = [ '$scope', '$location', 'UserService', 'ApiService', 'FlashMessageService' ];

    gamesAppController.controller( 'ProfileController', ProfileController );

}( angular ) );