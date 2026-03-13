// Greeting and Time
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const greetingText = document.getElementById('greeting-text');
    
    if (hour < 12) {
        greetingText.textContent = 'Good Morning Arya';
    } else if (hour < 18) {
        greetingText.textContent = 'Good Afternoon Arya';
    } else {
        greetingText.textContent = 'Good Evening Arya';
    }
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    document.getElementById('current-time').textContent = timeString;
    document.getElementById('current-date').textContent = dateString;
}

// Focus Timer
let timerInterval = null;
let timeLeft = 25 * 60;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer-display').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('start-btn').addEventListener('click', () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert('Focus session complete!');
            }
        }, 1000);
    }
});

document.getElementById('stop-btn').addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timeLeft = 25 * 60;
    updateTimerDisplay();
});

// To-Do List
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.done ? ' done' : '');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => toggleTask(index));
        
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;
        
        const editBtn = document.createElement('button');
        editBtn.className = 'task-edit';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTask(index));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(index));
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

document.getElementById('add-task-btn').addEventListener('click', () => {
    const input = document.getElementById('task-input');
    const text = input.value.trim();
    
    if (text) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push({ text, done: false });
        saveTasks(tasks);
        input.value = '';
    }
});

document.getElementById('task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('add-task-btn').click();
    }
});

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks[index].done = !tasks[index].done;
    saveTasks(tasks);
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const newText = prompt('Edit task:', tasks[index].text);
    
    if (newText !== null && newText.trim()) {
        tasks[index].text = newText.trim();
        saveTasks(tasks);
    }
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.splice(index, 1);
    saveTasks(tasks);
}

// Quick Links
function loadLinks() {
    const links = JSON.parse(localStorage.getItem('links') || '[]');
    const linkList = document.getElementById('link-list');
    linkList.innerHTML = '';
    
    links.forEach((link, index) => {
        const div = document.createElement('div');
        div.className = 'link-item';
        
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.className = 'link-btn';
        a.textContent = link.name;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'link-remove';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => deleteLink(index));
        
        div.appendChild(a);
        div.appendChild(removeBtn);
        linkList.appendChild(div);
    });
}

function saveLinks(links) {
    localStorage.setItem('links', JSON.stringify(links));
    loadLinks();
}

document.getElementById('add-link-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('link-name');
    const urlInput = document.getElementById('link-url');
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    
    if (name && url) {
        const links = JSON.parse(localStorage.getItem('links') || '[]');
        links.push({ name, url });
        saveLinks(links);
        nameInput.value = '';
        urlInput.value = '';
    }
});

function deleteLink(index) {
    const links = JSON.parse(localStorage.getItem('links') || '[]');
    links.splice(index, 1);
    saveLinks(links);
}

// Initialize
updateGreeting();
updateTime();
updateTimerDisplay();
loadTasks();
loadLinks();

setInterval(updateTime, 1000);
setInterval(updateGreeting, 60000);
