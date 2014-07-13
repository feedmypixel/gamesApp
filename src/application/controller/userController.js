'use strict';

var NOT_ACCEPTABLE = '406';
var mongoose = require( 'mongoose' );
var game = require( '../model/game' ).model;
var ObjectId = mongoose.Types.ObjectId;
var user = require( '../model/user' );

function createUserDetail( user ){

    return {
        age: user.age,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        genderIsFemale: user.genderIsFemale,
        username: user.local.username,
        notes: user.notes
    };
}

module.exports.getProfileDetailAction = function( req, res ){

    var passportUserId = req.session.passport.user;

    user.findOne( { '_id': ObjectId( passportUserId ) } ).exec().then( function( user ){

        if( user ){

            return res.send( {
                user: createUserDetail( user )
            } );

        } else {

            return res.send( {
                message: 'Sorry no user details found!'
            } );

        }

    }, function( err ){

        return res.send( {
            error: err
        } );

    } );
};

module.exports.setProfileDetailAction = function( req, res ){

    var passportUserId = req.session.passport.user;

    user.findOne( { '_id': ObjectId( passportUserId ) } ).exec().then( function( user ){

        if( user ){

            user.firstName = req.body.firstName;

            user.lastName = req.body.lastName;

            user.phoneNumber = req.body.phoneNumber;

            user.genderIsFemale = req.body.genderIsFemale;

            user.age = req.body.age;

            if( req.body.notes ){
                user.notes = req.body.notes;
            }

            // save the user
            user.save( function( err ){

                if( err ){
                    throw err;
                }

                return res.send( {
                    message: 'Your details have been saved!',
                    user: createUserDetail( user )
                } );
            } );

        } else {

            return res.send( {
                message: 'Sorry no user details found!'
            } );

        }

    }, function( err ){

        return res.send( {
            error: err
        } );

    } );
};

module.exports.getUserGameTitles = function( req, res ){

    var passportUserId = req.session.passport.user;

    user.findOne( { '_id': ObjectId( passportUserId ) } ).exec().then( function( user ){

        if( user ){

            return res.send( {
                titles: user.gameTitles
            } );

        } else {

            return res.send( {
                message: 'Sorry no user games found!'
            } );

        }

    }, function( err ){

        return res.send( {
            error: err
        } );

    } );
};

module.exports.addUserGameTitle = function( req, res ){

    var passportUserId = req.session.passport.user;
    var gameTitleId = req.body.id;

    game.findOne( { 'id': gameTitleId } ).exec().then( function( game ){

        if( game ){

            var gameModel = {
                id: game.id,
                description: game.description,
                name: game.name
            };

            user.findByIdAndUpdate( ObjectId( passportUserId ),
                { $push: { 'gameTitles': gameModel } },
                { safe: true, upsert: true },
                function( err, model ){

                    if( err ){

                        return res.send( NOT_ACCEPTABLE, {

                            message: err
                        } );
                    }

                    return res.send( {

                        message: 'Game added to your list!'
                    } );
                }
            );
        }
    } );
};

module.exports.deleteUserGameTitle = function( req, res ){

    var passportUserId = req.session.passport.user;
    var gameTitleId = req.query.id;

    user.findByIdAndUpdate( ObjectId( passportUserId ),
        { $pull: { 'gameTitles': { id: gameTitleId } } },
        { safe: false, upsert: true },
        function( err, model ){

            if( err ){

                return res.send( NOT_ACCEPTABLE, {

                    message: err
                } );
            }

            return res.send( {

                message: 'Game removed from your list!'
            } );
        }
    );
};