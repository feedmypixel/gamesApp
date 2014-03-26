(function( angular ){
    'use strict';

    var gamesAppController = angular.module( 'gamesApp.controller' );

    var RegisterController = function( $scope ){

        this.$scope = $scope;

        this.$scope.submitForm = this._submitForm.bind( this );
    };

    RegisterController.prototype._submitForm = function( isValid ){

    };

    RegisterController.$inject = [ '$scope' ];

    gamesAppController.controller( 'RegisterController', RegisterController );

}( angular ) );