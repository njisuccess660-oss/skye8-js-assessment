/**
 * Skye8 JavaScript Practical Assessment
 * Task 2 - Student Grade Manager
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

const els = {
  form: document.getElementById("student-form"),
  name: document.getElementById("student-name"),
  score: document.getElementById("student-score"),
  list: document.getElementById("student-list"),
  average: document.getElementById("stat-average"),
  highest: document.getElementById("stat-highest"),
  lowest: document.getElementById("stat-lowest"),
  count: document.getElementById("stat-count"),
  empty: document.getElementById("student-empty"),
};

/** @type {{ id: string, name: string, score: number, grade: string }[]} */
let students = [];

// TODO [T2-01]: Derive a letter grade from a numeric score.
// A: 80-100, B: 70-79, C: 60-69, D: 50-59, F: below 50.
function getGrade(score) {
  if(score >= 80 && score <=100){
  return "A";
  }
  if(score >= 70 && score <=79){
  return "B";
  }
  if(score >= 60 && score <=69){
  return "C";
  }
  if(score >= 50 && score <=59){
  return "D";
  }if(score < 50){
  return "F";
  }
}

// TODO [T2-02]: Validate the submitted name and score.
// Reject an empty name, a non-numeric score, a score below 0 and a
// score above 100.
function validateStudent(name, score) {
  let valid = true;
  const errors = {}; 

  if(!name || name.trim() === ""){
    errors.name = "Student's name is empty";
    valid = false;
  }
  const scoreValue = Number(score);

  if(score === "" || score === "" || score === "" ){
    errors.score = "Student's score is empty";
    valid = false;
  } else if(score < 0 || score > 100){
    errors.score = "Score must be between 0 and 100."
    valid = false;
  }
  else if(isNaN(scoreValue)){
    errors.score = " Amount must be a valid score";
    valid = false;
  }
  return { valid: valid, errors: errors };
}

// TODO [T2-03]: Add a validated student to state and re-render.
function addStudent(name, score) {
   const newStudent = {
    id: Date.now().toString,
    name: name,
    score: Number(score)
  }
  students.push(newStudent);
  renderStudents();
  renderStats();
}

// TODO [T2-04]: Remove one student by id and re-render.
function removeStudent(id) {
  students = students.filter(function(student){
   return student.id !== id;
  });

  renderStudents();
  renderStats();
}

// TODO [T2-05]: Calculate class statistics from the students array.
// Return average (one decimal), highest, lowest and count. With zero
// students every stat must be a dash, never NaN.
function calculateStats() {

   if (students.length === 0) {
    return { average: "-", highest: "-", lowest: "-", count: 0 };
  }
  let total = 0;
  let count = students.length;
  let highest = students[0].score;
  let lowest = students[0].score;

   students.forEach(function(student) {
    total += student.score;
    if (student.score > highest) {
      highest = student.score
    };
    if (student.score < lowest){ 
      lowest = student.score
    };
  });
  const average = total / count;

  return {
    average: average.toFixed(1), 
    highest: highest,
    lowest: lowest,
    count: count 
  };
 
}

// TODO [T2-06]: Build the student list from state. Clear it first.
function renderStudents() {
   els.list.textContent = "";
    students.forEach(student => {
    const li = document.createElement("li");
    const textSpan= document.createElement("span");
    textSpan.textContent = `"${student.name}-${student.score}"`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', function(){
     removeStudent(student.id);
    });
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    els.list.appendChild(li);
   });
}

// TODO [T2-07]: Update the statistics display and toggle the empty state.
function renderStats() {
  const stats = calculateStats();

  els.average.textContent = stats.average;
  els.highest.textContent = stats.highest;
  els.lowest.textContent = stats.lowest;
  els.count.textContent = stats.count;

  if(students.length === 0){
   els.empty.classList.remove('hidden');
  } else{
    els.empty.classList.add('hidden');
  }
}

function init() {
  // TODO [T2-08]: Bind the form submit and the delete delegation, then
  // perform the first render.
   // perform the first render.
 renderStats();

 els.form.addEventListener('submit', function(e){
 e.preventDefault();
 const nameValue = els.name.value;
 const scoreValue = els.score.value;

 const validation = validateStudent(nameValue, scoreValue);

 const nameErrorEl = els.name.nextElementSibling;
 const scoreErrorEl = els.score.nextElementSibling;

 if (nameErrorEl) nameErrorEl.textContent = '';
 if (scoreErrorEl) scoreErrorEl.textContent = '';

 if(validation.valid){
  addStudent(nameValue, scoreValue);
  els.form.reset();
 }else{
  if(validation.errors.name && nameErrorEl){
    nameErrorEl.textContent = validation.errors.name;
  }
  if(validation.errors.score && scoreErrorEl){
    scoreErrorEl.textContent = validation.errors.amount;
  }
 }

 });
}

document.addEventListener("DOMContentLoaded", init);
