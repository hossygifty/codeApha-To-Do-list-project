const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskPriority = document.getElementById("task-priority");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const clearCompletedBtn = document.getElementById("clear-completed");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add Task
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const date = taskDate.value;
    const priority = taskPriority.value;

    if (text === "") return alert("Please enter a task!");

    tasks.push({ text, date, priority, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
});

// Render Tasks
function renderTasks(filter = "all") {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "incomplete" && task.completed) return;

        const li = document.createElement("li");
        li.className = `priority-${task.priority} ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
            <span>${task.text} (${task.date || "No Due Date"})</span>
            <div>
                <button onclick="editTask(${index})" class="edit-btn">Edit</button>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})" class="delete-btn">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Edit Task
function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText) tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Toggle Completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Save to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Clear Completed Tasks
clearCompletedBtn.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

// Filters
document.getElementById("show-all").addEventListener("click", () => renderTasks("all"));
document.getElementById("show-completed").addEventListener("click", () => renderTasks("completed"));
document.getElementById("show-incomplete").addEventListener("click", () => renderTasks("incomplete"));
