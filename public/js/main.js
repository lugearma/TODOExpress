$(document).ready(function (){
	window.io = io.connect();

	$('.task-delete').click(function (event){
		var target = $(event.target);
		console.log(target);
	});
});