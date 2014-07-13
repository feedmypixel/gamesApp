'use strict';

var COOKIE_PARSER_SECRET = 'lt534JkaS9(9TmOZSYhK';
var SESSION_SECRET       = 'LHJdF50bgfETryum';
var express              = require( 'express' );
var morgan               = require( 'morgan' );
var app                  = express();
var appConfig            = require( './config/app' );
var cookieParser         = require( 'cookie-parser' );
var session              = require( 'cookie-session' );
var bodyParser           = require( 'body-parser' );
var methodOverride       = require( 'method-override' );

var port                 = process.env.PORT || appConfig.detail.port;
var routes               = require( './routes' );

var mongoose             = require( 'mongoose' );
var passport             = require( 'passport' );
var dbSetup              = require( './setup/db' );
var passportConfig       = appConfig.passport;
var dbConfig             = appConfig.database;
var db                   = mongoose.connection;

mongoose.connect( dbConfig.url );
passportConfig( passport );

db.on('error', console.error.bind( console, 'connection error:' ));
db.once('open', function callback () {

    console.log( 'db - is now open!' );
    dbSetup.start( db );
});

app.use( express.static( __dirname + '/../public' ) );
app.use( morgan( 'dev' ) );
app.use( cookieParser( COOKIE_PARSER_SECRET ) );
app.use( session( { secret: SESSION_SECRET, cookie: { maxAge : 3600000 } } ) );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use( methodOverride() );
app.use( passport.initialize() );
app.use( passport.session() );

routes( express, app );

app.listen( port , function(){

    console.log( 'Server listening on port: ' + port );
} );