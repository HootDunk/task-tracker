// Edit task details event
const taskEditBtns = Array.from(document.getElementsByClassName("task-edit"));
const modalContent = document.querySelector(".modal-guts")
taskEditBtns.forEach((task) => {
  task.addEventListener("click", (e) => {
    // e.target.data-id -> pass data id to logic function which retrieves the data
    // data gets passed to the createTaskMarkup function to generate the pre-populated form

    // console.log(task.parentElement.parentElement)
    // console.log(task.parentElement.parentElement.previousElementSibling)
    console.log(modalContent)
    const modalTitle = "Edit Task"
    const todoTitle = "";
    modalContent.innerHTML = `
    <h1>${modalTitle}</h1>
    <form id="task-form">
      <div class="form-row">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" value="${todoTitle}">
        <label for="due-date">Due Date:</label>
        <input type="date" id="date" name="date" value="">
      </div>
      <div class="form-row">
        <label>Difficulty</label>
      </div>
      <div class="form-row">
        <div class="radio-toolbar">
          <input type="radio" id="radio1" name="radios" value="#F5D346">
          <label for="radio1">Low</label>
          <input type="radio" id="radio2" name="radios" value="#D98121">
          <label for="radio2">Medium</label>
          <input type="radio" id="radio3" name="radios" value="#D3151C">
          <label for="radio3">High</label>
        </div>
      </div>
        <div class="form-row">
          <label for="description">Description</label>
        </div>
        <div class="form-row">
          <textarea id="description" name="description"></textarea>
        </div>
        <div class="form-row bottom">
          <button type="button">Delete</button>
          <button type="submit">Submit</button>
        </div>
    </form>
    `;
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

// hides the modal by toggling the 'closed' class
closeButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});




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