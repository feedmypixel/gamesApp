(function( angular ){
    'use strict';

    var HOME_PAGE_URL                   = '/';
    var REGISTRATION_SUCCESS_MESSAGE    = 'Congratulations your are now registered!';
    var gamesAppController              = angular.module( 'gamesApp.controller' );

    var RegisterController = function( $scope, $location, $window, ApiService, FlashMessageService, UserService ){

        this.$scope = $scope;
        this._ApiService = ApiService;
        this._FlashMessageService = FlashMessageService;
        this._UserService = UserService;
        this._$location = $location;
        this.$scope.form = {};

        this.$scope.submitForm = this._submitForm.bind( this );
    };

    RegisterController.prototype._submitForm = function( isValid ){

        this.$scope.form.submitted = true;

        if( isValid ){

            this._ApiService.registerUser( this.$scope.formData ).$promise.then( function( user ){

                //auto sign in user
                user.$signinUser( function( user ){

                    this._UserService.storeUserDetail( { sessionId: user.sessionId, userId: user.userId } );

                    this._FlashMessageService.setSuccessMessage( REGISTRATION_SUCCESS_MESSAGE );

                    this._$location.path( HOME_PAGE_URL );

                }.bind( this ), function( httpResponse ){} );

            }.bind( this ), function( httpResponse ){} );
        }
    };

    RegisterController.$inject = [ '$scope', '$location', '$window', 'ApiService', 'FlashMessageService', 'UserService' ];

    gamesAppController.controller( 'RegisterController', RegisterController );

}( angular ) );