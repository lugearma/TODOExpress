exports.index = function (req, res){
	res.render('index.jade', { title : 'Express.js todo App' });
};