import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";


const todoForm = document.querySelector("#add-todo-form");
const formValidator = new FormValidator(validationConfig, todoForm);
formValidator.enableValidation();

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const handleFormSubmit = (evt, formData) => {
  const newTodo = {
    ...formData,
    id: crypto.randomUUID(),
    date: formData.date ? new Date(formData.date).toISOString() : '',
    completed: false
  };
  renderTodo(newTodo);
  todoCounter.updateTotal(true);
  popupWithForm.close();
  formValidator.resetValidation();
  };

const popupWithForm = new PopupWithForm(
  '#add-todo-popup', 
  handleFormSubmit,
  formValidator
);
popupWithForm.setEventListeners();

const handleTodoDelete = (wasCompleted) => {
  todoCounter.updateTotal(false);
  if (wasCompleted) {
    todoCounter.updateCompleted(false);
  }
};

const handleTodoComplete = (isCompleted) => {
  todoCounter.updateCompleted(isCompleted);
};

const generateTodo = (data) => {
  const todo = new Todo(
    data, 
    "#todo-template",
    handleTodoDelete,
    handleTodoComplete
  );
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list"
});
section.renderItems();

const todoCounter = new TodoCounter(initialTodos, '.counter__text');

document.querySelector(".button_action_add").addEventListener("click", () => {
  popupWithForm.open();
});
