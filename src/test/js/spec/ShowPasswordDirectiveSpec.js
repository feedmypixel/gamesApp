'use strict';

describe( 'Show Password Directive Tests', function(){

    var scope;
    var showPasswordElement;
    var showPasswordElementScope;

    beforeEach( function(){

        module( 'gamesApp.directive' );
        module( '/views/templates/ShowPasswordTemplate.html' );

    } );

    beforeEach( inject( function( $rootScope, $compile ){

        scope = $rootScope;

        showPasswordElement = angular.element( '<show-password password-input-type="passwordInputType"></show-password>' );

        $compile( showPasswordElement )( scope );

        scope.$digest();

        showPasswordElementScope = showPasswordElement.children().scope();

    } ) );


    it( 'Default value of passwordInputType is "password"', function(){

        expect( showPasswordElementScope.passwordInputType ).toEqual( 'password' );
    } );

    it( 'Value of passwordInputType is "text" after checkbox input has been clicked', function(){

        expect( showPasswordElementScope.passwordInputType ).toEqual( 'password' );

        showPasswordElement.find( 'input' )[ 0 ].click();

        expect( showPasswordElementScope.passwordInputType ).toEqual( 'text' );
    } );

} );