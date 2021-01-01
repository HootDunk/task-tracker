
import { createModalHTML, renderModal, projectsPane, tasks, showHeaderInfo } from './render';
import {Todo, Project, projectsArray, allProjects} from './logic';


// No rendering and no data parsing in the events.
// call on logic to work with data strictly from events
// pass the results of logic straight to the render function and vice versa


/* staticEvents is a module function for event listeners that are initialized once. */
const staticEvents = (() => {

  const closeButton = document.querySelector("#close-button");
  const newProjectBtn = document.getElementById("new-project");
  const newTaskBtn = document.getElementById("new-task");
  const editProjectBtn = document.getElementById("edit-project");

  const modalClose = () => {
  closeButton.addEventListener("click", function() {
    renderModal.toggle();
  });
  }
  
  // creates event listener for submit event on new project form
  const newProjectSubmit = () => {
    const newProjectForm = document.getElementById("modal-form");
    newProjectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // in logic js, create function to create new object and add it to the allProjects array.  return it here?
      projectsArray.addNewProject(newProjectForm['project-title'].value, newProjectForm['project-description'].value, allProjects)
      // clear, then render projects
      projectsPane.clearProjects();
      projectsPane.renderProjects(allProjects);
      // creates event listener for projects in the project pane
      dynamicEvents.projectNames();
      // hide modal
      renderModal.toggle();
    })
  }

  const newProject = () => {
    newProjectBtn.addEventListener("click", () =>{
      // generate HTML for new project form
      renderModal.newProjectHTML();
      // add submit event listener on new project form
      newProjectSubmit();
      // display the modal
      renderModal.toggle();
      
    })
  }

  const newTaskSubmit = () => {
    const newTaskForm = document.getElementById("modal-form");
    newTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTask = {
        title: newTaskForm["title"].value,
        dueDate: newTaskForm["date"].value,
        priority: newTaskForm.radios.value,
        description: newTaskForm["description"].value,
      }

      projectsArray.addNewTask(newTask.title, newTask.description, newTask.priority, newTask.dueDate, allProjects);

      const activeProj = projectsArray.getActiveProj(allProjects);
      tasks.clear();
      tasks.render(activeProj.todoList);
      // create task event listeners
      dynamicEvents.editTaskBtns();
      dynamicEvents.expandedTodo();
      dynamicEvents.todoCheckBoxes();
      // // hide the modal
      renderModal.toggle();
    })
  }

  const newTask = () => {
    newTaskBtn.addEventListener("click", () => {
      createModalHTML();
      newTaskSubmit();
      // create submit event listener
      renderModal.toggle();
    })
  }

  const allBtn = (allProjects) => {
    const allProjectsBtn = document.getElementById("all-projects");
    allProjectsBtn.addEventListener("click", (e) => {
      tasks.clear();
      tasks.renderAll(allProjects)
      projectsPane.setBackground(e.target.getAttribute('data-id'));
      dynamicEvents.editTaskBtns();
      dynamicEvents.expandedTodo();
      dynamicEvents.todoCheckBoxes();
    })
  }

  const editProject = () => {
    editProjectBtn.addEventListener("click", () => {

      console.log("lets edit the project")
      const activeProj = projectsArray.getActiveProj(allProjects);
      // pass in the object to the render modal function
      // generate the form html and display it
      // create event listener for submit
        // update the object on submit  
    })
  }

  


  return {
    modalClose,
    newProject,
    newTask,
    allBtn,
    editProject,
  }
})();


/* Module Function for dynamic events.  These are event listeners that need to be initialized for a varying number of elements .  
  Ex: there can be 0 to many tasks and each task
  will need a corresponding number of edit task buttons. */
const dynamicEvents = (() => {
  const todoCheckBoxes = () => {
  // Toggle Completed Status with checkbox
  const todoCheckBoxes = Array.from(document.getElementsByClassName("todo-completed"));
  todoCheckBoxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const taskDiv = e.target.parentElement.parentElement;
      const taskID = taskDiv.getAttribute("data-id");
      console.log(taskID)
    })
  })
  }

  const expandedTodo = () => {
  // Dropdown functionality for todo items (Show detailed view on click)
  const taskSummary = Array.from(document.getElementsByClassName('accordian'));
  taskSummary.forEach(task => {
    task.addEventListener("click", (e) => {
      if (e.target.className != "todo-completed"){
        task.nextElementSibling.classList.toggle("inactive");
      }
    })
  })
  }

  // Edit task details event
  const editTaskBtns = () => {
    const taskEditBtns = Array.from(document.getElementsByClassName("task-edit"));
    taskEditBtns.forEach((task) => {
      task.addEventListener("click", (e) => {
        // e.target.data-id -> pass data id to logic function which retrieves the data
        // data gets passed to the createTaskMarkup function to generate the pre-populated form
    
        // console.log(task.parentElement.parentElement)
        // console.log(task.parentElement.parentElement.previousElementSibling)
 
        // need to get the data side of things going here and move this html to a render function
        createModalHTML();
        renderModal.toggle();

      })
    })
  };


  const projectNames = () => {
    const projectNames = Array.from(document.getElementsByClassName("project-name"));
    // console.log("projects", projectNames)
    projectNames.forEach(project => {
      project.addEventListener("click", (e) => {
        const projID = e.target.getAttribute('data-id');
        // set current project to active and all others to inactive
        projectsArray.setToActive(projID, allProjects)

        // manage display based on active
          // update heading info
        const activeProj = projectsArray.getActiveProj(allProjects);

        showHeaderInfo(activeProj);
          // render tasks (render all active tasks)
        tasks.clear();
        tasks.render(activeProj.todoList)
        projectsPane.setBackground(projID);

        dynamicEvents.editTaskBtns();
        dynamicEvents.expandedTodo();
        dynamicEvents.todoCheckBoxes();

          
      })
    })
  };

  return {
    todoCheckBoxes,
    expandedTodo,
    editTaskBtns,
    projectNames,
  }
})();

export {
  staticEvents,
  dynamicEvents
}





