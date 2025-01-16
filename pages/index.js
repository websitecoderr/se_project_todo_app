import { v4 as uuidv4 } from 'uuid';
import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const handleFormSubmit = (formData) => {
  const newTodo = generateTodo({
    ...formData,
    id: uuidv4(),
    date: new Date(formData.date).toISOString(),
  });
  section.addItem(newTodo);
  todoCounter.updateTotal(true);
};

const popupWithForm = new PopupWithForm('#add-todo-popup', handleFormSubmit);
popupWithForm.setEventListeners();

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list"
});
section.renderItems();

const todoCounter = new TodoCounter(initialTodos, '.counter__text');

document.querySelector(".button_action_add").addEventListener("click", () => {
  popupWithForm.open();
});

const addTodoFormValidator = new FormValidator(validationConfig, popupWithForm._form);
addTodoFormValidator.enableValidation();
