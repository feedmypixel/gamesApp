(function( angular ){
    'use strict';

    var DELETED_STATUS_FLAG                 = 'deleted';
    var GAME_TITLE_DELETED_SUCCESS_MESSAGE  = 'That game have been removed';
    var ADDED_STATUS_FLAG                   = 'added';
    var GAME_TITLE_ADDED_SUCCESS_MESSAGE    = 'That game have been added';
    var gamesAppController                  = angular.module( 'gamesApp.controller' );

    var IndexController = function( $scope, UserService, ApiService, FlashMessageService ){

        this.$scope = $scope;
        this.$scope.isLoggedIn = UserService.isLoggedIn();
        this._ApiService = ApiService;
        this._FlashMessageService = FlashMessageService
        this._userId = UserService.getUserId();

        this.$scope.addTitleToUserList = this._addTitleToUsersGameList.bind( this );
        this.$scope.removeTitleFromUserList = this._removeTitleFromUsersGameList.bind( this );

        this._processGameTitleLists.call( this );

    }

    IndexController.prototype._processGameTitleLists = function(){

        var availableTitlesPromise = this._ApiService.getAllGameTitles().$promise;
        var availableGamesTitles;

        availableTitlesPromise.then( function( response ){

            availableGamesTitles = response.titles;

        } ).then( function(){

            if( this.$scope.isLoggedIn ){

                var userGameTitlesPromise = this._ApiService.getUserTitles( { userId: this._userId } ).$promise;

                userGameTitlesPromise.then( function( response ){

                    var gameTitles = [];
                    var userTitleIds = [];
                    var userTitles = this.$scope.userGameTitles = response.titles;

                    if( userTitles ){

                        angular.forEach( userTitles, function( game ){

                            userTitleIds.push( game.id );
                        });

                        angular.forEach( availableGamesTitles, function( gameTitle ){

                            if( !~userTitleIds.indexOf( gameTitle.id ) ){

                                gameTitles.push( gameTitle );
                            }

                        } );

                        this.$scope.availableGamesTitles = gameTitles;
                    }

                }.bind( this ) );

            } else {

                this.$scope.availableGamesTitles = availableGamesTitles;
            }

        }.bind( this ) );
    };

    IndexController.prototype._addTitleToUsersGameList = function( gameTitleId ){

        if( !this.$scope.isLoggedIn ){

            return;
        }

        var data = {

            status: ADDED_STATUS_FLAG,

            userId: this._userId,

            titleId: gameTitleId

        };

        this._ApiService.addUserTitle( data ).$promise.then( function(){

            this._processGameTitleLists();
            this._FlashMessageService.setSuccessMessage( GAME_TITLE_ADDED_SUCCESS_MESSAGE );

        }.bind( this ) );
    };

    IndexController.prototype._removeTitleFromUsersGameList = function( gameTitleId ){

        var data = {

            status: DELETED_STATUS_FLAG,

            userId: this._userId,

            titleId: gameTitleId
        };

        this._ApiService.deleteUserTitle( data ).$promise.then( function(){

            this._processGameTitleLists();
            this._FlashMessageService.setSuccessMessage( GAME_TITLE_DELETED_SUCCESS_MESSAGE );

        }.bind( this ) );
    };

    IndexController.$inject = [ '$scope', 'UserService', 'ApiService', 'FlashMessageService' ];

    gamesAppController.controller( 'IndexController', IndexController );

}( angular ));