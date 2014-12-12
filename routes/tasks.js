exports.list = function (req, res, next){
	
	req.db.task.find({
		completed : false
	}).toArray(function (err, task){
		if(err) return next(err);
		if(!task) return next(new Error('La tarea no existe'));

		//So todo sale bien las pintamos
		debugger;
		res.render('tasks.jade', {
			title : 'Todo list',
			tasks : task || []
		});
	});
};

exports.add = function (req, res, next){
	//Si no se introdujo nada
	if(!req.body || !req.body.name)
		return next(new Error('No hay datos'));

	//Guardamos la tarea pero pueden surgir problemas
	req.db.task.save({
		name : req.body.name,
		completed : false
	}, function (err, task) {
		if(err) return next(err);
		if(!task) return next(new Error('Fallo al guardar'));

		//Si todo salio bien
		console.info('Se agrego %s con el ID: %s', task.name, task._id);
		res.redirect('/task');
	});
};

exports.markAllCompleted = function (req, res, next){
	if(!req.body.all_done || req.body.all_done !== 'true')
		return next();
	req.db.task.update({
		completed : false
	}, {$set : {
		completed : true
	}}, { multi : true }, function (err, count){
		if(err) return next(err);
		console.info('La tarea %s se marco como completada', count);
		res.redirect('/task');
	});
};

exports.completed = function (req, res, next){
	req.db.task.find({
		completed : true
	}).toArray(function (err, tasks){
		res.render('task_completed', {
			title : 'Completado',
			tasks : tasks || []
		});
	});
};

exports.markCompleted = function (req, res, next){
	if(!req.body.completed)
		return next(new Error('Falta parametro'));
	req.db.tasks.updateById(req.body._id, {
		$set : {completed : req.body.completed === 'true'}
	}, function (err, count) {
		if(err) return next(err);
		if(count !== 1)
			return next(new Error('Acabo algo mal :('));
		console.info('Marco la tarea %s con id: %s como completada', 
			req.task.name,
			req.task._id);
		res.redirect('/task');
	});
};


exports.del = function (req, res, next){
	req.db.task.removeById(req.task._id, function (err, count){
		if(err) return next(err);
		if(count !== 1) return next(new Error('Acabo algo mas :('));
		console.info('Borraste la tarea %s con el id: %s',
			req.task.name,
			req.task._id);
		res.send(200);
	});
};




