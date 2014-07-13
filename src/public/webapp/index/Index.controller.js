(function( angular ){
    'use strict';

    var indexController = angular.module( 'gamesApp.indexController', [] );

    var IndexController = function( $scope, UserService, ApiService ){

        this.$scope = $scope;
        this.$scope.isLoggedIn = UserService.isLoggedIn();
        this._ApiService = ApiService;

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

                var userGameTitlesPromise = this._ApiService.getUserGameTitles().$promise;

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

        this._ApiService.addUserTitle( { id: gameTitleId } ).$promise.then( function(){

            this._processGameTitleLists();

        }.bind( this ) );
    };

    IndexController.prototype._removeTitleFromUsersGameList = function( gameTitleId ){

        this._ApiService.deleteUserTitle( { id: gameTitleId } ).$promise.then( function(){

            this._processGameTitleLists();

        }.bind( this ) );
    };

    IndexController.$inject = [ '$scope', 'UserService', 'ApiService' ];

    indexController.controller( 'IndexController', IndexController );

}( angular ));