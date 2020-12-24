// need to know what specific data will be passed in here to finish the function
// if typeof == object else
// or maybe if (obj) else.  if theres a value, else.
const createTaskMarkup = () => {
  /*  
  ** Have this data preparation come from a prior function.
  if(obj){
    let modalTitle = "Edit Task"
    let todoTitle = obj.title
  }
  else {
    let modalTitle = "New Task"
    let todoTitle = ""
  }
  */
  const html = `
  <h1>${modalTitle}</h1>
    <form id="task-form">
      <div class="form-row">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" value="${todoTitle}">
        <label for="due-date">Due Date:</label>
        <input type="date" id="date" name="date" value="${date}">
      </div>
      <div class="form-row">
        <label>Difficulty</label>
      </div>
      <div class="form-row">
        <div class="radio-toolbar">
          <input type="radio" id="radio1" name="radios" value="#F5D346" ${low}>
          <label for="radio1">Low</label>
          <input type="radio" id="radio2" name="radios" value="#D98121" ${medium}>
          <label for="radio2">Medium</label>
          <input type="radio" id="radio3" name="radios" value="#D3151C" ${high}>
          <label for="radio3">High</label>
        </div>
      </div>
        <div class="form-row">
          <label for="description">Description</label>
        </div>
        <div class="form-row">
          <textarea id="description" name="description">${description}</textarea>
        </div>
        <div class="form-row bottom">
          <button type="button">Delete</button>
          <button type="submit">Submit</button>
        </div>
    </form>
  `;
}