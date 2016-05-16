var express     = require('express'),
    routes      = require('./backapp/routes/routes.js'),
    mongoose    = require('mongoose');
    bodyParser  = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
mongoose.connect('mongodb://yo2:qweasd456@ds011261.mlab.com:11261/fcc_api');

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/node_modules', express.static(process.cwd() + '/node_modules'));
//app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Listening in port : '+port+'...');
});
