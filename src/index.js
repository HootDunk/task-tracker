import { Todo, Project } from "./logic";

const allProjects = [];
// Test whether local storage has been populated
// if(localStorage.length){
//   console.log(JSON.parse(localStorage.getItem('user')));
// }

// localStorage.setItem("user", JSON.stringify(allProjects));

// create todo items
const todo = new Todo("First Todo Item", "reviewing past concepts to help find the best data structure and relationship", "medium", "12/24/20");
const todo1 = new Todo("Second Todo item", "general description here", "medium", "12/24/20");
const todo2 = new Todo("Third Todo", "idkdidkidkik", "medium", "12/24/20");

// create new project
const project = new Project("Testing...", "A test of the object contstructor");

//add project to allProjects array
allProjects.push(project)


// get todoID for later
const todoID = todo1.id;


project.toggleActive();


project.addTodo(todo);
project.addTodo(todo1);
project.addTodo(todo2);

// console.log(project)
// // console.log(allProjects[0].getTodoItem(todoID))
// console.log(project.deleteTodoItem(todoID))

console.log(project)










