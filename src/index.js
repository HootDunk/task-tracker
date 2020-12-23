import { v4 as uuidv4 } from 'uuid';

// Test whether local storage has been populated
if(localStorage.length){

  console.log(JSON.parse(localStorage.getItem('user')));
}

let allProjects = [];

const project = (name, description) => {
  const id = uuidv4();
  let active = false;
  const todoList = [];

  const getTodoList = () => {return todoList};
  const addTodo = (newItem) => todoList.push(newItem);
  const toggleActive = () => active = !active;

  return {id, name, description, active, toggleActive};
}

const todo = (title, description, priority, dueDate) => {
  const id = uuidv4();
  let completed = false;
  // will likely need to handle the date string either here or in the controller
  return {title, description, priority, dueDate, completed, id}
}

const newProject = project("test", "testing some more");
console.log(newProject)
newProject.active = true;
console.log(newProject)





// localStorage.setItem("user", JSON.stringify(allProjects));




// Use actual functions for event listener rather than nameless ones or whatever they're called

// Dropdown functionality for todo items (Show detailed view on click)
const taskSummary = Array.from(document.getElementsByClassName('accordian'));
taskSummary.forEach(task => {
  task.addEventListener("click", (e) => {
    if (e.target.className != "todo-completed"){
      task.nextElementSibling.classList.toggle("inactive");
    }
  })
})


// Edit task details event
const taskEditBtns = Array.from(document.getElementsByClassName("task-edit"));
taskEditBtns.forEach((task) => {
  task.addEventListener("click", (e) => {
    console.log(task.parentElement.parentElement)
    console.log(task.parentElement.parentElement.previousElementSibling)
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed")
  })
})
// Toggle Completed Status with checkbox
const todoCheckBoxes = Array.from(document.getElementsByClassName("todo-completed"));
todoCheckBoxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    console.log("toggle completed")
  })
})




var modal = document.querySelector("#modal");
var modalOverlay = document.querySelector("#modal-overlay");
var closeButton = document.querySelector("#close-button");


closeButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

