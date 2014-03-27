(function( angular ){
    'use strict';

    var COOKIE_SESSION_ID_NAME          = 'sessionId';
    var HOME_PAGE_URL                   = '/';
    var REGISTRATION_SUCCESS_MESSAGE    = 'Congratulations your are now registered!';
    var gamesAppController              = angular.module( 'gamesApp.controller' );

    var RegisterController = function( $scope, $location, $window, ApiService, FlashMessageService ){

        this.$scope = $scope;
        this._ApiService = ApiService;
        this._FlashMessageService = FlashMessageService;
        this._$window = $window;
        this._$location = $location;
        this.$scope.form = {};

        this.$scope.submitForm = this._submitForm.bind( this );
    };

    RegisterController.prototype._submitForm = function( isValid ){

        var registerController = this;

        this.$scope.form.submitted = true;

        if( isValid ){

            this._ApiService.registerUser( this.$scope.formData ).$promise.then( function( user ){

                //auto sign in user
                user.$signinUser( function( user ){

                    this._$window.sessionStorage.setItem( COOKIE_SESSION_ID_NAME, user.sessionId );

                    this._FlashMessageService.setMessage( {

                        className: 'success',
                        msg: REGISTRATION_SUCCESS_MESSAGE

                    } );

                    this._$location.path( HOME_PAGE_URL );

                }.bind( this ), function( httpResponse ){} );

            }.bind( this ), function( httpResponse ){} );
        }
    };

    RegisterController.$inject = [ '$scope', '$location', '$window', 'ApiService', 'FlashMessageService' ];

    gamesAppController.controller( 'RegisterController', RegisterController );

}( angular ) );