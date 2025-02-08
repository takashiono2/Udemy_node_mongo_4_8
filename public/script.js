const tasksDOM = document.querySelector('.tasks');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');

const showTasks = async () => {
  try {
    const { data: tasks } = await axios.get('/api/v1/tasks');

    if (tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
      return;
    }
    const allTasks = tasks.map((task) => {
      const { completed, _id, name } = task;
      return `
            <div class="single-task">
        <h5>
          <span>
            <i class="far fa-check-circle"></i>
          </span>
          ${name}
        </h5>
        <div class="task-links">
          <a href="#" class="edit-link">
            <i class="fa fa-edit"></i>
          </a>
          <button type="button" class="delete-btn" data-id="${_id}">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
      `
    }).join('');
    tasksDOM.innerHTML = allTasks;
  } catch (err) {
    console.log(err)
  }
};

showTasks();

//タスクを追加する
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;
  try {
    await axios.post('/api/v1/tasks', { name: name });
    showTasks();
    taskInputDOM.value = '';
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "タスクを追加しました";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = '無効です。もう一度お試しください';
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
//タスクを削除する
tasksDOM.addEventListener('click', async (e) => {
  const element = e.target;
  if (element.parentElement.classList.contains('delete-btn')) {
    try {
      const id = element.parentElement.dataset.id;
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (err) {
      console.log(err)
    }
  }
});