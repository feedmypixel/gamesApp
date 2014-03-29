(function( angular ){
    'use strict';

    var ADDED_STATUS_FLAG                = 'added';
    var GAME_TITLE_ADDED_SUCCESS_MESSAGE = 'That game have been added';
    var gamesAppController               = angular.module( 'gamesApp.controller' );

    var IndexController = function( $scope, UserService, ApiService, FlashMessageService ){

        this.$scope = $scope;
        this._ApiService = ApiService;
        this._FlashMessageService = FlashMessageService
        this._userId = UserService.getUserId();

        this.$scope.addTitleToUserList = this._addTitleToUsersGameList.bind( this );

        this._getAllGameTitles.call( this );
    }

    IndexController.prototype._getAllGameTitles = function(){

        this._ApiService.getAllGameTitles().$promise.then( function( response ){

            this.$scope.gamesTitles = response.titles;

        }.bind( this ), function( err ){} );

    }

    IndexController.prototype._addTitleToUsersGameList = function( gameTitleId ){

        var data = {

            status: ADDED_STATUS_FLAG,

            userId: this._userId,

            titleId: gameTitleId

        };

        this._ApiService.addUserTitle( data ).$promise.then( function(){

            //TODO add in a class and disabled flag to show the returned title has been added to user list
            this._getAllGameTitles();
            this._FlashMessageService.setSuccessMessage( GAME_TITLE_ADDED_SUCCESS_MESSAGE );

        }.bind( this ) );
    };

    IndexController.$inject = [ '$scope', 'UserService', 'ApiService', 'FlashMessageService' ];

    gamesAppController.controller( 'IndexController', IndexController );

}( angular ));