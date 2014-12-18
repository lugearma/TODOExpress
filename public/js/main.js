$(document).ready(function() {
  $('.task-delete').click(function(event) {
    $target = $(event.target)
    $.ajax({
      type: 'DELETE',
      url: '/task/' + $target.attr('data-task-id'),
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
});