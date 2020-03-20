const toggleEdit = (taskId) => {
  /*
  Grab task wrapper
  Add forms
  When form submits, call editTask
  */
};

const editTask = () => {};

const toggleComplete = (taskId) => {
  const toggleCompleteInit = {
    method: 'POST',
  };
  fetch(`/toggle-task-complete-${taskId}`, toggleCompleteInit)
    .then(window.location.reload())
    .catch((err) => console.error('Error toggling task status', err));
};

const deleteTask = (taskId) => {
  const deleteTaskInit = {
    method: 'POST',
  };
  fetch(`/delete-task-${taskId}`, deleteTaskInit)
    .then(window.location.reload())
    .catch((err) => console.error('Error deleting task', err));
};
