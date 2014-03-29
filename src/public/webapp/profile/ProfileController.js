(function( angular ){
    'use strict';

    var FORM_SUBMIT_SUCCESS_MESSAGE = 'Your details have been saved';
    var gamesAppController          = angular.module( 'gamesApp.controller' );

    var ProfileController = function( $scope, $location, UserService, ApiService, FlashMessageService ){

        this.$scope = $scope;
        this._$location = $location;
        this._UserService = UserService;
        this._ApiService = ApiService;
        this._FlashMessageService = FlashMessageService

        this.$scope.submitForm = this._submitForm.bind( this );
        this._getUserDetail.call( this );
    };

    ProfileController.prototype._getUserDetail = function(){

        var userId = this._UserService.getUserId();

        this._ApiService.getUserDetail( { userId: userId } ).$promise.then( function( response ){

            this.$scope.editForm = false;

            this.$scope.formData = this._createFormData( response );

            this.$scope.ageRange = this._createAgeRange();

        }.bind( this ), function( err ){} );
    };

    ProfileController.prototype._submitForm = function(){

        this._ApiService.setUserDetail( this.$scope.formData ).$promise.then( function( response ){

            this._FlashMessageService.setSuccessMessage( FORM_SUBMIT_SUCCESS_MESSAGE );

        }.bind( this ) );
    };

    ProfileController.prototype._createFormData = function( response ){

        return {

            firstName: response.firstName && response.firstName,

            lastName: response.lastName && response.lastName,

            phoneNumber: response.phoneNumber && response.phoneNumber,

            username: response.username && response.username,

            password: response.password && response.password,

            notes: response.notes && response.notes,

            genderIsFemale: response.genderIsFemale,

            age: response.age && response.age,

            userId: response.userId

        };
    };

    ProfileController.prototype._createAgeRange = function(){

        var ageRange = [];

        for( var i = 1, max = 120; i < max; ageRange.push( i++ ) ){};

        return ageRange;
    }

    ProfileController.$inject = [ '$scope', '$location', 'UserService', 'ApiService', 'FlashMessageService' ];

    gamesAppController.controller( 'ProfileController', ProfileController );

}( angular ) );