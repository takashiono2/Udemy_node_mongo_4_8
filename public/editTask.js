const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const editFormDOM = document.querySelector('.single-task-form');
const formAlertDOM = document.querySelector('.form-alert');
const taskCompletedDOM = document.querySelector('.task-edit-completed');

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id, completed, name } = task;
    taskIDDOM.textContent = _id;
    taskNameDOM.value = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
}

showTask();

editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const taskName = taskNameDOM.value;
  let taskCompleted = taskCompletedDOM.checked;
  formAlertDOM.style.display = 'block';
  formAlertDOM.textContent = '編集に成功しました';
  formAlertDOM.classList.add("text-success");
  try {
    await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });
  } catch (err) {
    console.log(err);
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});