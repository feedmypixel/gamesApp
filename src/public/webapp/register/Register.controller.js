(function( angular ){
    'use strict';

    var registerController = angular.module( 'gamesApp.registerController', [] );

    var RegisterController = function( $scope, $window, ApiService, UserService ){

        this.$scope = $scope;
        this._ApiService = ApiService;
        this._UserService = UserService;
        this.$scope.form = {};

        this.$scope.submitForm = this._submitForm.bind( this );
    };

    RegisterController.prototype._submitForm = function( isValid ){

        this.$scope.form.submitted = true;

        if( isValid ){

            this._ApiService.registerUser( this.$scope.formData ).$promise.then( function( response ){

                this._UserService.storeUserDetail( response.userId );

            }.bind( this ) );
        }
    };

    RegisterController.$inject = [ '$scope', '$window', 'ApiService', 'UserService' ];

    registerController.controller( 'RegisterController', RegisterController );

}( angular ) );