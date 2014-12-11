exports.list = function (req, res, next){

	req.db.tasks.find({
		completed : false
	}).toArray(function (err, task){
		if(err) return next(err);
		if(!task) return next(new Error('La tarea no existe'));

		res.render('tasks', {
			title : 'Todo list',
			tasks : task || []
		});
	});
};