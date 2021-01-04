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
  this.dueDate = dueDate;
}


// retrieves projects from local storage
  // first parses the JSON string into an array of objects
  // then it recreates the objects with object.assign (this re-attaches the prototypes which are lost when saved to local storage)

  // *** need to set all projects to inactive on startup or render the active project
const getProjects = () => {
  if (localStorage.length){
    const assignedObjArr = [];
    const simpleObjArr = JSON.parse(localStorage.getItem('user'))
    simpleObjArr.forEach(item => {
      const copy = Object.assign(new Project, item)
      // set active to false since the app starts with 'All' selected
      copy.active = false;
      assignedObjArr.push(copy)
    })
    return assignedObjArr;
  }
  else {
    return []
  }
}

const allProjects = getProjects();

// module function to house all array methods used on the projects array.
const projectsArray = (() => {

  const addNewProject = (name, description, projArr) => {
    const project = new Project(name, description);
    projArr.push(project)
  }

  const addNewTask = (title, description, priority, dueDate, projArr) => {
    // could always create the date here.
    const task = new Todo(title, description, priority, dueDate);
    // iterate through array, find the active project object
    projArr.forEach((proj) => {
      if(proj.active == true){
        proj.addTodo(task);
      }
    })
  }

  const editTask = (id, editObj, projArr) => {
    const activeProj = getActiveProj(projArr);
    if(activeProj){
      // get the task
      const taskIndex = activeProj.todoList.findIndex(todo => todo.id == id);
      activeProj.todoList[taskIndex].title = editObj.title;
      activeProj.todoList[taskIndex].dueDate = editObj.dueDate;
      activeProj.todoList[taskIndex].priority = editObj.priority;
      activeProj.todoList[taskIndex].description = editObj.description;
    }
    // No active projects (we are in the 'all' tab)
    // search through all projects for the matching task.  
    else{
      for (let i = 0; i < projArr.length; i++){
        for( let q = 0; q < projArr[i].todoList.length; q++){
          if (projArr[i].todoList[q].id == id){
            projArr[i].todoList[q].title = editObj.title;
            projArr[i].todoList[q].dueDate = editObj.dueDate;
            projArr[i].todoList[q].priority = editObj.priority;
            projArr[i].todoList[q].description = editObj.description;
          }
        }
      }
    }
  }

  const toggleTask = (id, projArr) => {
    const activeProj = getActiveProj(projArr);
    if(activeProj){
      // get the task
      const taskIndex = activeProj.todoList.findIndex(todo => todo.id == id);
      activeProj.todoList[taskIndex].complete = !activeProj.todoList[taskIndex].complete;
    }
    // No active projects (we are in the 'all' tab)
    // search through all projects for the matching task.  
    else{
      for (let i = 0; i < projArr.length; i++){
        for( let q = 0; q < projArr[i].todoList.length; q++){
          if (projArr[i].todoList[q].id == id){
            projArr[i].todoList[q].complete = !projArr[i].todoList[q].complete;
          }
        }
      }
    }
  }

  const editProject = (projObj, projArr) => {
    const index = projArr.findIndex(proj => proj.id == projObj.id);
    projArr[index].name = projObj.name;
    projArr[index].description = projObj.description;
  }

  // sets project to active
  const setToActive = (id, projArr) => {
    projArr.forEach(proj => proj.id == id ? proj.active = true : proj.active = false);
  }

  const allToInactive = (projArr) => {
    projArr.forEach(proj => proj.active = false);
  }

  const getActiveProj = (projArr) => {
    return projArr.find(proj => proj.active == true);
  }

  const getActiveIndex = (projArr) => {
    return projArr.findIndex(proj => proj.active == true);
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
    // if there were a ton of tasks it would be better to relate each task to it's project and avoid the nested for-loop.
    else{
      for (let i = 0; i < projArr.length; i++){
        for( let q = 0; q < projArr[i].todoList.length; q++){
          if (projArr[i].todoList[q].id == id){
            return projArr[i].todoList[q];
          }
        }
      }
    }
  }


  return {
    addNewProject,
    setToActive,
    editProject,
    getActiveProj,
    getActiveIndex,
    addNewTask,
    save,
    getTask,
    allToInactive,
    editTask,
    toggleTask,
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
