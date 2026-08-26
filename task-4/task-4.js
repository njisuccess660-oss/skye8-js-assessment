/**
 * Skye8 JavaScript Practical Assessment
 * Task 4 - Product Search, Filter and Sort
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * The PRODUCTS dataset is loaded from data.js. Do not mutate it.
 * sort() mutates: sort a copy.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

var els = {
  search: document.getElementById("product-search"),
  category: document.getElementById("category-filter"),
  price: document.getElementById("price-filter"),
  sort: document.getElementById("sort-select"),
  grid: document.getElementById("product-grid"),
  count: document.getElementById("product-count"),
  empty: document.getElementById("product-empty"),
};

// TODO [T4-01]: Filter the dataset by search term. Case insensitive,
// partial match on the product name. Return a new array.
function applySearch(products, term) {
  if(!term || term.trim() === ""){
     return products;
  }
 const cleanTerm = term.toLowerCase().trim();
 return products.filter(function(product){
 return product.name.toLowerCase().includes(cleanTerm);
 });
}

// TODO [T4-02]: Filter the dataset by category and by price band.
// Return a new array. An empty category or price value means "all".
function applyFilters(products, category, priceBand) {
  let filtered = products;
  if(category && category !== "all" && category !== ""){
    filtered = filtered.filter(function(product){
      return product.category === category;
    });
  }
  if(priceBand && priceBand !== "all" && priceBand !== ""){
    filtered = filtered.filter(function(product){
      if(priceBand === "under-50000"){
        return product.price < 50000;
      }
      if(priceBand === "50000-250000"){
        return product.price >=50000 && product.price <=250000;
      }
      if(priceBand === "over-250000"){
        return product.price > 250000;
      }
      return true;
    });
  }
  return filtered;
}

// TODO [T4-03]: Sort a copy of the array by price ascending or
// descending. An empty sort value returns the array unchanged.
// Never mutate the input array.
function applySort(products, sortValue) {
  const secureCopy = [...products];
  if (sortValue === "price-asc"){
    return secureCopy.sort(function(a, b){
      return a.price - b.price;
    });
  }
  if(sortValue === "price-desc"){
    return secureCopy.sort(function(a,b){
      return b.price - a.price;
    });
  }
  return secureCopy;
}

// TODO [T4-04]: Compose search, filter and sort into a single
// pipeline. Read the current control values and return the
// filtered, sorted array.
function getVisible() {
  let result = PRODUCTS;
  result = applySearch(result, els.search.value);
  result = applyFilters(result, els.category.value, els.price.value);
  result = applySort(result, els.sort.value);
  return result;
}

// TODO [T4-05]: Render a single product card. Return a DOM element.
// No innerHTML concatenation of unescaped user input.
function createProductCard(product) {
  var card = document.createElement("article");
  card.classList.add("product-card");
  var title = document.createElement("h3");
  title.textContent = product.name;
  var price = document.createElement("p");
  price.textContent = `${product.price.toFixed(2)}`;
  
  card.appendChild(title);
  card.appendChild(price);

  return card;
}

// TODO [T4-06]: Render the product grid from the visible set.
// Clear it first.
function renderProducts(products) {
  els.grid.textContent = '';
  products.forEach(function(product){
    const productCard = createProductCard(product);
    els.grid.appendChild(productCard);
  });
}

// TODO [T4-07]: Update the visible count display.
function renderCount(count) {
  els.count.textContent = count;

}

// TODO [T4-08]: Toggle the empty state based on visible products.
function renderEmptyState(count) {
  if(count === 0){
    els.empty.classList.remove("hidden");
  } else {
    els.empty.classList.add("hidden");
  }
}

function init() {
  // TODO [T4-09]: Bind search, filter and sort controls, then
  // perform the first render.
  function handleControlChange(){
    const visibleProducts = getVisible();
    renderProducts(visibleProducts);
    renderCount(visibleProducts.length);
    renderEmptyState(visibleProducts.length);
  }
  els.search.addEventListener("input", handleControlChange);
  els.category.addEventListener("change", handleControlChange);
  els.price.addEventListener("change", handleControlChange);
  els.sort.addEventListener("change", handleControlChange);

  handleControlChange
}

document.addEventListener("DOMContentLoaded", init);
