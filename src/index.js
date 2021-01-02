// In the end this should only import events and the events should connect the logic and render functions
import { staticEvents, dynamicEvents } from "./events";
import { Todo, Project, deleteProject, allProjects } from "./logic";
import { projectsPane, renderTasks, tasks}  from "./render";



staticEvents.modalClose();
staticEvents.newProject();
staticEvents.newTask();
staticEvents.editProject();




// this only tests to see if there is a value in local storage.  doesn't ensure that the value you access is
if(localStorage.length){
  

  // deleteProject("58c192f9-5be0-4fb1-8b36-d6e0054d04dc", allProjects)


  staticEvents.allBtn(allProjects);
  
  // allProjects.forEach(project => console.log(project))
  allProjects.sort((a, b) => a.name.localeCompare(b.name));


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




















