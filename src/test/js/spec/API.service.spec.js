'use strict';

var mockGetTitlesObject = {

    titles: [
        {
            "id": 6,
            "name": "Murdered: Soul Suspect (PS3)",
            "description": "Most people think that death is the end, but for Ronan O’Connor, a Salem police detective with a chequered past, it is just the beginning."
        },
        {
            "id": 7,
            "name": "Portal 2 - Essentials (PS3)",
            "description": "Portal 2 draws from the award-winning formula of innovative gameplay, story, and music that earned the original Portal over 70 industry accolades and created a cult following."
        },
        {
            "id": 8,
            "name": "The Wolf Among Us: Episode 5 -- Cry Wolf Review (PC)",
            "description": "The Wolf Among Us takes place prior to the comics and lets players take on the role of Bigby Wolf (The Big Bad Wolf), who has been exiled to New York City. The game follows Wolf as he tries to keep fairy tale characters including Mr. Toad and the Three Little Pigs undetected in our world."
        },
    ]
}


describe( 'API Service Tests', function(){

    var HOST = 'http://localhost:8090';
    var API_VERSION = '/v1';
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

        $httpBackend.when( 'GET', HOST + API_VERSION + GAMES_TITLES_URL ).respond( mockGetTitlesObject );

    } ) );

    afterEach( function(){

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();

    } );

    it( 'correct response is given for "GET" on url: "' + GAMES_TITLES_URL +'"', function(){

        var allGameTitlesPromise;

        $httpBackend.expectGET( HOST + API_VERSION + GAMES_TITLES_URL );

        allGameTitlesPromise = apiService.getAllGameTitles().$promise;

        $httpBackend.flush();

        allGameTitlesPromise.then( function( response ){

            var titles = response.titles;

            expect( titles ).toBeDefined();
            expect( titles ).toEqualData( mockGetTitlesObject.titles );
            expect( titles.length ).toEqual( 3 );

        } );

    } );

} );