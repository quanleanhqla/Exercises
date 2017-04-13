let mongoose = require('mongoose');
let Todo = require('./todo.model');

function getTodos (req, res) {
  let query = Todo.find({});
  query.exec(function(error, todos) {
    if (error) res.status(404).send(error);
    else res.json(todos);
  });
}

function postTodo (req, res) {
  var newTodo = new Todo(req.body);
  newTodo.save(function (error, todo) {
    if (error) res.status(400).send(error);
    else res.json({message: "Todo added.", todo});
  });
}

function getTodo(req, res) {
  Todo.findById(req.params.id, function(error, todo) {
    if (error) res.status(404).send(error);
    else res.json(todo);
  });
}

function deleteTodo(req, res) {
  Todo.remove({_id: req.params.id}, function(error, result) {
    if (error) res.status(400).send(error);
    else res.json({message: "Todo deleted.", result});
  });
}

function updateTodo(req, res) {
  Todo.findById({_id: req.params.id}, function(error, todo) {
    if (error) res.status(404).send(error);
    Object.assign(todo, req.body).save(function(error, todo) {
      if (error) res.status(400).send(error);
      else res.json({message: "Todo updated.", todo});
    });
  });
}

module.exports = {getTodos, getTodo, postTodo, deleteTodo, updateTodo};