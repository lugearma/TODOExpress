exports.list = function (req, res, next){

	req.db.tasks.find({
		completed : false
	}).toArray(function (err, task){
		if(err) return next(err);
		if(!task) return next(new Error('La tarea no existe'));

		//So todo sale bien las pintamos
		res.render('tasks', {
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
	req.db.tasks.save({
		name : req.body.name,
		completed : false
	}, function (err, task) {
		if(err) return next(err);
		if(!task) return next(new Error('Fallo al guardar'));

		//Si todo salio bien
		console.info('Se agrego %s con el ID: %s', task.name, task._id);
		res.redirect('/tasks');
	});
};