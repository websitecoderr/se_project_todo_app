class Todo {
  constructor(data, templateSelector, handleDelete, handleComplete) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleDelete = handleDelete;
    this._handleComplete = handleComplete;
    this._templateElement = document.querySelector(this._templateSelector);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;

    const date = new Date(this._data.date);
    if (!isNaN(date)) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const formattedDate = date.toLocaleDateString(undefined, options);
      todoDate.textContent = formattedDate;
    } else {
      todoDate.textContent = '';
    }

    this._generateCheckboxEl();
    this.setEventListeners();

    return this._todoElement;
  }

  setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      if (this._handleComplete) {
        this._handleComplete(this._data.completed);
      }
    });

    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => {
      if (this._handleDelete) {
        this._handleDelete(this._data.completed);
      }
      this._todoElement.remove();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed || false;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }
}

export default Todo;
