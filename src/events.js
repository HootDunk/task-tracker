
import { createModalHTML, renderModal, projectsPane, tasks, showHeaderInfo } from './render';
import {Todo, Project, projectsArray, allProjects} from './logic';


// No rendering and no data parsing in the events.
// call on logic to work with data strictly from events
// pass the results of logic straight to the render function and vice versa


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

      // in logic js, create function to create new object and add it to the allProjects array.  return it here?
      projectsArray.addNewProject(newProjectForm['project-title'].value, newProjectForm['project-description'].value, allProjects)
      // clear, then render projects
      projectsPane.clearProjects();
      projectsPane.renderProjects(allProjects);
      // creates event listener for projects in the project pane
      dynamicEvents.projectNames();
      //save to local storage
      projectsArray.save(allProjects)
      // hide modal
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
      tasks.render(activeProj.todoList);

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
      projectsArray.allToInactive(allProjects);
      tasks.clear();
      tasks.renderAll(allProjects)
      console.log("allBtn() ", allProjects)
      const allLiteral = {name: "All", description: "Viewing all projects"};
      showHeaderInfo(allLiteral)
      projectsPane.setBackground(e.target.getAttribute('data-id'));
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


  const editProject = () => {
    editProjectBtn.addEventListener("click", () => {

      console.log("lets edit the project")
      const activeProj = projectsArray.getActiveProj(allProjects);
      renderModal.projectHTML(activeProj);
      // event listener for submit goes here
      editProjectSubmit();
      // event listener for delete
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
      console.log("todoCheckBoxes", taskID)
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

        // get task object using data-id below
        let taskObj = projectsArray.getTask(editBtn.getAttribute("data-id"), allProjects);
        // need to add the conditional checkbox in the taskHTML function and make fields required
        renderModal.taskHTML(taskObj)
        // Once the modal is rendered you need to initialize the delete and submit events
        staticEvents.editTaskSubmit()
        // from there make calls to array logic to replace and or delete a project by id
        // may need to give the buttons the data id of the current 
        renderModal.toggle();

      })
    })
  };

  // would be better named 'projectTabs' or something of the like.  could also combine this and the allBtn function.  Just add a funciton to handle additional
  //  tasks if the data-id == 'all'. may require too much re-working to justify the minor reduction in code.
  const projectNames = () => {
    const projectNames = Array.from(document.getElementsByClassName("project-name"));
    // console.log("projects", projectNames)
    projectNames.forEach(project => {
      project.addEventListener("click", (e) => {
        const projID = e.target.getAttribute('data-id');
        // set current project to active and all others to inactive
        projectsArray.setToActive(projID, allProjects)

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





