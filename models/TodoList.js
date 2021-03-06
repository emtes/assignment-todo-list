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
    this.taskCount -= 1;
    return deletedTask;
  }

  updateTask(taskId, newTask) {
    this.tasks[taskId] = newTask;
    return this.taskCount;
  }

  toggleTaskComplete(taskId) {
    this.tasks[taskId].isComplete = !this.tasks[taskId].isComplete;
    return this.tasks[taskId].isComplete;
  }
}

module.exports = TodoList;
