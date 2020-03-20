class Task {
  constructor(task, description, dueDate) {
    this.task = task;
    this.description = description;
    this.dueDate = dueDate;
    this.isComplete = false;
    this.taskId = Task.count;
    Task.count += 1;
  }
}

Task.count = 0;

module.exports = Task;
