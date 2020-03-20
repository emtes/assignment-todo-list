class TodoList {
  constructor() {
    this.tasks = {};
    this.taskCount = 0;
  }

  addTask(task) {
    this.tasks[task.taskId] = task;
    this.taskCount += 1;
    return this.taskCount;
  }

  deleteTask(taskId) {
    const deletedTask = this.tasks[taskId];
    delete this.tasks[taskId];
    return deletedTask;
  }

  updateTask(taskId, newTask) {
    const oldTask = this.tasks.taskId;
    this.tasks.taskId = newTask;
    return oldTask;
  }

  toggleTaskComplete(taskId) {
    this.tasks[taskId].isComplete = !this.tasks[taskId].isComplete;
    return this.tasks[taskId].isComplete;
  }
}

module.exports = TodoList;
