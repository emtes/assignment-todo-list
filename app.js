const express = require('express');
const bodyParser = require('body-parser');
const Task = require('./models/Task');
const TodoList = require('./models/TodoList');

const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const todoList = new TodoList();

app.get('/', (req, res) => {
  const tasks = todoList.tasks ? todoList.tasks : null;
  res.render('index', { taskCount: todoList.taskCount, tasks });
});

app.post('/addtask', (req, res) => {
  const userInput = req.body;
  const { task, description, dueDate } = userInput;
  const newTask = new Task(task, description, dueDate);
  todoList.addTask(newTask);
  res.redirect('/');
});

app.post('/toggle-task-complete-:id', (req, res) => {
  const taskId = req.params.id;
  todoList.toggleTaskComplete(taskId);
});

app.listen(port, () => {
  console.log(`Application listening on port ${port}...`);
});
