//define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
  //DOM load event 
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //clear task event
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks
  filter.addEventListener('keyup', filterTask);

}

//get tasks from Ls
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //create li elements
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i> ';
    //append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  });

}

//add task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }

  //create li elements
  const li = document.createElement('li');
  li.className = 'collection-item';
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class = "fa fa-remove"></i> ';
  //append the link to li
  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);

  
//store task to local storage
storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = '';

  e.preventDefault();
}


//store task to local storage
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

//remove task from LS

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You sure?')){
      e.target.parentElement.parentElement.remove();

      //remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }   
  } 
}

//remove from localstorage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTasks(){
  //low speed
  //taskList.innerHTML = '';

  //faster way 
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  //clear from ls
  clearTasksFromlocalStorage();
}

//clear from ls
function clearTasksFromlocalStorage(){
  localStorage.clear();
}


//filter task
function filterTask(e){
 const text = e.target.value.toLowerCase();
 document.querySelectorAll('.collection-item').forEach(function(task){
  const item = task.firstChild.textContent;
  if(item.toLowerCase().indexOf(text) != -1){
    task.style.display = 'block';
  }else{
    task.style.display = 'none';
  }
 });

}