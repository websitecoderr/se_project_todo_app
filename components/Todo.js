class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      console.log(this._data.completed);
      this._data.completed = !this._data.completed;
    });

    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => {
      console.log("Delete button clicked");
      this._todoElement.remove();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = this._data.date.toLocaleDateString(
      undefined,
      options
    );
    todoDate.textContent = formattedDate;

    this._generateCheckboxEl();
    this.setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
