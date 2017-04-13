process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Todo = require('./todo.model');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let app = require('./app');

chai.use(chaiHttp);

describe('Todos', function() {
  beforeEach(function (done) {
    Todo.remove({}, function(error) {
      console.log(error);
      done();
    });
  });
});

describe('Get todos', function() {
  it('should get all todos', function(done) {
    chai.request(app).get('/todo')
    .end(function(err, res) {
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });
});

describe('Post todo', function() {
  it('should not post a todo with missing completion status', function(done) {
    let todo = {
      todo: 'Talk to Lê about the trip'
    }
    chai.request(app).post('/todo').send(todo)
    .end(function(err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.errors.should.have.property('completed');
      res.body.errors.completed.should.have.property('kind').eql('required');
      done();
    });    
  });

  it('should not post a todo with missing content', function(done) {
    let todo = {
      completed: true
    }
    chai.request(app).post('/todo').send(todo)
    .end(function(err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.errors.should.have.property('todo');
      res.body.errors.todo.should.have.property('kind').eql('required');
      done();
    });
  });

  it('should post a todo', function(done) {
    let todo = {
      todo: 'Hop on the Latouche-Tréville',
      completed: true
    }
    chai.request(app).post('/todo').send(todo)
    .end(function(err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('todo');
      res.body.todo.should.have.property('todo');      
      res.body.todo.should.have.property('completed');
      done();
    });
  });
});

describe('get todo by id', function() {
  let todo = new Todo({
    todo: 'Attend conference in Tours',
    completed: false
  });
  todo.save(function (error, todo) {
    chai.request(app).get('/todo/' + todo.id).send(todo).end(function(err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('todo');
      res.body.should.have.property('completed');
      res.body.should.have.property('_id').eql(todo.id);
    });
  });
});

describe('update todo', function() {
  it('should update a todo given its id', function() {
    let todo = new Todo({
      todo: 'Attend conference in Tours',
      completed: false
    });
    todo.save(function(error, todo) {
      chai.request(server).put('/todo/' + todo.id)
      .send({
        todo: 'Read the Communist Manifesto',
        completed: true
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Todo updated.");
        res.body.todo.should.have.property('todo').eql('Read the Communist Manifesto');
        res.body.todo.should.have.property('completed').eql(true);
        done();
      })
    })
  });
})

describe('delete todo', function() {
  it('should delete a todo given its id', function() {
    let todo = new Todo({
      todo: 'Attend conference in Tours',
      completed: false
    });
    todo.save(function(error, todo) {
      chai.request(server).delete('/todo/' + todo.id)
      .send({
        todo: 'Read the Communist Manifesto',
        completed: true
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Todo deleted.");
        res.body.result.should.have.property('ok').eql(1);
        res.body.result.should.have.property('n').eql(1);
        done();
      })
    })
  });
})
