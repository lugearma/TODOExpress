var express =  require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var routes = require('./routes');
var tasks = require('./routes/tasks');
var index = require('./routes/index');
var morgan = require('morgan');
var consolidate = require('consolidate');
var session = require('express-session');
var lessMiddleware = require('less-middleware');
var errorhandler = require('errorhandler');
var http = require('http');
var path = require('path');
var jade = require('jade');

var mongoskin = require('mongoskin');

//Creamos la instancia de express
var app = express();

var db = mongoskin.db('mongodb://localhost:27017/todo?auto_reconnect', {
	safe : true
});

//Pasamos con este middleware la db a todo los modulos con el req
app.use(function (req, res, next){
	req.db = {};
	req.db.task = db.collection('task');
	next();
});

//Pasamo esta variable para que todos los templates la puedan untilizar(es como decir que es global)
app.locals.appname = 'Express.js Todo App'

app.set('port', process.env.PORT || 3000);

//Configuramos el sistema de templates(jade)
app.engine('jade', jade.renderFile);
app.set('views engine', 'jade');
app.set('views', __dirname + '/views');

//Conofiguramos el server
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret : 'Botas y Guffis',
	resave : false,
	saveUninitialized : true
}));

// app.use(express.csrf());

app.use(lessMiddleware(__dirname + 'public'));

//Cargamos los archivos estaticos
app.use(express.static(path.join(__dirname + 'public')));

// app.use(function (req, res, next){
// 	res.locals._csrf = req.session._csrf;
// 	return next();
// });

// app.use(app.router);

//Solo para desarrollo
if('development' == app.get('env')){
	app.use(errorhandler());
}

app.param('task_id', function (req, res, nex, taskId){
	req.db.tasks.findById(taskId, function (err, task){
		if(err) return next(err);
		if (!task) return next(new Error('La tarea no existe'));

		req.task = task;
		return next();
	});
});

//Rutas de otros archivos


app.all('*', function (req, res){
	res.sendStatus(404);
});


http.createServer(app).listen(app.get('port'), function (){
	console.log('Express server run in ' + app.get('port'));
});