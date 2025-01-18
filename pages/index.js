import { v4 as uuidv4 } from './node_modules/uuid';
import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// Function to handle form submission
const handleFormSubmit = (formData) => {
  const newTodo = generateTodo({
    ...formData,
    id: uuidv4(),
    date: new Date(formData.date).toISOString(),
  });
  section.addItem(newTodo);
  todoCounter.updateTotal(true);
};

// Initialize PopupWithForm
const popupWithForm = new PopupWithForm('#add-todo-popup', handleFormSubmit);
popupWithForm.setEventListeners();

// Function to generate a new Todo item
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Initialize and render Section
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list"
});
section.renderItems();

// Initialize TodoCounter
const todoCounter = new TodoCounter(initialTodos, '.counter__text');

// Event listener to open popup
document.querySelector(".button_action_add").addEventListener("click", () => {
  popupWithForm.open();
});

// Initialize and enable form validation
const addTodoFormValidator = new FormValidator(validationConfig, popupWithForm._form);
addTodoFormValidator.enableValidation();
