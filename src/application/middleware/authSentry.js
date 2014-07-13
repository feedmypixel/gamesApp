'use strict';

module.exports = function( req, res, next ){

    if( !req.isAuthenticated() ){

        return res.send( 401, {
            message: 'You need to be logged in to view that page!',
            redirectTo: '/'
        } );
    }

    next();
};