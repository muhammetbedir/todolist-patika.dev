let valueDOM = document.querySelector("#task");
let btnDOM = document.querySelector("#liveToastBtn");
let listDOM = document.querySelector("#list");

document.addEventListener("DOMContentLoaded", loadAllTodos);

btnDOM.addEventListener("click", () => {
  addFromStorage();
  warningMessage();
  addTodo(valueDOM.value);
});

//show warning message

function warningMessage() {
  if (valueDOM.value) {
    //create warning

    let alertToast = document.querySelector("#liveToast");
    alertToast.className = ("toast", "show");
    alertToast.style.display = "block";
    setTimeout(() => {
      alertToast.style.display = "none";
    }, 1000);

    //empty warning
  } else {
    let alertToast2 = document.querySelector("#liveToast2");
    alertToast2.className = ("toast", "show");
    alertToast2.style.display = "block";

    setTimeout(() => {
      alertToast2.style.display = "none";
    }, 1000);
  }
}

//add new todo in list

function addTodo(newTodo) {
  if (newTodo) {
    let liDOM = document.createElement("li");
    let link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    liDOM.className = "listItem";
    link.innerHTML = `<i class = "fa fa-remove close list-close"></i>`;
    liDOM.appendChild(document.createTextNode(newTodo));
    liDOM.appendChild(link);
    listDOM.append(liDOM);
    valueDOM.value = "";
  }
}

//localStorage

function getFromStorage() {
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  if (localItems === null) {
    taskList = [];
  } else {
    taskList = localItems;
  }
  return taskList;
}
function addFromStorage() {
  getFromStorage();
  taskList.push(valueDOM.value);
  localStorage.setItem("localItem", JSON.stringify(taskList));
}

function loadAllTodos() {
  let taskList = getFromStorage();
  taskList.forEach(function (todo) {
    addTodo(todo);
  });
}

//delete item

listDOM.addEventListener("click", deleteItem);

function deleteItem(e) {
  if (e.target.className === "fa fa-remove close list-close") {
    e.target.parentElement.parentElement.remove();
    deleteFromStorage(e.target.parentElement.parentElement.textContent);
  }
}

//delete item from storage

function deleteFromStorage(deleteTodo) {
  let todos = getFromStorage();
  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("localItem", JSON.stringify(todos));
}

//checked toggle

listDOM.addEventListener("click", function (ev) {
  ev.target.classList.toggle("checked");
});
