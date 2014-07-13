var mongoose = require( 'mongoose' );
var gameSchema = mongoose.Schema( {

    id: { type: Number, index: true },

    description: String,

    name: String

}, { collection: 'gameTitles' } );

module.exports = {

    schema: gameSchema,

    model: mongoose.model( 'game', gameSchema )
};