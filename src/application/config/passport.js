var LocalStrategy = require( 'passport-local' ).Strategy;
var userModel = require( '../model/user' );

module.exports = function( passport ){

    passport.serializeUser( function( user, callback ){

        callback( null, user.id );
    } );

    passport.deserializeUser( function( id, callback ){

        userModel.findById( id, function( err, user ){

            callback( err, user );
        } );
    } );

    passport.use( 'local-signup', new LocalStrategy( {

        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true

    }, function( req, username, password, callback ){

        process.nextTick( function(){

            userModel.findOne( { 'local.username': username } ).exec().then( function( user ){

                // check to see if there is already a user with that email
                if( user ){

                    return callback( null, false, 'User <strong>' + username + '</strong> already exists!' );

                } else {

                    // if there is no user with that email create the user
                    var newUser = new userModel();

                    // set the user's local credentials
                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash( password );
                    // populate user detail
                    newUser.phoneNumber = req.body.phoneNumber;
                    newUser.firstName = req.body.firstName;
                    newUser.lastName = req.body.lastName;

                    console.log( newUser );

                    // save the user
                    newUser.save( function( err ){

                        if( err ){
                            throw err;
                        }

                        return callback( null, newUser, 'Congratulations your are now registered!' );
                    } );
                }

            }, function( err ){

                return callback( err );
            } );
        } );
    } ) );

    passport.use( 'local-login', new LocalStrategy( {

        usernameField: 'username',
        passwordField: 'password'

    }, function( username, password, callback ){

        userModel.findOne( { 'local.username': username } ).exec().then( function( user ){

            if( !user ){

                return callback( null, false, 'Sorry that user is not with us!');
            }

            if( !user.validPassword( password ) ){
                return callback( null, false, 'Sorry your passwords wrong!' );
            }

            return callback( null, user, 'Congratulations your are now signed in!' );

        }, function( err ){
            return callback( err );
        });

    } ) );
};
