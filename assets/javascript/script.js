const todoList = document.querySelector('.todo-list');

const todoListFrom = todoList.querySelector('.todo-list__form');
const todoListFromButton = todoListFrom.querySelector('button');
const todoListFromInput = todoListFrom.querySelector('input');

const todoListTabs = todoList.querySelectorAll('.todo-list__tabs li');
const todoListItems = todoList.querySelector('.todo-list__items');

const todoListSourceData = JSON.parse(localStorage.getItem('todoList'))
  ? JSON.parse(localStorage.getItem('todoList'))
  : [];

let currentList = todoListSourceData;
let currentStatus = '全部';

const renderTodoList = () => {
  let renderList;
  if (currentStatus !== '全部') {
    currentList = todoListSourceData.filter(
      (element) => element.status === currentStatus,
    );
  } else {
    currentList = todoListSourceData;
  }

  renderList = currentList.map(
    (element) =>
      `<li>
				<ol class="todo-list__item-actions">
					<li onClick="editTodo(${element.id},'已刪除')"><span class="material-symbols-outlined"> delete </span></li>
					<li onClick="editTodo(${element.id},'已完成')"><span class="material-symbols-outlined"> check </span></li>
				</ol>
				<h2>${element.title}</h2>
				<span>${element.status}</span>
			</li>`,
  );

  todoListItems.innerHTML = renderList.length
    ? renderList.join('')
    : '<div class="todo-list__not-found">目前沒有內容</div>';
};

const editTodo = (id, status) => {
  todoListSourceData.find((e) => e.id === id).status = status;
  updateLocalStorage();
  renderTodoList();
};

const updateLocalStorage = (newTodo = null) => {
  if (newTodo !== null) {
    currentList.push(newTodo);
  }
  localStorage.setItem('todoList', JSON.stringify(todoListSourceData));
};

todoListTabs.forEach((element) => {
  element.addEventListener('click', function () {
    todoListTabs.forEach((typeItem) => typeItem.classList.remove('active'));
    element.classList.add('active');
    currentStatus = element.innerHTML;
    renderTodoList();
  });
});

todoListFromButton.addEventListener('click', function (event) {
  event.preventDefault();
  const inputValue = todoListFromInput.value;

  if (!inputValue.trim()) {
    todoListFromInput.value = '';
    alert('請輸入空格以外的內容');
    return;
  }

  updateLocalStorage({
    id: new Date().getTime(),
    title: inputValue,
    status: '代辦',
  });
  renderTodoList();

  todoListFromInput.value = '';
});

renderTodoList();
