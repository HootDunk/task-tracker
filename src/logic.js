import { v4 as uuidv4 } from 'uuid';



const getProjects = () => {
  if (localStorage.length){
    return JSON.parse(localStorage.getItem('user'))
  }
  else {
    return []
  }
}

const allProjects = getProjects();

// module function to house all array methods for the projects array
const projectsArray = (() => {

  const addNewProject = (name, description, projArr) => {
    const project = new Project(name, description);
    projArr.push(project)
  }

  const addNewTask = (title, description, priority, dueDate, projArr) => {
    const task = new Todo(title, description, priority, dueDate);

    // iterate through array, find the active project object
    projArr.forEach(proj => {
      if(proj.active == true){
        proj.addTodo(task);

      }
    })
    
  }



  // sets project to active
  const setToActive = (id, projArr) => {
    projArr.forEach(proj => proj.id == id ? proj.active = true : proj.active = false);
  }

  const getActiveProj = (projArr) => {
    return projArr.find(proj => proj.active == true);
  }


  return {
    addNewProject,
    setToActive,
    getActiveProj,
    addNewTask,
  }
})();

const addNewProject = (name, description, projArr) => {
  const project = new Project(name, description);
  projArr.push(project)
}

function Project(name, description) {
  this.id = uuidv4();
  this.name = name;
  this.description = description;
  this.active = false;
  this.todoList = [];
}

Project.prototype.addTodo = function(todo) {
  this.todoList.push(todo);
}

Project.prototype.toggleActive = function(){
  this.active = !this.active;
}

// Project.prototype.getTodoList = function() {
//   return this.todoList;
// }

// This deletes it from the list, what about deleting the todo object?
Project.prototype.deleteTodoItem = function(id) {
  const index = this.todoList.findIndex(item => item.id == id);
  this.todoList.splice(index, 1);
}

Project.prototype.getTodoItem = function(id) {
  return this.todoList.find(item => item.id == id)
}



function Todo(title, description, priority, dueDate) {
  this.id = uuidv4();
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.complete = false;
  this.dueDate = dueDate; // may need to create the date here from the date string
}

Todo.prototype.sayID = function() {
  console.log(this.id)
}

Todo.prototype.toggleComplete = function() {
  this.complete = !this.complete;
}


const deleteProject = (id, allProjects) => {
  const index = allProjects.findIndex(project => project.id == id);
  allProjects.splice(index, 1);
}






export {
  Todo,
  Project,
  deleteProject,
  projectsArray,
  allProjects
}





//Brainstorm UI actions and how they relate to the data

// I click delete from within the edit todo modal.
  /*
    delete button has data-id of that todo item
    find project with status set to active
    iterate through obj.todoList and find the todo item with the matching id
      entire function should be a prototype of the project object as the todo items
      are created inside a function and appended to list.
    delete this todo item (from the list).

    how would this work if all projects are active?
    function should continue going over all active projects and only
    stop execution once the todo item is found.  if active -> enter and search. else next project. only return/halt execution if found.
  */

// On page load / when 'All' projects is clicked
/*
  all projects are set to active.
  call render todos which displays all active project's todos.
  event listener for 'All' will need speacial considerations
*/

// Navigating across projects
/*
  The currently displayed projects id is set to the data-id of the new task button.
  Clicking a new project sets its id to the data-id of the new task button.
*/


// figure out the rendering individual tasks from a project
// first figure out task rendering
// then call task rendering from the proper event.
// re-initialize all dynamic events or create a method for it and call it