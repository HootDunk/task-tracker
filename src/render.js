// need to know what specific data will be passed in here to finish the function
// if typeof == object else
// or maybe if (obj) else.  if theres a value, else.
const createTaskMarkup = () => {
  /*  
  ** Have this data preparation come from a prior function.
  if(obj){
    let modalTitle = "Edit Task"
    let todoTitle = obj.title
  }
  else {
    let modalTitle = "New Task"
    let todoTitle = ""
  }
  */
  const html = `
  <h1>${modalTitle}</h1>
    <form id="task-form">
      <div class="form-row">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" value="${todoTitle}">
        <label for="due-date">Due Date:</label>
        <input type="date" id="date" name="date" value="${date}">
      </div>
      <div class="form-row">
        <label>Difficulty</label>
      </div>
      <div class="form-row">
        <div class="radio-toolbar">
          <input type="radio" id="radio1" name="radios" value="#F5D346" ${low}>
          <label for="radio1">Low</label>
          <input type="radio" id="radio2" name="radios" value="#D98121" ${medium}>
          <label for="radio2">Medium</label>
          <input type="radio" id="radio3" name="radios" value="#D3151C" ${high}>
          <label for="radio3">High</label>
        </div>
      </div>
        <div class="form-row">
          <label for="description">Description</label>
        </div>
        <div class="form-row">
          <textarea id="description" name="description">${description}</textarea>
        </div>
        <div class="form-row bottom">
          <button type="button">Delete</button>
          <button type="submit">Submit</button>
        </div>
    </form>
  `;
}



const createModalHTML = () => {
  const modalContent = document.querySelector(".modal-guts")
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
}

const newProjectHTML = () => {
  modalContent.innerHTML = `
    <h1>New Project</h1>
    <form id="task-form">

      <div class="form-row">
        <label for="project-title">Title:</label>
      </div>

      <div class="form-row">
        <input type="text" id="project-title" name="project-title" value="">
      </div>


        <div class="form-row">
          <label for="project-description">Description</label>
        </div>
        <div class="form-row">
          <textarea id="project-description" name="project-description"></textarea>
        </div>
        <div class="form-row bottom">
          <button type="button">Delete</button>
          <button type="submit">Submit</button>
        </div>
    </form>
  `
}


const renderModal = (() => {

  const modalContent = document.querySelector(".modal-guts");
  const modal = document.querySelector("#modal");
  const modalOverlay = document.querySelector("#modal-overlay");


  const toggle = () => {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
  }

  const newProjectHTML = () => {
    modalContent.innerHTML = `
      <h1>New Project</h1>
      <form id="task-form">
  
        <div class="form-row">
          <label for="project-title">Title:</label>
        </div>
  
        <div class="form-row">
          <input type="text" id="project-title" name="project-title" value="">
        </div>
  
  
          <div class="form-row">
            <label for="project-description">Description</label>
          </div>
          <div class="form-row">
            <textarea id="project-description" name="project-description"></textarea>
          </div>
          <div class="form-row bottom">
            <button type="button">Delete</button>
            <button type="submit">Submit</button>
          </div>
      </form>
    `
  }

  return {
    newProjectHTML,
    toggle,
  }
})();


const renderProjects = (projectArr) => {
  const projectContent = document.getElementById('dynamic-projects');
  projectArr.forEach(project => {
    projectContent.innerHTML += `<h2 data-id='${project.id}' class="project-name">${project.name}</h2>`
  })
}



const tasks = (() => {

  const taskContent = document.getElementById("task-grouping");

  const clear = () => {
    taskContent.innerHTML = "";
  }

  const taskHTML = (taskObj) => {
    const HTML = `
    <div class="task-item">
      <div class="task accordian">
  
        <div id="priority-style"></div>
        <input type="checkbox" class="todo-completed">
        <h2 class="title">${taskObj.title}</h2>
        <h2 class="date">In X days</h2>
  
      </div>
      <div class="task-full inactive">
        <div class="description-top">
          <h3>Description:</h3>
          <h3>10/20/20</h3>
          <i class="fas fa-ellipsis-v task-edit"></i>
        </div>
        <p>Bacon ipsum dolor amet ham short loin alcatra corned beef shank pig. Doner fatback corned beef brisket short ribs, bacon spare ribs short loin cow. Ball tip kevin alcatra rump brisket. Bacon meatloaf meatball ball tip burgdoggen sirloin.</p>
      </div>
    </div>
    `
    return HTML;
  }
  
  
  const render = (taskArr) => {
    taskArr.forEach(task => {
      taskContent.innerHTML += taskHTML(task);
    })
  }

  return {
    clear,
    render,
  }
})();





export {
  createModalHTML,
  renderModal,
  renderProjects,
  tasks
}

// consider making a module function for all the modal rendering as they will share variables