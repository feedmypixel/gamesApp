(function( angular ){
    'use strict';

    var gamesAppController = angular.module( 'gamesApp.controller' );

    var IndexController = function( $scope, ApiService ){

        this.$scope = $scope;
        this._ApiService = ApiService;

        this.$scope.getAllGameTitles = this._getAllGameTitles.bind( this );

        this._initialize();
    }

    IndexController.prototype._initialize = function(){

        this.$scope.getAllGameTitles();
    };

    IndexController.prototype._getAllGameTitles = function(){

        this._ApiService.getAllGameTitles().$promise.then( function( response ){

            this.$scope.gamesTitles = response.titles;

        }.bind( this ), function( err ){



        }.bind( this ) );

    }

    IndexController.$inject = [ '$scope', 'ApiService' ];

    gamesAppController.controller( 'IndexController', IndexController );

}( angular ));