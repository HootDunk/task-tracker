// is there an advantage from specifying the complete path?
// import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
// import compareAsc from 'date-fns/compareAsc'
// import format from 'date-fns/format'
import { compareDesc, format, compareAsc, differenceInCalendarDays } from 'date-fns';

// Module housing functions that display information within the modal
const renderModal = (() => {

  const modalContent = document.querySelector(".modal-guts");
  const modal = document.querySelector("#modal");
  const modalOverlay = document.querySelector("#modal-overlay");

  const toggle = () => {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
  }
  // re-use newProjectHTML and make it work as an edit form and a new project form
  const projectHTML = (projObj) => {
    let h1 = (projObj)? `<h1>Edit Project</h1>` : `<h1>New Project</h1>`;
    let formTagContent = (projObj)? `data-id="${projObj.id}" id="modal-form"` : `id="modal-form"`;
    let titleValue = (projObj)? `value="${projObj.name}"` : "";
    let descriptionValue = (projObj)? `${projObj.description}` : ""; 
    let input = (projObj)? `<button id="delete-button" type="button">Delete</button><button type="submit">Submit</button>` : `<button type="submit">Submit</button>`;
    modalContent.innerHTML = `
      ${h1}
      <form ${formTagContent}>
        <div class="form-row">
          <label for="project-title">Title:</label>
        </div>
        <div class="form-row">
          <input type="text" id="project-title" name="project-title" ${titleValue} required />
        </div>
        <div class="form-row">
          <label for="project-description">Description</label>
        </div>
        <div class="form-row">
          <textarea id="project-description" name="project-description" required>${descriptionValue}</textarea>
        </div>
        <div class="form-row bottom">
          ${input}
        </div>
      </form>
    `
  }

  // creates HTML for creating new tasks and editing old tasks
  // must include identifiers to support events for editing and deleting data
  const taskHTML = (taskObj) => {

    let title = (taskObj)? `<input type="text" id="title" name="title" value="${taskObj.title}">` : `<input type="text" id="title" name="title">`;
    let dueDate = (taskObj)? `<input type="date" id="date" name="date" value="${format(taskObj.dueDate,'yyyy-MM-dd')}">` : '<input type="date" id="date" name="date">';
    let priority = (taskObj)? `
    <div class="radio-toolbar">
      <input type="radio" id="radio1" name="radios" value="#F5D346" ${(taskObj.priority == "#F5D346")? "checked" : ""}>
      <label for="radio1">Low</label>
      <input type="radio" id="radio2" name="radios" value="#D98121" ${(taskObj.priority == "#D98121")? "checked" : ""}>
      <label for="radio2">Medium</label>
      <input type="radio" id="radio3" name="radios" value="#D3151C" ${(taskObj.priority == "#D3151C")? "checked" : ""}>
      <label for="radio3">High</label>
    </div>
    `
    :
    `
    <div class="radio-toolbar">
      <input type="radio" id="radio1" name="radios" value="#F5D346" checked>
      <label for="radio1">Low</label>
      <input type="radio" id="radio2" name="radios" value="#D98121">
      <label for="radio2">Medium</label>
      <input type="radio" id="radio3" name="radios" value="#D3151C">
      <label for="radio3">High</label>
    </div>
    `;
    let description = (taskObj)? 
    `<textarea id="description" name="description">${taskObj.description}</textarea>`
    :
    `<textarea id="description" name="description"></textarea>`

    modalContent.innerHTML = `
    <h1>${taskObj? "Edit Task" : "New Task"}</h1>
    <form data-id="${(taskObj)? taskObj.id : ""}" id="modal-form">
      <div class="form-row">
        <label for="title">Title:</label>
        ${title}
        <label for="due-date">Due Date:</label>
        ${dueDate}
      </div>
      <div class="form-row">
        <label>Difficulty</label>
      </div>
      <div class="form-row">
      ${priority}
      </div>
        <div class="form-row">
          <label for="description">Description</label>
        </div>
        <div class="form-row">
          ${description}
        </div>
        <div class="form-row bottom">
          ${(taskObj)? `<button id="delete-button" type="button">Delete</button><button type="submit">Submit</button>` : `<button type="submit">Submit</button>`}
        </div>
    </form>
    `;
  }

  return {
    projectHTML,
    toggle,
    taskHTML,
  }
})();


const projectsPane = (() => {
  const projectContent = document.getElementById('dynamic-projects');
  const renderProjects = (projectArr) => {
    projectArr.forEach(project => {
      projectContent.innerHTML += `<h2 data-id='${project.id}' class="project project-name">${project.name}</h2>`
    })
  }
  const clearProjects = () => {
    projectContent.innerHTML = "";
  }

  const setBackground = (id) => {
    const projects = Array.from(document.getElementsByClassName("project"));
    projects.forEach(project => {
      if(project.getAttribute('data-id') == id){
        project.style.backgroundColor = "#444a4d";
      }
      else {
        project.style.backgroundColor = "transparent";
      }
    })
    
  }
  // called after a project is edited or deleted
  const updateProjectNames = (id, projObj) => {
    const projects = document.getElementsByClassName("project-name");
    for(let i = 0; i < projects.length; i++){
      if (projects[i].getAttribute('data-id') == id){
        projects[i].innerText = projObj.name;
        return;
      }
    }
    
  }

  return {
    renderProjects,
    clearProjects,
    setBackground,
    updateProjectNames,
  }

})();

const getDateInWords = (date) => {
  const today = new Date();
  let dateString;
  const dateComparison = compareAsc(date, today);

  if(dateComparison == -1){
    let dateNum = differenceInCalendarDays(today, date);
    if (dateNum == 1){
      dateString = "1 day past"
    }
    else {
      (dateNum == 0)? dateString = "Today" : dateString = `${dateNum} days past`;
    }
  }
  // date is upcoming
  else if (dateComparison== 1){
    let dateNum = differenceInCalendarDays(date, today);
    if (dateNum == 1){
      dateString = "In 1 day";
    }
    else {
      dateString = `In ${dateNum} days`
    }
  }
  return dateString;
}


// Module function for rendering tasks in the main content area 
const tasks = (() => {
  const taskContent = document.getElementById("task-grouping");

  const clear = () => {
    taskContent.innerHTML = "";
  }


  const taskHTML = (taskObj) => {
    // console.log("Now rendering = ", taskObj)
    const HTML = `
    <div data-id="${taskObj.id}" class="task-item">
      <div class="task accordian ${(taskObj.complete == true)? "completed" : ""}">
  
        <div style="background-color:${taskObj.priority}; "id="priority-style"></div>
        <input type="checkbox" class="todo-completed" ${taskObj.complete == true ? "checked" : ""}>
        <h2 class="title">${taskObj.title}</h2>
        <h2 class="date">${getDateInWords(taskObj.dueDate)}</h2>
  
      </div>
      <div class="task-full inactive">
        <div class="description-top">
          <h3>Description:</h3>
          <h3>${taskObj.dueDate.toDateString()}</h3>
          <i data-id="${taskObj.id}" class="fas fa-ellipsis-v task-edit"></i>
        </div>
        <p>${taskObj.description}</p>
      </div>
    </div>
    `
    return HTML;
  }

  const dueDateAsc = (a, b) => {
    const result = compareAsc(a.dueDate, b.dueDate);
    return result;
  }
  const dueDateDesc = (a, b) => {
    const result = compareDesc(a.dueDate, b.dueDate);
    return result;
  }

  const sortTasks = (taskArr) => {
    const completed = taskArr.filter(task => task.complete == true);
    const inProgress = taskArr.filter(task => task.complete == false);
    completed.sort(dueDateDesc)
    console.log(completed)
    inProgress.sort(dueDateAsc)
    console.log(inProgress)
    taskArr = inProgress.concat(completed);
    return taskArr;
  }
  
  const render = (taskArr) => {
    // arranges array elements based on currently selected sort button.
    taskArr = sortTasks(taskArr);

    if(taskArr.length){
      taskArr.forEach(task => {
        taskContent.innerHTML += taskHTML(task);
      })
    }
    else console.log('no tasks yet')
  }

  const renderAll = (allProjects) => {
    let tempArr = []
    allProjects.forEach(project => {
      project.todoList.forEach(item => {
        tempArr.push(item)
      })
    })
    tasks.render(tempArr)
  }

  return {
    clear,
    render,
    renderAll,
  }
})();

const showHeaderInfo = (proj) => {
  const projectH1 = document.getElementById("active-title");
  const projectH2 = document.getElementById("active-description");
  
  projectH1.innerHTML = proj.name;
  projectH2.innerHTML = proj.description;
}

const toggleSortButtons = () => {
  const dueDateBtn = document.getElementById("due-date");
  const difficultyBtn = document.getElementById("difficulty");
  difficultyBtn.classList.toggle("underline");
  dueDateBtn.classList.toggle("underline")
}


export {
  renderModal,
  projectsPane,
  tasks,
  showHeaderInfo,
  toggleSortButtons,

}


