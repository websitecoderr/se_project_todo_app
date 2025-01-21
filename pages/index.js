import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";


const handleFormSubmit = (formData) => {
  console.log('Form Data:', formData);
  const newTodo = generateTodo({
    ...formData,
    id: uuidv4(),
    date: formData.date ? new Date(formData.date).toISOString() : '',
    completed: false
  });
  console.log('New Todo:', newTodo);
  section.addItem(newTodo);
  todoCounter.updateTotal(true);
  popupWithForm.close();
};


const popupWithForm = new PopupWithForm('#add-todo-popup', handleFormSubmit);
popupWithForm.setEventListeners();


const generateTodo = (data) => {
  const todo = new Todo(
    data, 
    "#todo-template",
    (wasCompleted) => {
      todoCounter.updateTotal(false);
      if (wasCompleted) {
        todoCounter.updateCompleted(false);
      }
    },
    (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    }
  );
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



