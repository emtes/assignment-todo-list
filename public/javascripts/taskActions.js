const toggleEdit = (taskId) => {
  const taskWrapper = document.getElementById(taskId);
  const task = taskWrapper.querySelector('.task');
  const description = taskWrapper.querySelector('.description');
  const date = taskWrapper.querySelector('.dueDate');

  task.innerHTML = newInput('Task', 'task', 'text', [task.innerText]);
  description.innerHTML = newTextArea('Description', 'description', [description.innerText]);
  date.innerHTML = newInput('Due Date', 'dueDate', 'date', []);
  disableForms('task-update-input');

  const submitButtonAttributes = {
    onclick: `editTask(
      ${taskId},
      ${task.value},
      ${description.value},
      ${date.value}
    )`,
  };
  const submitButton = createElement('button', submitButtonAttributes);
  taskWrapper.appendChild(submitButton);
};

const editTask = (taskId, task, description, date) => {
  console.log(`Ready to edit task ${taskId}, with:`, task, description, date);
};

function createElement(tag, attributes) {
  const el = document.createElement(tag);
  for (const att in attributes) {
    el.setAttribute(att, attributes[att]);
  }
  return el;
}

function newInput(label, name, inputType, currentData) {
  return `
  <form class="task-update-input">
    <label for="newTask">${label}</label>
    <input type="${inputType}" name="${name}"
    id="newTask" value="${currentData[0] ? currentData[0] : ''}" required>
  </form>
  `;
}

function newTextArea(label, name, currentData) {
  return `
  <form class="task-update-input">
    <label for="newTask">${label}</label>
    <textarea name="${name}" id="description"
    rows="8" cols="32">${currentData[0]}</textarea>
  </form>
  `;
}

function disableForms(querySelector) {
  const forms = document.querySelectorAll(querySelector);
  for (const form of forms) {
    form.addEventListener('submit', (e) => { e.preventDefault(); });
  }
}

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
