/**
 * Skye8 JavaScript Practical Assessment
 * Task 5 - Interactive Sales Dashboard
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * The SALES dataset is loaded from data.js. Do not mutate it.
 * sort() mutates: sort a copy.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

var els = {
  search: document.getElementById("sales-search"),
  category: document.getElementById("sales-category"),
  sort: document.getElementById("sales-sort"),
  tableBody: document.getElementById("sales-table-body"),
  kpiRevenue: document.getElementById("kpi-revenue"),
  kpiOrders: document.getElementById("kpi-orders"),
  kpiUnits: document.getElementById("kpi-units"),
  kpiAov: document.getElementById("kpi-aov"),
  kpiTopProduct: document.getElementById("kpi-top-product"),
  kpiTopCategory: document.getElementById("kpi-top-category"),
  empty: document.getElementById("sales-empty"),
};

// TODO [T5-01]: Filter the dataset by search term. Case insensitive,
// partial match on the product name. Return a new array.
function applySearch(records, term) {
  if(!term){
  return records;
  }
  const lowerTerm = term.toLowerCase();
  return records.filter(record=>{
    return record.productName.toLowerCase().includes(lowerTerm);
  });
}

// TODO [T5-02]: Filter the dataset by category. An empty value means
// "all". Return a new array.
function applyFilters(records, category) {
  if(!category){
    return records;
  }
  return records.filter(record=> record.category === category)
}

// TODO [T5-03]: Sort a copy of the array by the selected criterion.
// An empty sort value returns the array unchanged. Never mutate the
// input array.
function applySort(records, sortValue) {
  if(!sortValue){
    return records;
  }
  const recordsCopy = [...records];
  return recordsCopy.sort((a, b)=>{
     if (sortValue === "revenue-desc" || sortValue === "Revenue: high to low") {
      return (b.quantity * b.price) - (a.quantity * a.price);
    }
    if (sortValue === "revenue-asc" || sortValue === "Revenue: low to high") {
      return (a.quantity * a.price) - (b.quantity * b.price);
    }
    if (sortValue === "price-asc"){
      return a.price - b.price;

    }
   if(sortValue === "price-desc"){
    return b.price - a.price;
   }
   if(sortValue === "date-desc"){
    return new Date(b.date)- new Date(a.date);
   }
    if (sortValue === "quantity-desc" || sortValue === "Quantity: high to low") {
      return b.quantity - a.quantity;
    }

   return 0;
});
  }



// TODO [T5-04]: Compose search, filter and sort into a single
// pipeline. Read the current control values and return the filtered,
// sorted array.
function getVisible() {
  const searchTerm = els.search.value;
  const selectedCategory = els.category.value;
  const selectedSort = els.sort.value;

  let results = SALES;
  results = applySearch(results, searchTerm);
  results = applyFilters(results, selectedCategory);
  results = applySort(results, selectedSort);
  return results;
}

// TODO [T5-05]: Calculate total revenue from a set of records.
// Revenue for a record is quantity * price.
function calcRevenue(records) {

  return records.reduce((total, record)=>{
    return total + (record.quantity * record.price);
  },
  0);
}

// TODO [T5-06]: Calculate total units sold from a set of records.
function calcUnits(records) {
  return records.reduce((total, record) =>{
    return total + record.quantity;
  }, 0);
}

// TODO [T5-07]: Find the best-selling product by total units across
// the provided records. Return the product name, or a dash if the
// set is empty.
function findTopProduct(records) {
  if (records.length === 0){
    return "-";
  }
 const productUnits = {};
 records.forEach(record => {
  const name = record.productName;
  productUnits[name]= (productUnits[name] || 0) + record.quantity;
  
 });
 let topProduct = "-";
 let maxUnits = -1;
 for(const name in productUnits){
  if(productUnits[name] > maxUnits){
    maxUnits = productUnits[name];
    topProduct = name;
  }
 }
 return topProduct;
}

// TODO [T5-08]: Find the best-selling category by total revenue
// across the provided records. Return the category name, or a dash
// if the set is empty.
function findTopCategory(records) {
  if(records.length === 0){
      return "-";
  }
const categoryRevenue = {};
records.forEach(record =>{
  const cat = record.category;
  const revenue = record.quantity * record.price;
  categoryRevenue[cat]=(categoryRevenue[cat] || 0) + revenue;
});
let topCategory = "-";
let maxRevenue = -1;
for(const cat in categoryRevenue){
  if(categoryRevenue[cat] > maxRevenue){
    maxRevenue = categoryRevenue[cat];
    topCategory = cat;
  }
}
return topCategory;
}

// TODO [T5-09]: Update all six KPI elements from the visible set.
// KPIs must recalculate against the filtered set, not the full
// dataset. Safe values when nothing matches: no NaN, no Infinity.
function renderKPIs(records) {
  const rev = calcRevenue(records);
  const units = calcUnits(records);
  
  const uniqueOrderIds = new Set();
  records.forEach(record => {
    uniqueOrderIds.add(record.orderId || record.id);
  });
  const orders = uniqueOrderIds.size;
  
  const aov = orders > 0 ? (rev / orders) : 0;

  const topProd = findTopProduct(records);
  const topCat = findTopCategory(records);

  els.kpiRevenue.textContent = `$${rev.toFixed(2)}`;
  els.kpiUnits.textContent = units;
  els.kpiOrders.textContent = orders;
  els.kpiAoV.textContent = `$${aov.toFixed(2)}`;
  els.kpiTopProduct.textContent = topProd;
  els.kpiTopCategory.textContent = topCat;
}



// TODO [T5-10]: Build the table rows from the visible set. Clear
// the table body first. No innerHTML concatenation of unescaped
// user input.
function renderTable(records) {
  els.tableBody.innerHTML = "";
  if (records.length === 0) {
    els.empty.style.display = "block";
    return;
  } else {
    els.empty.style.display = "none";
  }

  records.forEach(record => {
    const tr = document.createElement("tr");
    const formattedPrice = `$${Number(record.price).toFixed(2)}`;
    const formattedTotal = `$${(record.price * record.quantity).toFixed(2)}`;
    const formattedDate = new Date(record.date).toLocaleDateString();

    tr.innerHTML = `
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    `;
    tr.cells[0].textContent = formattedDate;
    tr.cells[1].textContent = record.product;
    tr.cells[2].textContent = record.category;
    tr.cells[3].textContent = record.quantity;
    tr.cells[4].textContent = formattedPrice;
    tr.cells[5].textContent = formattedTotal;
    tr.cells[6].textContent = record.region || "-";

    els.tableBody.appendChild(tr);
  });
}


function init() {
  // TODO [T5-11]: Populate the category dropdown from the dataset,
  // bind search, filter and sort controls, then perform the first
  // render.
  const uniqueCategories = new Set();
  SALES.forEach(record => {
    if (record.category) {
      uniqueCategories.add(record.category);
    }
  });

 
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    els.category.appendChild(option);
  });

  function handleUIChange() {
    const visibleRecords = getVisible();
    renderTable(visibleRecords);
    renderKPIs(visibleRecords);
  }
  els.search.addEventListener("input", handleUIChange);
  
  els.category.addEventListener("change", handleUIChange);
  els.sort.addEventListener("change", handleUIChange);
  handleUIChange();
}
init();



document.addEventListener("DOMContentLoaded", init);
