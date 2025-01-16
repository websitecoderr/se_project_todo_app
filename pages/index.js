import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const handleFormSubmit = (formData) => {
  console.log("Form submitted with data:", formData);
  const todo = generateTodo({
    ...formData,
    id: uuidv4(),
    date: new Date(formData.date).toISOString(),
  });
  section.addItem(todo);
  addTodoFormValidator.resetValidation();
};

const addTodoPopup = new PopupWithForm("#add-todo-popup", handleFormSubmit);
addTodoPopup.setEventListeners();

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
  containerSelector: ".todos__list",
});
section.renderItems();

document.querySelector(".button_action_add").addEventListener("click", () => {
  addTodoPopup.open();
});

const addTodoFormValidator = new FormValidator(
  validationConfig,
  addTodoPopup._form
);
addTodoFormValidator.enableValidation();
