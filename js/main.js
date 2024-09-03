// Находим элементы на странице
const form = document.querySelector('#form')

const taskInput = document.querySelector('#taskInput')
const taskList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks = []
let idCount = 0

const getId = () => {
	return idCount++
}

// functions
const addTask = event => {
	// Отмена отправки формы
	event.preventDefault()

	// Достаем текс из input
	const taskText = taskInput.value

	const newTask = {
		id: getId(),
		text: taskText,
		done: false,
	}

	// Добавим объект к массиву с задачами
	tasks.push(newTask)

	//Формируем css класс
	const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title'

	// Формируем разметку для новой задачи
	const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`

	// Добавить задачу на страницу
	taskList.insertAdjacentHTML('beforeend', taskHTML)

	// Очищаем поле ввода and focus
	taskInput.value = ''
	taskInput.focus()

	if (taskList.children.length > 1) {
		emptyList.classList.add('none')
	}
}

const deleteTask = event => {
	//Проверяем что клик был не по кнопке "удалить"
	if (event.target.dataset.action !== 'delete') return

	//Проверяем что клик был по кнопке "удалить"
	const parentNode = event.target.closest('.list-group-item')

	// Определяем id задачи
	const id = Number(parentNode.id)

	// Находим индекс элемента
	const index = tasks.findIndex(task => task.id === id)

	// Удаляем задачу из массива с задачами
	tasks.splice(index, 1)

	// Удаляем задачу из массива через фильтрацию
  //  tasks = tasks.filter((task) => task.id !== id)

	// Удаляем задачу из разметки
	parentNode.remove()

	//Проверка если ли в списке задач 1-й элемент, скрываем блок
	if (taskList.children.length === 1) {
		emptyList.classList.remove('none')
	}
}

const doneTask = event => {
	//Проверяем что клик был по кнопке "выполнено"
	if (event.target.dataset.action !== 'done') return

	const parentNode = event.target.closest('.list-group-item')
	const taskTitle = parentNode.querySelector('.task-title')

	taskTitle.classList.toggle('task-title--done')
}

// Добавление задачи
form.addEventListener('submit', addTask)

// Удаление задачи
taskList.addEventListener('click', deleteTask)

// Задача выполнена
taskList.addEventListener('click', doneTask)
