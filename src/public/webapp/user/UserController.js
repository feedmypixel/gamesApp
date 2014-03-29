(function( angular ){
    'use strict';

    var GENDER_MALE                 = 'male';
    var GENDER_FEMALE               = 'female';
    var PROFILE_SECTION_NAME        = 'profile';
    var FORM_SUBMIT_SUCCESS_MESSAGE = 'Your details have been saved';
    var gamesAppController          = angular.module( 'gamesApp.controller' );

    var UserController = function( $scope, $location, UserService, ApiService, FlashMessageService ){

        this.$scope = $scope;
        this._$location = $location;
        this._ApiService = ApiService;
        this._FlashMessageService = FlashMessageService
        this._userId = UserService.getUserId();

        this.$scope.profileSection = PROFILE_SECTION_NAME;
        this.$scope.submitForm = this._submitForm.bind( this );

        this._getUserDetail.call( this );

    };

    UserController.prototype._getUserDetail = function(){

        this._ApiService.getUserDetail( { userId: this._userId } ).$promise.then( function( response ){

            this.$scope.profileMode = 'view';

            this.$scope.formData = this._createFormData( response );

            this.$scope.userData = this._createUserData( this.$scope.formData );

            this.$scope.ageRange = this._createAgeRange();

        }.bind( this ), function( err ){} );
    };

    UserController.prototype._createUserData = function( response ){

        //manipulate form data for viewing
        var userData = this._createFormData( response );
        var genderIsFemale = userData.genderIsFemale;

        delete userData.password;
        delete userData.userId;
        delete userData.genderIsFemale;

        userData.gender = genderIsFemale ? GENDER_FEMALE : GENDER_MALE;

        return userData;
    };

    UserController.prototype._submitForm = function(){

        this._ApiService.setUserDetail( this.$scope.formData ).$promise.then( function( response ){

            this.$scope.userData = this._createUserData( this.$scope.formData );

            this._FlashMessageService.setSuccessMessage( FORM_SUBMIT_SUCCESS_MESSAGE );

        }.bind( this ) );
    };

    UserController.prototype._createFormData = function( response ){

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

    UserController.prototype._createAgeRange = function(){

        var ageRange = [];

        for( var i = 1, max = 120; i < max; ageRange.push( i++ ) ){};

        return ageRange;
    }

    UserController.$inject = [ '$scope', '$location', 'UserService', 'ApiService', 'FlashMessageService' ];

    gamesAppController.controller( 'UserController', UserController );

}( angular ) );