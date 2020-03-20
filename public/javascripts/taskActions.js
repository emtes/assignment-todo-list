const toggleEdit = (taskId) => {
  /*
  Grab task wrapper
  Add forms
  When form submits, call editTask
  */
};

const editTask = () => {};

const toggleComplete = (taskId) => {
  toggleCompleteInit = {
    method: 'POST',
  };
  fetch(`/toggle-task-complete-${taskId}`, toggleCompleteInit)
    .then(window.location.reload())
    .catch((err) => console.error('Error toggling task status', err));
};
