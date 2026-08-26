# Skye8 - JavaScript Practical Assessment

Starter repository for the Skye8 frontend internship practical assessment.

Maintainer: Engr. Lionel A.
Assessment ID: SKY8-JSA-001 (Final JS Assessment)

---

## 1. What this is

A single hosted application containing five independent JavaScript
applications, reachable from one dashboard. You fork this repository,
implement all five tasks, host the result, and open one pull request.

Reference deployment: `<pending>`

The assessment measures your command of vanilla JavaScript. It measures
nothing else. There is no framework, no build step and no package manager,
and adding one is a failure condition rather than a bonus.

## 2. What you must not use

React, Vue, Angular, Svelte, jQuery, Alpine, Bootstrap, Tailwind, any CSS
framework, any bundler, any npm dependency, any `AI-generated code`.

You may use anything the browser gives you natively.

## 3. The five tasks

| #   | Task                            | Focus                                 | Folder    |
| --- | ------------------------------- | ------------------------------------- | --------- |
| 1   | Interactive Expense Calculator  | Functions, events, DOM, validation    | `task-1/` |
| 2   | Student Grade Manager           | Arrays, objects, derived statistics   | `task-2/` |
| 3   | Persistent To-Do Application    | CRUD, state, localStorage             | `task-3/` |
| 4   | Product Search, Filter and Sort | Array method composition              | `task-4/` |
| 5   | Interactive Sales Dashboard     | Aggregation and data-driven rendering | `task-5/` |

Each folder carries its own README with the acceptance criteria for that task.
Read it before you start that task.

## 4. What is provided for you

You are not starting from an empty folder. The following is already done, and
you should build on it rather than replace it:

- `index.html`, the assessment dashboard, complete and working.
- `assets/css/style.css`, a finished design system with every component the
  five tasks need. You are not being marked on reinventing CSS.
- `assets/js/shell.js`, the shared page shell.
- Each `task-N/index.html`, a complete accessible page skeleton with the form
  markup, the output containers and the empty state already in place.
- Each `task-N/task-N.js`, a stub file with the function contract and numbered
  TODO markers.
- `task-4/data.js` and `task-5/data.js`, fixed datasets so that every
  submission is graded against identical data.

**The element ids and the function names in the stubs are a contract.** The
grading rubric references them directly. Extend them freely, but do not rename
them.

## 5. What you must build

Everything marked `// TODO [Tn-nn]`. There are 45 of them across the five
tasks. Nothing else in the repository is deliberately incomplete.

Beyond the TODOs, you own:

- All application logic and state handling.
- All dynamic rendering. Nothing that varies at runtime may be hardcoded in
  HTML.
- All validation and user feedback.
- Any additional markup your features need.
- Any styling extensions, using the existing tokens.

## 6. Running locally

This is a static site, but `localStorage`, module scoping and relative paths
behave differently over `file://`. Serve it.

```bash
# VS Code: install Live Server, right click index.html, Open with Live Server
```

Then open `http://localhost:5500`. Or whatever `PORT` your app runs on.

## 7. Task specific instructions

### Task 1 - Interactive Expense Calculator

Build in `task-1/`. Seven TODOs.

The user enters an expense name and an amount, adds it, sees it listed, sees a
running total, and can delete any row.

Requirements:

1. Every expense is a JavaScript object with `id`, `name` and `amount`. The
   list is an array of those objects.
2. The list is rendered from the array. No expense row is written into
   `index.html`.
3. The total is calculated on demand from the array. It is never stored in a
   variable that you update by hand, and never read back out of the DOM.
4. The total and the count update automatically on every add and every delete.
5. Validation, with a message in the correct `.field-error` element:
   empty name, empty amount, non-numeric amount, zero, negative.
6. Deleting the last expense returns the page to the empty state.

Submit-blocking: a hardcoded total, or a total read from `textContent`.

### Task 2 - Student Grade Manager

Build in `task-2/`. Eight TODOs.

The user enters a student name and a score out of 100, adds the student, and
sees the class statistics recalculate.

Requirements:

1. Every student is an object with at least `id`, `name`, `score` and `grade`.
2. The grade is derived from the score by a single function. Use this band:
   `A` 80 to 100, `B` 70 to 79, `C` 60 to 69, `D` 50 to 59, `F` below 50.
3. Class average, highest score, lowest score and total students are all
   derived from the array on every render. None of them may be hardcoded, and
   none may be maintained as a running counter.
4. The average is displayed to one decimal place.
5. Validation: empty name, non-numeric score, score below 0, score above 100.
6. With zero students, every statistic reads as a dash and the empty state
   shows. It must not read `NaN`.

Submit-blocking: `NaN` visible anywhere, or statistics that drift after a
delete.

### Task 3 - Persistent To-Do Application

Build in `task-3/`. Ten TODOs.

Full CRUD with three filters, and the data survives a refresh.

Requirements:

1. Every task is an object with at least `id`, `text`, `completed` and
   `createdAt`.
2. Add, toggle complete, toggle back to pending, and delete.
3. Three filters: all, pending, completed. The active filter is visibly
   active and carries `aria-pressed="true"`.
4. Three counters: total, completed, pending. Derived, never incremented.
5. Persistence through `localStorage` under the key `skye8.task3.todos`, using
   `JSON.stringify` on save and `JSON.parse` on load.
6. The load must be wrapped in `try/catch`. Corrupt or absent stored data must
   produce an empty list, not a thrown error.
7. The cycle is: load state, mutate state, save state, re-render. Never mutate
   the DOM and the storage independently.
8. Empty task text is rejected. Whitespace-only text is empty.
9. The filter selection is a view concern. Filtering must not delete data.

Submit-blocking: data lost on refresh, or a counter that disagrees with the
list.

### Task 4 - Product Search, Filter and Sort

Build in `task-4/`. Nine TODOs.

Requirements:

1. Use the provided `PRODUCTS` dataset in `task-4/data.js`. Eighteen products,
   six categories. You may add to it. You may not shrink it and you may not
   mutate it.
2. Render every product card from the dataset. No product card is written into
   `index.html`.
3. Search by product name, case insensitive, matching partial input, updating
   as the user types.
4. Filter by category, including an `All categories` option.
5. Filter by price band.
6. Sort by price ascending and descending.
7. Search, filter and sort must **compose**. Searching for a term, then
   choosing a category, then sorting, must apply all three at once. Applying
   one must not reset the others.
8. A live count of visible products.
9. A distinct empty state when the combination matches nothing, naming what was
   searched or filtered.

Use `filter`, `map`, `sort` and `find` where they genuinely fit. Do not force
them in. Note that `sort` mutates: sort a copy.

Submit-blocking: a filter that resets the search, or a sort that permanently
reorders the source dataset.

### Task 5 - Interactive Sales Dashboard

Build in `task-5/`. Eleven TODOs. This is the heaviest task and it carries the
most marks.

Requirements:

1. Use the provided `SALES` dataset in `task-5/data.js`. Thirty records across
   three months. Same rules as task 4: extend yes, shrink no, mutate no.
2. Six KPIs, every one of them derived, none of them hardcoded:
   total revenue, order count, total units sold, average order value,
   best-selling product by units, best-selling category by revenue.
3. Revenue for a record is `quantity * price`. Average order value is total
   revenue divided by order count.
4. A dynamic table of the sales records, built from the dataset.
5. Search, category filter and sorting, composing exactly as in task 4.
6. **The KPIs must recalculate against the filtered set, not the full
   dataset.** Filtering to one category must show that category's revenue.
   This is the single most common failure in this task.
7. An empty state for the table and safe KPI values when nothing matches. No
   `NaN`, no `Infinity`.
8. Currency formatted consistently. `Intl.NumberFormat` is available to you.
9. Responsive: the table scrolls inside `.table-wrap` on mobile rather than
   overflowing the page.

Optional, marked as additional features rather than requirements: date range or
monthly filtering, a category summary breakdown, a CSS-only bar visualisation.
Attempt these only once every requirement above is correct.

Submit-blocking: KPIs that ignore the active filters.

## 8. Cross-cutting requirements

These apply to all five tasks and are marked on every one of them.

- **Console.** Zero errors and zero warnings on load and during normal use.
- **Responsiveness.** Usable at 360px, 768px and 1280px. No horizontal
  overflow, no button escaping its container, no unreadable text.
- **Accessibility.** Every input has a bound `<label>`. Actions are `<button>`
  elements, never clickable `<div>` elements. Focus is visible. Validation
  messages are announced through `role="alert"`.
- **Architecture.** Named functions with single responsibilities. Data
  processing separated from DOM rendering. No 200-line function. No
  `doStuff()`, `process()`, `thing()` or `function1()`.
- **Safety.** Never inject unescaped user input through `innerHTML`. Use
  `textContent`, or create elements.
- **Cleanliness.** No dead code, no unused variables, no commented-out
  experiments, no leftover `console.log`.
- **Navigation.** Every task page returns to the dashboard, and every dashboard
  card opens its task.

## 9. How to submit

Read `CONTRIBUTING.md` for the full workflow. In summary:

1. Fork this repository to your own GitHub account.
2. Clone your fork and create the branch `assessment/<your-github-username>`.
3. Implement the tasks, committing in meaningful slices as you go. One commit
   containing the entire assessment is marked down.
4. Test everything, on desktop and on a narrow viewport, with the console open.
5. Deploy your fork to Netlify, Vercel or GitHub Pages.
6. Verify the deployed site: open the hosted URL, click into all five tasks,
   and use each one.
7. Add the verified hosted URL to the `Live application` section of your fork's
   README.
8. Open **one** pull request from
   `<your-username>:assessment/<your-username>` into this repository's `main`,
   and fill in the pull request template completely.

One pull request. Not five. The five tasks are tracked as issues; the pull
request is the submission.

## 10. Deadline and marking

Your supervisor sets the deadline when the assessment is issued. The rubric,
the weights and the automatic-fail conditions are in `GRADING.md`. Read it
before you start, not after you finish.

## 11. Getting help

Ask. Being stuck is expected and is not held against you. Silently submitting
something that does not run is.

What you may not do is submit code you cannot explain. You will be asked to
walk through your task 5 aggregation logic live.

---

## Live application

https://animated-douhua-7e9e14.netlify.app/

---

Skye8 - JavaScript Practical Assessment - SKY8-JSA-001
Maintainer: Engr. Lionel A.
