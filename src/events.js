
import { renderModal, projectsPane, tasks, showHeaderInfo } from './render';
import { projectsArray, allProjects } from './logic';


/* staticEvents is a module function for event listeners that are created for one singular element.
    They may be created at different times and for different reasons but each time, only one is created.
*/
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
      projectsArray.addNewProject(newProjectForm['project-title'].value, newProjectForm['project-description'].value, allProjects)

      projectsPane.clearProjects();
      projectsPane.renderProjects(allProjects);

      dynamicEvents.projectNames();
      projectsArray.save(allProjects)
      renderModal.toggle();
    })
  }

  const newProject = () => {
    newProjectBtn.addEventListener("click", () =>{
      // generate HTML for new project form
      renderModal.projectHTML(undefined);
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
      // Adds the task to the projects array
      projectsArray.addNewTask(newTask.title, newTask.description, newTask.priority, newTask.dueDate, allProjects);
      // get the active project
      const activeProj = projectsArray.getActiveProj(allProjects);
      // clear the tasks then render them
      tasks.clear();
      (activeProj)? tasks.render(activeProj.todoList) : tasks.renderAll(allProjects);
      // create task event listeners
      dynamicEvents.editTaskBtns();
      dynamicEvents.expandedTodo();
      dynamicEvents.todoCheckBoxes();

      // Save the projects array to local storage
      projectsArray.save(allProjects)
      // // hide the modal
      renderModal.toggle();
    })
  }

  const newTask = () => {
    newTaskBtn.addEventListener("click", () => {
      // createModalHTML();
      renderModal.taskHTML()
      newTaskSubmit();
      // create submit event listener
      renderModal.toggle();
    })
  }

  // Event listener for submitting the form used to edit a task
  const editTaskSubmit = () => {
    const editTaskForm = document.getElementById("modal-form");
    editTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTask = {
        id: e.target.dataset.id,
        title: editTaskForm["title"].value,
        dueDate: editTaskForm["date"].value,
        priority: editTaskForm.radios.value,
        description: editTaskForm["description"].value,
      }
      // finds the task in the array and updates its values
      projectsArray.editTask(newTask.id, newTask, allProjects)
      // get the active project (if an active project exists, render those todos, otherwise render all todos))
      const activeProj = projectsArray.getActiveProj(allProjects);
      tasks.clear();
      // move this to the render function
      (activeProj)? tasks.render(activeProj.todoList) : tasks.renderAll(allProjects)
      // create task event listeners
      dynamicEvents.editTaskBtns();
      dynamicEvents.expandedTodo();
      dynamicEvents.todoCheckBoxes();
      // Save the projects array to local storage
      projectsArray.save(allProjects)
      // hide the modal
      renderModal.toggle();
    })
    
  }

  const allBtn = (allProjects) => {
    const allProjectsBtn = document.getElementById("all-projects");
    allProjectsBtn.addEventListener("click", (e) => {
      // set all projects active key to a value of false
      projectsArray.allToInactive(allProjects);
      // clear task area and render all projects
      
      tasks.clear();
      tasks.renderAll(allProjects)
      // Create object to describe the 'all' tab use it to display the header.
      const allLiteral = {name: "All", description: "Viewing all projects"};
      showHeaderInfo(allLiteral)
      // active project recieves light background, all others set to transparent
      projectsPane.setBackground(e.target.dataset.id);
      // initialize event listeners for all tasks
      dynamicEvents.editTaskBtns();
      dynamicEvents.expandedTodo();
      dynamicEvents.todoCheckBoxes();
    })
  }

  const editProjectSubmit = () => {
    const form = document.getElementById("modal-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let projObj = {
        id: e.target.dataset.id,
        name: form['project-title'].value,
        description: form['project-description'].value,
      }
      projectsArray.editProject(projObj, allProjects)
      // get the active project
      const activeProj = projectsArray.getActiveProj(allProjects);
      showHeaderInfo(activeProj)
      // update the projects pane
      projectsPane.updateProjectNames(projObj.id, activeProj)
      // Save the projects array to local storage
      projectsArray.save(allProjects)
      // hide the modal
      renderModal.toggle();

    })
  }

  const deleteProjectBtn = () => {
    const deleteBtn = document.getElementById("delete-button");
    deleteBtn.addEventListener("click", (e) => {
      const projID = e.target.parentElement.parentElement.dataset.id;

      projectsArray.deleteProject(projID, allProjects)

      projectsPane.clearProjects();
      projectsPane.renderProjects(allProjects);
      dynamicEvents.projectNames();

      projectsPane.setBackground('all');
      tasks.clear();
      tasks.renderAll(allProjects)

      dynamicEvents.editTaskBtns();
      dynamicEvents.expandedTodo();
      dynamicEvents.todoCheckBoxes();

      projectsArray.save(allProjects)
      renderModal.toggle();

    })
  }

  const editProject = () => {
    editProjectBtn.addEventListener("click", () => {
      const activeProj = projectsArray.getActiveProj(allProjects);
      renderModal.projectHTML(activeProj);
      
      editProjectSubmit();
      deleteProjectBtn();
      renderModal.toggle();
    })
  }

  const deleteTaskBtn = () => {
    const deleteBtn = document.getElementById("delete-button")
    deleteBtn.addEventListener("click", (e) => {
      const taskID = e.target.parentElement.parentElement.dataset.id;
      projectsArray.deleteTask(taskID, allProjects)
      const activeProj = projectsArray.getActiveProj(allProjects);
      // clear the tasks then render them
      tasks.clear();
      (activeProj)? tasks.render(activeProj.todoList) : tasks.renderAll(allProjects)
      // create task event listeners
      dynamicEvents.editTaskBtns();
      dynamicEvents.expandedTodo();
      dynamicEvents.todoCheckBoxes();

      // Save the projects array to local storage
      projectsArray.save(allProjects)
      renderModal.toggle();
    })
  }



  return {
    modalClose,
    newProject,
    newTask,
    allBtn,
    editProject,
    editTaskSubmit,
    deleteTaskBtn,
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
      // e.target.parentElement.classList.toggle("completed")
      const taskID = e.target.parentElement.parentElement.dataset.id;
      projectsArray.toggleTask(taskID, allProjects)

      const activeProj = projectsArray.getActiveProj(allProjects);
      // clear the tasks then render them
      tasks.clear();
      (activeProj)? tasks.render(activeProj.todoList) : tasks.renderAll(allProjects)
      // create task event listeners
      dynamicEvents.editTaskBtns();
      dynamicEvents.expandedTodo();
      dynamicEvents.todoCheckBoxes();

      projectsArray.save(allProjects)
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
    taskEditBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", () => {
        let taskObj = projectsArray.getTask(editBtn.getAttribute("data-id"), allProjects);
        
        renderModal.taskHTML(taskObj)
        staticEvents.deleteTaskBtn();
        staticEvents.editTaskSubmit()
        renderModal.toggle();
      })
    })
  };

  const projectNames = () => {
    const projectNames = Array.from(document.getElementsByClassName("project-name"));
    // console.log("projects", projectNames)
    projectNames.forEach(project => {
      project.addEventListener("click", (e) => {
        const projID = e.target.dataset.id;
        // set current project to active and all others to inactive
        projectsArray.setToActive(projID, allProjects)
        
        const activeProj = projectsArray.getActiveProj(allProjects);
        showHeaderInfo(activeProj);
        
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
