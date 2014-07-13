(function( angular ){
    'use strict';

    var signinController = angular.module( 'gamesApp.signinController', [] );

    var SigninController = function( $scope, $window, ApiService, UserService ){

        this.$scope = $scope;
        this._ApiService = ApiService;
        this._UserService = UserService;
        this.$scope.form = {};

        this.$scope.submitForm = this._submitForm.bind( this );
    };

    SigninController.prototype._submitForm = function( isValid ){

        this.$scope.form.submitted = true;

        if( isValid ){

            this._ApiService.signinUser( this.$scope.formData ).$promise.then( function( response ){

                this._UserService.storeUserDetail( response.userId );

            }.bind( this ) );
        }
    };

    SigninController.$inject = [ '$scope', '$window', 'ApiService', 'UserService' ];

    signinController.controller( 'SigninController', SigninController );

}( angular ) );