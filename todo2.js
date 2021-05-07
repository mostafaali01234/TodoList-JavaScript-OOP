/********************************  ********************************/
class TodoList {
  constructor() {
    this.list = [];
    this.listElement = document.querySelector(".tasks-list");
    this.inputField = document.querySelector(".add-box input");
  }

  addTask(name) {
    if (this.inputField.value != "") {
      let duplicate = this.checkTaskAvailability(name);
      if (duplicate) {
        this.list.push(new TodoTask(name));
        this.createElements();
      } else alert("Task already exists");
    } else {
      alert("Please Enter a task before adding!!");
    }
  }

  checkTaskAvailability(name) {
    let tasks = [];
    this.list.forEach((item) => {
      tasks.push(item.name);
    });
    if (!tasks.includes(name)) {
      return true;
    } else {
      return false;
    }
  }

  createElements() {
    let newTask = document.createElement("span"),
      deleteElement = document.createElement("span"),
      deleteText = document.createTextNode("Delete"),
      completeElement = document.createElement("span"),
      completeText = document.createTextNode("Complete");

    deleteElement.appendChild(deleteText);
    deleteElement.className = "delete";
    completeElement.appendChild(completeText);
    completeElement.className = "complete";

    newTask.textContent = input.value;
    newTask.classList.add("taskBox");

    newTask.appendChild(deleteElement);
    newTask.appendChild(completeElement);
    this.listElement.appendChild(newTask);
    this.inputField.value = "";
  }

  clearList() {
    this.list = [];
    let listContent = document.querySelectorAll(".tasks-list .taskBox");
    listContent.forEach((i) => {
      i.remove();
    });
  }

  deleteTask(target) {
    let txt = target.parentNode.childNodes[0].nodeValue;
    let filter = this.list.filter((i) => i.name != txt);
    this.list = filter;
    target.parentNode.remove();
  }

  completeTask(target) {
    target.parentNode.classList.toggle("finish");
    target.classList.toggle("finish");
    this.list.forEach((i) => {
      if (i.name == target.parentNode.childNodes[0].nodeValue)
        i.isCompleted = !i.isCompleted;
    });
  }

  completeAll() {
    let listContent = document.querySelectorAll(".tasks-list .taskBox");
    listContent.forEach((item) => {
      if (!item.classList.contains("finish")) {
        item.classList.toggle("finish");
        item.childNodes[2].classList.toggle("finish");
      }
    });
    this.list.forEach((i) => {
      i.isCompleted = true;
    });
  }
}

class TodoTask {
  constructor(name) {
    this.name = name;
    this.isCompleted = false;
  }
}
/********************************  ********************************/

let input = document.querySelector(".add-box input"),
  addButton = document.querySelector(".plus"),
  list = document.querySelector(".tasks-list");

/******************************** Adding new task ********************************/
let newList = new TodoList();

addButton.onclick = function () {
  newList.addTask(input.value);
};

/*-------------------- Finish & Delete tasks  --------------------*/
document.addEventListener("click", function (e) {
  // Delete Task
  if (e.target.classList.contains("delete")) {
    newList.deleteTask(e.target);
  }

  // Delete All
  if (e.target.classList.contains("deleteAll")) {
    newList.clearList();
  }

  // Complete Task
  if (e.target.classList.contains("complete")) {
    newList.completeTask(e.target);
  }

  // Complete All
  if (e.target.classList.contains("finishAll")) {
    newList.completeAll();
  }
});
/*--------------------  --------------------*/
