(function( angular ){
    'use strict';

    var gamesAppController = angular.module( 'gamesApp.controller' );


    var LoginController = function( $scope ){

        this.$scope = $scope;

        this.$scope.form = {};

        this.$scope.submitForm = this._submitForm.bind( this );
    };

    LoginController.prototype._submitForm = function( isValid ){

        this.$scope.form.submitted = true;

        if( isValid ){

        }
    };

    LoginController.$inject = [ '$scope' ];

    gamesAppController.controller( 'LoginController', LoginController );

}( angular ) );