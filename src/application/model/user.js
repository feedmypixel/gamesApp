var mongoose = require( 'mongoose' );
var bcrypt = require( 'bcrypt-nodejs' );
var gameSchema = require( '../model/game' ).schema;

var userSchema = mongoose.Schema( {

    firstName: String,

    lastName: String,

    phoneNumber: String,

    genderIsFemale: Boolean,

    age: Number,

    notes: String,

    gameTitles: [ gameSchema ],

    local: {

        username: String,

        password: String
    }

}, { collection: 'users' } );

userSchema.methods.generateHash = function( password ){

    return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null );
};

userSchema.methods.validPassword = function( password ){

    return bcrypt.compareSync( password, this.local.password );
};

module.exports = mongoose.model( 'user', userSchema );