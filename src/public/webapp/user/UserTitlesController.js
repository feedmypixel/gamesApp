(function( angular ){
    'use strict';

    var DELETED_STATUS_FLAG                = 'deleted';
    var GAME_TITLE_DELETED_SUCCESS_MESSAGE = 'That game have been removed';
    var gamesAppController                 = angular.module( 'gamesApp.controller' );

    var UserTitlesController = function( $scope, UserService, ApiService, FlashMessageService ){

        this.$scope = $scope;
        this._ApiService = ApiService;
        this._FlashMessageService = FlashMessageService
        this._userId = UserService.getUserId();

        this.$scope.removeTitleFromUserList = this._removeTitleFromUsersGameList.bind( this );

        this._getUserGameTitles.call( this );
    };

    UserTitlesController.prototype._getUserGameTitles = function(){

        this._ApiService.getUserTitles( { userId: this._userId } ).$promise.then( function( response ){

            this.$scope.gameTitles = response.titles;

        }.bind( this ), function( err ){} );
    };


    UserTitlesController.prototype._removeTitleFromUsersGameList = function( gameTitleId ){

        var data = {

            status: DELETED_STATUS_FLAG,

            userId: this._userId,

            titleId: gameTitleId

        };

        this._ApiService.deleteUserTitle( data ).$promise.then( function( response ){

            this._getUserGameTitles();
            this._FlashMessageService.setSuccessMessage( GAME_TITLE_DELETED_SUCCESS_MESSAGE );

        }.bind( this ) );
    };


    UserTitlesController.$inject = [ '$scope', 'UserService', 'ApiService', 'FlashMessageService' ];

    gamesAppController.controller( 'UserTitlesController', UserTitlesController );

}( angular ) );