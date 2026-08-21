/**
 * Skye8 JavaScript Practical Assessment
 * Task 1 - Interactive Expense Calculator
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

const els = {
  form: document.getElementById("expense-form"),
  name: document.getElementById("expense-name"),
  amount: document.getElementById("expense-amount"),
  list: document.getElementById("expense-list"),
  total: document.getElementById("expense-total"),
  count: document.getElementById("expense-count"),
  empty: document.getElementById("expense-empty"),
};

/** @type {{ id: string, name: string, amount: number }[]} */
let expenses = [];

// TODO [T1-01]: Validate the submitted name and amount.
// Reject an empty name, an empty amount, a non-numeric amount and any
// amount that is zero or negative. Return a result object the caller can
// use to populate the field-error elements.
function validateExpense(name, amount) {
  const errors = {};
  let valid = true;
if(!name || name.trim() === ""){
  errors.name = 'Expense name is empty';
  valid = false;
}
 const numericAmount = Number(amount);
 if(amount === "" || amount === null || amount === undefined){
  errors.amount = "Amount is empty";
  valid = false;
 } else if( isNaN(numericAmount)){
  errors.amount = " Amount must be a valid number";
  valid = false;
 } else if (numericAmount <= 0){
  errors.amount = "Amount must be greater than zero";
  valid = false;
 }

  return { valid: valid , errors: errors };
  
}

// TODO [T1-02]: Add a validated expense to state and re-render.
function addExpense(name, amount) {
  const newExpense = {
    id: Date.now().toString,
    name: name,
    amount: Number(amount)
  }
  expenses.push(newExpense);
  renderExpenses();
  renderSummary();
}

// TODO [T1-03]: Remove one expense by id and re-render.
function removeExpense(id) {
  expenses = expenses.filter(function(expense){
  return expense.id !== id;
  });
  renderExpenses();
  renderSummary();
  }


// TODO [T1-04]: Sum the amounts. Must be derived, never stored.
function calculateTotal() {
  let total = 0;
  expenses.forEach(function(expense){
    total += expense.amount;
  });
  return total;
}

// TODO [T1-05]: Build the list from state. Clear it first. No innerHTML
// concatenation of unescaped user input.
function renderExpenses() {
  els.list.textContent = "";
  expenses.forEach(function(expense){

  const li = document.createElement('li');
  const textSpan = document.createElement('span');
  textSpan.textContent = `${expense.name} - ${expense.amount.toFixed(2)}`;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', function(){
    removeExpense(expense.id);
  });
  li.appendChild(textSpan);
  li.appendChild(deleteBtn);

  els.list.appendChild(li);
   });
}

// TODO [T1-06]: Toggle the empty state and refresh the total and count.
function renderSummary() {
  const totalAmount = calculateTotal();
  els.total.textContent = `${totalAmount.toFixed(2)}`;
  els.count.textContent = expenses.length;

  if(expenses.length === 0){
   els.empty.classList.remove('hidden');
  } else{
    els.empty.classList.add('hidden');
  }
}

function init() {
  // TODO [T1-07]: Bind the form submit and the delete delegation, then
  // perform the first render.
 renderSummary();
 els.form.addEventListener('submit', function(e){
 e.preventDefault();
 const nameValue = els.name.value;
 const amountValue = els.amount.value;

 const validation = validateExpense(nameValue, amountValue);
 const nameErrorEl = els.name.nextElementSibling;
 const amountErrorEl = els.amount.nextElementSibling;

 if(nameErrorEl) nameErrorEl.textContent = '';
 if(amountErrorEl) amountErrorEl.textContent = '';

 if(validation.valid){
  addExpense(nameValue, amountValue);
  els.form.reset();
 }else{
  if(validation.errors.name && nameErrorEl){
    nameErrorEl.textContent = validation.errors.name;
  }
  if(validation.errors.amount && amountErrorEl){
    amountErrorEl.textContent = validation.errors.amount;
  }
 }

 });
}

document.addEventListener("DOMContentLoaded", init);
