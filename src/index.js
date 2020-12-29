import { staticEvents, dynamicEvents } from "./events";
import { Todo, Project } from "./logic";
import { renderProjects, renderTasks, tasks}  from "./render";



staticEvents.modalClose();
staticEvents.newProject();
staticEvents.newTask();
staticEvents.allProjects();






// Test whether local storage has been populated
if(localStorage.length){
  const allProjects = JSON.parse(localStorage.getItem('user'))

  console.log(allProjects);
  // allProjects.forEach(project => console.log(project))
  allProjects.sort((a, b) => a.name.localeCompare(b.name));


  renderProjects(allProjects);
  dynamicEvents.projectNames();

  tasks.clear();
  tasks.render(allProjects[0].todoList)
  
  dynamicEvents.editTaskBtns();
  dynamicEvents.expandedTodo();
  dynamicEvents.todoCheckBoxes();
  

}
else {
  console.log("no data found")
}







// // create new project
// let project = new Project("Testing...", "A test of the object contstructor");

// // create todo items
// let todo = new Todo("First Todo Item", "reviewing past concepts to help find the best data structure and relationship", "medium", "12/24/20");
// let todo1 = new Todo("Second Todo item", "general description here", "medium", "12/24/20");
// let todo2 = new Todo("Third Todo", "idkdidkidkik", "medium", "12/24/20");

// project.addTodo(todo);
// project.addTodo(todo1);
// project.addTodo(todo2);

// allProjects.push(project);








// Save
// localStorage.setItem("user", JSON.stringify(allProjects));

// Delete
// localStorage.removeItem("user")


















