(function( angular ){
    'use strict';

    var GENDER_MALE                 = 'male';
    var GENDER_FEMALE               = 'female';
    var EDIT_PROFILE_SECTION_NAME   = 'edit';
    var VIEW_PROFILE_SECTION_NAME   = 'view';
    var userController             = angular.module( 'gamesApp.userController', [] );

    var UserController = function( $scope, $filter, UserService, ApiService ){

        this.$scope = $scope;
        this._$filter = $filter;
        this._ApiService = ApiService;

        this.$scope.profileMode = VIEW_PROFILE_SECTION_NAME;
        this.$scope.submitForm = this._submitForm.bind( this );

        this._getUserDetail.call( this );
    };

    UserController.prototype._getUserDetail = function(){

        this._ApiService.getUserDetail().$promise.then( function( response ){

            this.$scope.profileMode = 'view';

            this.$scope.formData = this._createFormData( response.user );

            this.$scope.userData = this._createUserData( this.$scope.formData );

            this.$scope.ageRange = this._createAgeRange();

        }.bind( this ), function( err ){} );
    };

    UserController.prototype._createUserData = function( user ){

        //manipulate form data for viewing
        var userData = this._createFormData( user );

        var genderIsFemale = userData.genderIsFemale;

        delete userData.password;
        delete userData.userId;
        delete userData.genderIsFemale;

        userData.gender = genderIsFemale ? GENDER_FEMALE : GENDER_MALE;

        return this._$filter('preserveObjectOrder')( userData );
    };

    UserController.prototype._submitForm = function(){

        this._ApiService.setUserDetail( this.$scope.formData ).$promise.then( function( response ){

            this.$scope.profileMode = EDIT_PROFILE_SECTION_NAME;

            this.$scope.userData = this._createUserData( this.$scope.formData );

            this.$scope.profileMode = 'view';

        }.bind( this ) );
    };

    UserController.prototype._createFormData = function( user ){

        return {

            firstName: user.firstName && user.firstName,

            lastName: user.lastName && user.lastName,

            gender: null,

            genderIsFemale: !!user.genderIsFemale,

            age: user.age && user.age,

            phoneNumber: user.phoneNumber && user.phoneNumber,

            notes: user.notes && user.notes,
        };
    };

    UserController.prototype._createAgeRange = function(){

        var ageRange = [];

        for( var i = 1, max = 120; i < max; ageRange.push( i++ ) ){};

        return ageRange;
    }

    UserController.$inject = [ '$scope', '$filter', 'UserService', 'ApiService' ];

    userController.controller( 'UserController', UserController );

}( angular ) );