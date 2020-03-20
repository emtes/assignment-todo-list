const newInput = (label, name, inputType, currentData) => `
  <form class="task-update-input">
    <label for="newTask">${label}</label>
    <input type="${inputType}" name="${name}"
    id="newTask" value="${currentData[0] ? currentData[0] : ''}" required>
  </form>
  `;

const newTextArea = (label, name, currentData) => `
  <form class="task-update-input">
    <label for="newTask">${label}</label>
    <textarea name="${name}" id="description"
    rows="8" cols="32">${currentData[0]}</textarea>
  </form>
  `;

const disableForms = (querySelector) => {
  const forms = document.querySelectorAll(querySelector);
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  });
};

const createElement = (tag, attributes, innerText) => {
  const el = document.createElement(tag);
  Object.keys(attributes).forEach((att) => {
    el.setAttribute(att, attributes[att]);
  });
  el.innerText = innerText;
  return el;
};

const editButtonToSubmit = (taskWrapper, taskId) => {
  const taskActionsWrapper = taskWrapper.querySelector('.taskActions');
  const editButton = taskActionsWrapper.querySelector('.edit');
  taskActionsWrapper.removeChild(editButton);
  const submitButtonAttributes = {
    onclick: `editTask(${taskId})`,
  };
  const submitButton = createElement('button', submitButtonAttributes, 'Save');
  taskActionsWrapper.appendChild(submitButton);
};

const toggleEdit = (taskId) => {
  const taskWrapper = document.getElementById(taskId);
  const task = taskWrapper.querySelector('.task');
  const description = taskWrapper.querySelector('.description');
  const date = taskWrapper.querySelector('.dueDate');

  task.innerHTML = newInput('Task', 'task', 'text', [task.innerText]);
  description.innerHTML = newTextArea('Description', 'description', [
    description.innerText,
  ]);
  date.innerHTML = newInput('Due Date', 'dueDate', 'date', []);
  disableForms('task-update-input');
  editButtonToSubmit(taskWrapper, taskId);
};

const getEditFormData = (taskId) => {
  const taskWrapper = document.getElementById(taskId);
  const forms = taskWrapper.querySelectorAll('.task-update-input');
  const inputs = {};
  forms.forEach((form) => {
    inputs[form[0].name] = form[0].value;
  });
  return inputs;
};

const editTask = (taskId) => {
  let { task, description, dueDate } = getEditFormData(taskId);
  task = cleanTextInput(task);
  description = cleanTextInput(description);
  const editTaskInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newTask: task,
      newDescription: description,
      newDueDate: dueDate,
    }),
  };
  fetch(`/editTask-${taskId}`, editTaskInit)
    .then(window.location.reload())
    .catch((err) => { console.error('Error updating task', err); });
};

const cleanTextInput = (string) => {
  let cleaned = string.trim();
  cleaned = cleaned[0].toUpperCase() + cleaned.substr(1);
  return cleaned;
};

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
