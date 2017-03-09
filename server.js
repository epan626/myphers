var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    bcrypt   = require('bcrypt'),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express(),
    fs       = require('fs')
    multer   = require('multer');


app.use( express.static( path.join( root, 'client/static/views' )));
app.use( express.static( path.join( root, 'client/static/views/partials' )));
app.use( express.static( path.join( root, 'client/static/js' )));
app.use( express.static( path.join( root, 'client/static/css' )));
app.use( express.static( path.join( root, 'client/static/media' )));
app.use( express.static( path.join( root, 'client/static/css/fonts' )));
app.use( express.static( path.join( root, 'bower_components' )));
app.use(bp.json());
app.use(multer({dest: '/uploads',
  rename: function(fieldname, filename){
    return filename;
  }
}))

require('./server/config/mongoose.js')

var routes_setter = require('./server/config/routes.js')
routes_setter(app)


app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
