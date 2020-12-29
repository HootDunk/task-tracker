
import { createModalHTML, renderModal, renderTasks } from './render';


// No rendering and no data parsing in the events.
// call on logic to work with data strictly from events
// pass the results of logic straight to the render function

// Use actual functions for event listener rather than nameless ones or whatever they're called


/* staticEvents is a module function for event listeners which only need to be called on startup.*/
const staticEvents = (() => {

  const closeButton = document.querySelector("#close-button");
  const newProjectBtn = document.getElementById("new-project");
  const newTaskBtn = document.getElementById("new-task");

  // const toggleModal = () => {
  //   modal.classList.toggle("closed");
  //   modalOverlay.classList.toggle("closed");
  // }


  const modalClose = () => {
  closeButton.addEventListener("click", function() {
    renderModal.toggle();
  });
  }

  const newProject = () => {
    newProjectBtn.addEventListener("click", () =>{
      renderModal.newProjectHTML();
      renderModal.toggle();
    })
  }

  const newTask = () => {
    newTaskBtn.addEventListener("click", () => {
      createModalHTML();
      renderModal.toggle();
    })
  }

  const allProjects = () => {
    const allProjectsBtn = document.getElementById("all-projects");

    allProjectsBtn.addEventListener("click", () => {
      allProjects.forEach(project => {

      })
    })

  }


  return {
    modalClose,
    newProject,
    newTask,
    allProjects,
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
    checkbox.addEventListener("click", () => {
      console.log("toggle completed")
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
    console.log("projects", projectNames)
    projectNames.forEach(project => {
      project.addEventListener("click", () => console.log(project))
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