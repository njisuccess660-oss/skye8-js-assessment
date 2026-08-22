/**
 * Skye8 JavaScript Practical Assessment
 * Task 3 - Persistent To-Do Application
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

var STORAGE_KEY = "skye8.task3.todos";

var els = {
  form: document.getElementById("todo-form"),
  input: document.getElementById("todo-input"),
  list: document.getElementById("todo-list"),
  filterAll: document.getElementById("filter-all"),
  filterPending: document.getElementById("filter-pending"),
  filterCompleted: document.getElementById("filter-completed"),
  statTotal: document.getElementById("stat-total"),
  statCompleted: document.getElementById("stat-completed"),
  statPending: document.getElementById("stat-pending"),
  empty: document.getElementById("todo-empty"),
};

/** @type {{ id: string, text: string, completed: boolean, createdAt: string }[]} */
var todos = [];

/** @type {"all"|"pending"|"completed"} */
var currentFilter = "all";

// TODO [T3-01]: Load state from localStorage under STORAGE_KEY.
// Parse with JSON.parse inside a try/catch. Corrupt or absent data
// must produce an empty array, never a thrown error.
function loadState() {
  try{
    const rawData = localStorage.getItem(STORAGE_KEY);
    if(!rawData){
      return [];
    }
     const parsed = JSON.parse(rawData);
    if(Array.isArray(parsed)){
      return parsed;
    } else {
      return [];
    }
  } catch(error){
    return [];
  }
}

// TODO [T3-02]: Save the current todos array to localStorage under
// STORAGE_KEY using JSON.stringify.
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// TODO [T3-03]: Validate the submitted text. Reject empty strings and
// whitespace-only strings.
function validateTodo(text) {
  if(!text || text.trim() === ""){
  return { valid: false, error: "Text is not supposed to be empty" };
  }
  return { valid: true, error: ""};
}

// TODO [T3-04]: Add a new task to state, save, and re-render.
function addTodo(text) {
  const newTodo ={
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now()

  };
  todos.push(newTodo);
  saveState();
  renderTodos();
  renderStats();

}

// TODO [T3-05]: Toggle the completed status of a task by id, save,
// and re-render.
function toggleTodo(id) {
  todos = todos.map(function(todo){
    if(todo.id === id){
      if(todo.completed === true){
        todo.completed = false;
      } else{
        todo.completed = true;
      }
      }
      return todo;
  });
  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-06]: Remove a task by id, save, and re-render.
function removeTodo(id) {
  todos = todos.filter(function(todo){
    return todo.id !== id;
  });
  saveState();
  renderTodos();
  renderStats();
}

// TODO [T3-07]: Return the todos that match the current filter.
// "all" returns everything, "pending" returns incomplete tasks,
// "completed" returns completed tasks. Filtering must not delete data.
function getFilteredTodos() {
  if(currentFilter === "pending"){
    return todos.filter(function(todo){
      return todo.completed === false;
    });
  }
  if(currentFilter === "completed"){
    return todos.filter(function(todo){
      return todo.completed === true;
    })
  }
  return todos;
}

// TODO [T3-08]: Build the task list from the filtered state. Clear it
// first. No innerHTML concatenation of unescaped user input.
function renderTodos() {

  els.list.textContent = '';

  
  const filteredList = getFilteredTodos();

 
  filteredList.forEach(function(todo) {
  
    const li = document.createElement('li');
    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    
   
    if (todo.completed) {
      textSpan.style.textDecoration = 'line-through';
    }

   
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = todo.completed;
    if(todo.completed){
       toggleBtn.textContent = 'Mark Pending';
     }
        else {
         toggleBtn.textContent = 'Mark Complete';
        }
  
    toggleBtn.addEventListener('click', function() {
      toggleTodo(todo.id);
     });

    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
      removeTodo(todo.id);
    });

   
    li.appendChild(textSpan);
    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);

   
    els.list.appendChild(li);
  });
}



// TODO [T3-09]: Update the counters and toggle the empty state.
// All counters must be derived from the array, never incremented.
function renderStats() {
  
  const total = todos.length;
  const completed = todos.filter(function(todo) {
    return todo.completed === true;
  }).length;
  const pending = total - completed;


  els.statTotal.textContent = total;
  els.statCompleted.textContent = completed;
  els.statPending.textContent = pending;

 
  if (total === 0) {
    els.empty.classList.remove('hidden');
  } else {
    els.empty.classList.add('hidden');
  }


  els.filterAll.setAttribute('aria-pressed', currentFilter === 'all' ? 'true' : 'false');
  els.filterPending.setAttribute('aria-pressed', currentFilter === 'pending' ? 'true' : 'false');
  els.filterCompleted.setAttribute('aria-pressed', currentFilter === 'completed' ? 'true' : 'false');
}



function init() {
  // TODO [T3-10]: Load state, bind the form submit, bind filter
  // buttons, bind toggle and delete delegation, then perform the
  // first render.

  todos = loadState();

  els.form.addEventListener('submit', function(e) {
    e.preventDefault();
    const inputValue = els.input.value;
    const validation = validateTodo(inputValue);

    if (validation.valid) {
      addTodo(inputValue);
      els.form.reset();
      alert(validation.error);
    }
    
  });

 
  function applyFilter(filterName) {
    currentFilter = filterName;
    renderTodos();
    renderStats();
  }

 
  els.filterAll.addEventListener('click', function() { applyFilter('all'); });
  els.filterPending.addEventListener('click', function() { applyFilter('pending'); });
  els.filterCompleted.addEventListener('click', function() { applyFilter('completed'); });


  renderTodos();
  renderStats();
}



document.addEventListener("DOMContentLoaded", init);
