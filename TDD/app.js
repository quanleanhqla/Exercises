let express = require('express')
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let todo = require('./todo.controller');
let app = express()


app.use(morgan('dev'));
app.use(methodOverride());
app.use(express.static('static'))

mongoose.connect('mongodb://127.0.0.1:27017/todo');
mongoose.connection.on('connected', function () {
console.log('Connected to database');
}); 


app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname});
});

app.route('/todo').get(todo.getTodos).post(todo.postTodo);
app.route('/todo/:id').get(todo.getTodo).delete(todo.deleteTodo).put(todo.updateTodo);

app.listen(3000, function (err) {
  if (err) throw err;
  console.log('Listening on port 3000.')
});

module.exports = app;
