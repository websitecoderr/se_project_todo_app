
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Todo from "../components/Todo.js";  
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// Function to handle form submissions
const handleFormSubmit = (formData) => {
  console.log('Form Data:', formData);  
  const newTodo = generateTodo({
    ...formData,
    id: uuidv4(),
    date: new Date(formData.date).toISOString(),
  });
  console.log('New Todo:', newTodo);  
  section.addItem(newTodo);
  todoCounter.updateTotal(true);
};

// Initialize PopupWithForm
const popupWithForm = new PopupWithForm('#add-todo-popup', handleFormSubmit);
popupWithForm.setEventListeners();

// Function to generate a new todo item
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Initialize and render the section with initial todos
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list"
});
section.renderItems();

// Initialize the todo counter
const todoCounter = new TodoCounter(initialTodos, '.counter__text');

// Add event listener to open the popup form
document.querySelector(".button_action_add").addEventListener("click", () => {
  popupWithForm.open();
});

// Enable form validation for the add todo form
const addTodoFormValidator = new FormValidator(validationConfig, popupWithForm._form);
addTodoFormValidator.enableValidation();



