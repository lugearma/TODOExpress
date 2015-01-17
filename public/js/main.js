$(document).ready(function() {
  $('.task-delete').click(function(event) {
    $target = $(event.target)
    $.ajax({
      type: 'DELETE',
      url: '/task/' + $target.attr('data-task-id-delete'),
      data: {
        _csrf: $target.attr('data-csrf')
      },
      success: function(response) {
        $target.parent().parent().remove();
        console.log("Se borro");      
      },
      error: function(error) {
        console.log("ocurrio un error");
      }
    });
  });

  $('.task-complete').click(function(event) {
    $target = $(event.target);
    $.ajax({
      type: 'POST',
      url: '/task/' + $target.attr('data-task-id-done'),
      data: {
        _csrf: $target.attr('data-csrf')
      },
      success: function(response) {
        $target.parent().parent().remove();
        console.log("Se realizo la tarea");      
      },
      error: function(error) {
        console.log("Ocurrio un error");
      }
    });
  });
});