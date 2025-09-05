let todoList = [];
let currentFilter = "all"; // default

function validateInput() {
    const todoInput = document.getElementById('todo-input').value;
    const todoDateInput = document.getElementById('todo-date-input').value;

    if (todoInput === '' || todoDateInput === '') {
        alert('Please fill in both the task and due date.');
    } else {
        addTodo(todoInput, todoDateInput);
    }
}

function addTodo(todo, dueDate) {
    const todoItem = {
        task: todo,
        dueDate: dueDate,
        completed: false
    };

    todoList.push(todoItem);
    renderTodoList();
    showNotification("Task added successfully!", "success");
}

function deleteAllTodo() {
    if (todoList.length === 0) {
        showNotification("No tasks to delete.", "error");
        return;
    }
    todoList = [];
    renderTodoList();
    showNotification("All tasks deleted!", "info");
}

function toggleComplete(index) {
    todoList[index].completed = !todoList[index].completed;
    renderTodoList();
    showNotification(todoList[index].completed ? "Task marked as done!" : "Task undone!", "info");
}

function deleteTodo(index) {
    const deletedTask = todoList[index].task;
    todoList.splice(index, 1);
    renderTodoList();
    showNotification(`Task "${deletedTask}" deleted!`, "error");
}


function filterTodo() {
    const filterSelect = document.getElementById("filter-select");
    currentFilter = filterSelect.value;
    renderTodoList();
}

function renderTodoList() {
    const todoListContainer = document.getElementById('todo-list');
    todoListContainer.innerHTML = '';

    // filter list berdasarkan pilihan
    let filteredList = todoList.filter(item => {
        if (currentFilter === "active") return !item.completed;
        if (currentFilter === "completed") return item.completed;
        return true; // all
    });

    if (filteredList.length === 0) {
        todoListContainer.innerHTML = `<p class="text-gray-500">No tasks available.</p>`;
        return;
    }

    filteredList.forEach((item, index) => {
        todoListContainer.innerHTML += `
            <div class="flex justify-between items-center border-b py-2">
                <span>${item.task} - Due: ${item.dueDate}</span>
                <div>
                    <button class="bg-green-500 text-white px-2 py-1 mx-1"
                        onclick="toggleComplete(${index});">
                        ${item.completed ? "Undo" : "Done"}
                    </button>
                    <button class="bg-red-500 text-white px-2 py-1 mx-1"
                        onclick="deleteTodo(${index});">Delete</button>
                </div>
            </div>
        `;
    });
}

function showNotification(message, type = "success") {
    const notif = document.getElementById("notification");
    notif.innerText = message;

    // ganti warna berdasarkan type
    notif.className = `fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white hidden`;
    if (type === "success") notif.classList.add("bg-green-500");
    if (type === "error") notif.classList.add("bg-red-500");
    if (type === "info") notif.classList.add("bg-blue-500");

    notif.classList.remove("hidden");

    // otomatis hilang setelah 2 detik
    setTimeout(() => {
        notif.classList.add("hidden");
    }, 2000);
}

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");

// cek apakah user pernah simpan tema di localStorage
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️ Light";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "🌙 Dark";
        localStorage.setItem("theme", "light");
    }
});
