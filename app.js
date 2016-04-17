//Setting up the dependencies for the app.js file
var express = require("express"),
	path = require("path"),
	bodyParser = require("body-parser"),
	exphbs = require("express-handlebars"),
	expressValidator = require("express-validator"),
	session = require("express-session"),
	flash = require("connect-flash"),
	multer = require("multer"),
	upload = require({dest: './public/images/portfolio'});

//Route files
var routes = require("./routes/index"),
	admin = require("./routes/admin");

//Init the app variable
var app = express();

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle Sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));

// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Connect Flash
app.use(flash());

app.use('/', routes);
app.use('/admin', admin);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port: '+app.get('port'));
});



