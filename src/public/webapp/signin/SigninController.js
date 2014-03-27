(function( angular ){
    'use strict';

    var COOKIE_SESSION_ID_NAME  = 'sessionId';
    var HOME_PAGE_URL           = '/';
    var SIGNIN_SUCCESS_MESSAGE  = 'Congratulations your are now signed in!';
    var gamesAppController      = angular.module( 'gamesApp.controller' );

    var SigninController = function( $scope, $location, $window, ApiService, FlashMessageService ){

        this.$scope = $scope;
        this._ApiService = ApiService;
        this._FlashMessageService = FlashMessageService;
        this._$window = $window;
        this._$location = $location;
        this.$scope.form = {};

        this.$scope.submitForm = this._submitForm.bind( this );
    };

    SigninController.prototype._submitForm = function( isValid ){

        this.$scope.form.submitted = true;

        if( isValid ){

            this._ApiService.signinUser( this.$scope.formData ).$promise.then( function( user ){

                this._$window.sessionStorage.setItem( COOKIE_SESSION_ID_NAME, user.sessionId );

                this._FlashMessageService.setMessage( {

                    className: 'success',
                    msg: SIGNIN_SUCCESS_MESSAGE

                } );

                this._$location.path( HOME_PAGE_URL );

            }.bind( this ), function( httpResponse ){} );
        }
    };

    SigninController.$inject = [ '$scope', '$location', '$window', 'ApiService', 'FlashMessageService' ];

    gamesAppController.controller( 'LoginController', SigninController );

}( angular ) );