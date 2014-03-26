'use strict';

var mockGetTitlesObject = {

    titles: [
        {
            id: "29a24da6-b560-4698-9238-ab2016f1bff3",
            description: "a description d",
            name: "Sly Cooper: Thieves in Time (PS3)"
        },
        {
            id: "3adbee89-33e9-4bdb-b7da-3f87e398f5e2",
            description: "a description I",
            name: "Eyepet & Friends"
        }
    ]
}


describe( 'API Service Tests', function(){

    var HOST = 'http://217.18.25.29:10070';
    var GAMES_TITLES_URL = '/gametitles/list';
    var $httpBackend;
    var scope;
    var apiService;

    beforeEach( function(){

        this.addMatchers( {

            toEqualData: function( expected ){

                return angular.equals( this.actual, expected );
            }

        } );

        module( 'gamesApp' );

    } );

    beforeEach( inject( function( $rootScope, $injector ){

        scope = $rootScope;

        apiService = $injector.get( 'ApiService' );

        $httpBackend = $injector.get( '$httpBackend' );

        $httpBackend.when( 'GET', HOST + GAMES_TITLES_URL ).respond( mockGetTitlesObject );

    } ) );

    afterEach( function(){

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();

    } );

    it( 'correct response is given for "GET" on url: "' + HOST + GAMES_TITLES_URL +'"', function(){

        var allGameTitlesPromise;

        $httpBackend.expectGET( HOST + GAMES_TITLES_URL );

        allGameTitlesPromise = apiService.getAllGameTitles().$promise;

        $httpBackend.flush();

        allGameTitlesPromise.then( function( response ){

            var titles = response.titles;

            expect( titles ).toBeDefined();
            expect( titles ).toEqualData( mockGetTitlesObject.titles );
            expect( titles.length ).toEqual( 2 );

        } );

    } );

} );