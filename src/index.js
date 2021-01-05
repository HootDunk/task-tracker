// In the end this should only import events and the events should connect the logic and render functions
import { staticEvents, dynamicEvents } from "./events";
import { allProjects } from "./logic";
import { projectsPane,  tasks}  from "./render";



staticEvents.modalClose();
staticEvents.newProject();
staticEvents.newTask();
staticEvents.editProject();


// this only tests to see if there is a value in local storage.  doesn't ensure that the value you access is
if(localStorage.length){

  staticEvents.allBtn(allProjects);
  console.log("index.js:24 allProjects = ", allProjects)

  projectsPane.renderProjects(allProjects);
  dynamicEvents.projectNames();

  tasks.clear();
  tasks.renderAll(allProjects);

  dynamicEvents.editTaskBtns();
  dynamicEvents.expandedTodo();
  dynamicEvents.todoCheckBoxes();
  
}
else {
  // create a sample project and call startup functions
  console.log("no data found")
}




// KNOWN PROBLEMS

  // either edit the new task form when 'all' is selected or hide the button

  // need to add auto sample project and sample tasks when app is opened for first time by others
  // also add the re-render call for checkboxes

  // Wait! Still need to add the delete project and delete task ability

  // thats all that's left :)



















