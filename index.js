
//loading html components
var createButton = document.querySelector('#createButton');
var cancelButton = document.querySelector('.cancelButton');
var deleteButton = document.querySelector('.deleteButton');
var editButton = document.querySelector('.editButton');

//array to storage and enumerate tasks
var tasks = [];

const openForm = (type, form, action, taskName='', taskDescription='') => {
    form.setAttribute('id', 'confirmationWindow');
    form.setAttribute('class', 'confirmationWindow');

    const formContent = `
    <form id="form" class="form">
    <h3 class="formTitle">${type} new task</h2>
    <label for="task">Task</label>
    <input id="task" type="text" value="${taskName}">
    <label for="description">Description</label>
    <textarea id="description" type="text">${taskDescription}</textarea>
    <div class="buttonContainer">
    <button type="button" id="confirmFormButton" onclick="cancelTask()" class="button cancelButton">Cancel</button>
    <button type="button" id="cancelFormButton" onclick="${action}" class="button confirmButton">Confirm</button>
    </div>
    </form>`

    //puts the template string form into the form section
    form.innerHTML = formContent;
    
}

createButton.addEventListener('click', () => {
    //validating id there is a form created
    if (!document.getElementById('confirmationWindow')) {
        
        //creating form
        const form = document.createElement('section');
        openForm('Create', form, 'confirmTask()');

        //append data form to main container
        var main = document.querySelector('.main')
        main.appendChild(form);
    }

})

buildTask = (taskName, taskDescription) => {
    
    //create task JSON object
    const task = {
        taskId: tasks.length+1,
        taskName,
        taskDescription
    }

    //return task object armed
    return task;
}
createTask = (task) => {
    //validate if the fields are not empty
    if (task.taskName != '' && task.taskDescription != '') {
        //include the task into task list
        tasks.push(task);
        closeForm()
    } else {
        //alerts if there is missing information  on the form fields
        alert('Must fill all the fields')
    }
}
const confirmTask = () => {
    //extracting task data from html
    const taskName = document.querySelector('#task').value;
    const taskDescription = document.querySelector('#description').value;
    //building task with html element data
    createTask(buildTask(taskName, taskDescription));
    updateList()
}

//cancels the task creation when form is opened
const cancelTask = () => {
    closeForm();
}

//remove all the form elements from the html
const closeForm = () => {
    const form = document.querySelector('#confirmationWindow')
    form.remove()
}

//updates the main task list every time it is invoked
const updateList = () => {

    //gets the task list from the html
    const taskList = document.querySelector('.list');
    taskList.innerHTML = '';
    //runs every task on the array
    tasks.forEach(task => {
        //adds a task to the task list
        taskList.innerHTML += `
    <div class="task" id="${task.taskId}">
        <h3 class="task-title">${task.taskName}</h3>
        <p class="descriptionTitle">Description</p>
        <p class="descriptionText">${task.taskDescription}</p>
        <div class="centered">
            <button class="button deleteButton" onclick="removeTask(event)">Delete</button>
            <button class="button editButton" onclick="editForm(event)">Edit</button>
        </div>
    </div>
    `
    });
}


//removes a task from the list
const removeTask = ({path}) =>{
    //gets the id number from the element destructuring the html element path
    const taskId = path[2].id;
    tasks.forEach((task, index) => {
        //runs over every task in the array so it finds the one that matches and removes the item from the array
        if(taskId == task.taskId){
            delete tasks[index] 
        }
    });

    //finally updates the form so the delete is reflected on the list
    updateList();
}

const editForm = ({path}) =>{
    //enables the task editing form
    if (!document.getElementById('confirmationWindow')) {
        //selecting form
        const form = document.createElement('section');
        var taskId = '';
        var taskName = '';
        var taskDescription = ''

        //gets task name and description from the current element
        const matchId = path[2].id
        tasks.forEach((task, index) => {
            if(matchId == task.taskId){
                taskId = index
                taskDescription = task.taskDescription
                taskName = task.taskName
            }
        });
        //opens edit form
        openForm('Edit', form, `updateTask(${taskId})` ,taskName, taskDescription);

        //append data form to main container
        var main = document.querySelector('.main')
        main.appendChild(form);
    }
}

//updates task with the id provided
const updateTask = (taskId) => {
    taskId +=1
    tasks.forEach((task) => {
        if(taskId == task.taskId){
            //after matching the task according the id provided it assigns the upadted values from the fields present on the form
            const taskName = document.querySelector('#task').value;
            const taskDescription = document.querySelector('#description').value;
            task.taskName = taskName;
            task.taskDescription = taskDescription
            //closes the form
            closeForm();
            //updates the tasks list
            updateList();
        }
    });

}