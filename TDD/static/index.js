let baseUrl = "http://localhost:3000/todo/";

$(function() {
  $.getJSON(baseUrl, function(response) {
    response.sort(function(a, b){
        if(a['time_created'] > b['time_created']){
            return -1;
        }else if(a['time_created'] < b['time_created']){
            return 1;
        }
        return 0;
    });
    var content = '';
    $.each(response, function(index, value) {
      let checked = '';
      if (value.completed)
        checked = 'checked';
      content += `<li class="list-group-item" id="item-${value._id}">
          <div class="container">
            <div class="row justify-content-md-center">
              <input id="check-${value._id}" type="checkbox" class="col col-auto" onchange="toggleStatus('${value._id}')" ${checked}>
              <div id="todo-${value._id}" class="col">${value.todo}</div>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary btn-sm col col-auto" onclick="editTodo('${value._id}')">Edit</button>
                <button type="button" class="btn btn-danger btn-sm col col-auto" onclick="deleteTodo('${value._id}')">Delete</button>
              </div>
            </div>
          </div>
        </li>`
    });

    $('#todo-list').html(content);
  });

  $('#new-todo-dialog').on('show.bs.modal', function(event){
    $('#new-todo').val('');
  });
});

function newTodo() {
  var content = $('#new-todo').val();
  $.ajax({
    url: baseUrl,
    type: 'POST',
    data: {todo: content, completed: false},
    success: function(response) {
      let value = response.todo;
      let todos = $('#todo-list').html();
      todos = `<li class="list-group-item" id="item-${value._id}">
          <div class="container">
            <div class="row justify-content-md-center">
              <input id="check-${value._id}" type="checkbox" class="col col-auto" onchange="toggleStatus('${value._id}')">
              <div id="todo-${value._id}" class="col">${value.todo}</div>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-primary btn-sm col col-auto" onclick="editTodo('${value._id}')">Edit</button>
                <button type="button" class="btn btn-danger btn-sm col col-auto" onclick="deleteTodo('${value._id}')">Delete</button>
              </div>
            </div>
          </div>
        </li>` + todos;
      $('#new-todo-dialog').modal('hide');
      $('#todo-list').html(todos);
    },
    error: function(response) {
      $('#new-todo-dialog').modal('hide');      
    }
  });
};

function toggleStatus(id) {
  var status = $('#check-' + id).is(":checked");
  var content = $('#todo-' + id).text();
  $.ajax({
    url: baseUrl + id,
    type: 'PUT',
    data: {'todo': content, 'completed': status},
    error: function() {
      $('#check-' + id).val(!status);
    }
  });
};

function deleteTodo(id){
  $.ajax({
    url: baseUrl + id,
    type: 'DELETE',
    success: function() {
      $('#item-' + id).remove();
    }
  });
}

function editTodo(id) {
  $('#edit-todo-dialog').modal('show');
  $('#edit-todo').val($('#todo-' + id).text());
  $('#save-todo').on('click', function(e) {
    $.ajax({
      url: baseUrl + id,
      type: 'PUT',
      data: {'todo': $('#edit-todo').val(), 'completed': $('#check-' + id).checked},
      error: function() {
        $('#edit-todo-dialog').modal('hide');
      },
      success: function(response) {
        $('#todo-' + id).text(response.todo.todo);
        $('#edit-todo-dialog').modal('hide');        
      }
    });
  })
}
