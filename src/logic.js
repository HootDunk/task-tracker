import { v4 as uuidv4 } from 'uuid';



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

// Todo.prototype.sayID = function() {
//   console.log(this.id)
// }

// Todo.prototype.toggleComplete = function() {
//   this.complete = !this.complete;
// }



// retrieves projects from local storage
  // first parses the JSON string into an array of objects
  // then it recreates the objects with object.assign (this re-attaches the prototypes which are lost when saved to local storage)
const getProjects = () => {
  if (localStorage.length){
    const assignedObjArr = [];
    const simpleObjArr = JSON.parse(localStorage.getItem('user'))
    simpleObjArr.forEach(item => {
      const copy = Object.assign(new Project, item)
      assignedObjArr.push(copy)
    })
    return assignedObjArr;
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
    projArr.forEach((proj) => {
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

  const save = (projArr) => {
    localStorage.setItem("user", JSON.stringify(projArr));
  }

  const getTask = (id, projArr) => {
    const activeProj = getActiveProj(projArr);
    if(activeProj){
      // find the matching todo in the active project
      return activeProj.todoList.find(todo => todo.id == id);
    }
    // No active projects (we are in the 'all' tab)
    // search through all projects for the matching task.  
    // if there were a ton of tasks it would be better to relate each task to it's project to avoid the nested for loop.
    else{
      for (let i = 0; i < projArr.length; i++){
        for( let q = 0; i < projArr[i].todoList.length; q++){
          if (projArr[i].todoList[q] == id){
            return projArr[i].todoList[q];
          }
          q++;
        }
        i++;
      }
    }
  }


  return {
    addNewProject,
    setToActive,
    getActiveProj,
    addNewTask,
    save,
    getTask,
  }
})();






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