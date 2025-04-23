const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskInput = document.getElementById("task-input");
  const taskTime = document.getElementById("task-time");
  const taskPriority = document.getElementById("task-priority");

  const taskText = taskInput.value.trim();
  const deadline = taskTime.value;
  const priority = taskPriority.value;
  const addedTime = new Date().toLocaleString();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = `
    <div class="task-info">
      <strong>${taskText}</strong>
      <div class="task-priority">Priority: ${priority}</div>
      <small>🕒 Added: ${addedTime}</small>
      ${deadline ? `<small>⏰ Due: ${new Date(deadline).toLocaleString()}</small>` : ''}
    </div>
    <div class="task-buttons">
      <button onclick="markComplete(this)">✅</button>
      <button onclick="editTask(this)">✏️</button>
      <button onclick="deleteTask(this)">🗑️</button>
    </div>
  `;

  taskList.prepend(li);
  taskInput.value = "";
  taskTime.value = "";
  taskPriority.value = "Low";
});

function markComplete(btn) {
  btn.closest(".task").classList.toggle("completed");
}

function deleteTask(btn) {
  const task = btn.closest(".task");
  task.style.opacity = "0";
  setTimeout(() => task.remove(), 300);
}

function editTask(btn) {
  const taskInfo = btn.closest(".task").querySelector("strong");
  const currentText = taskInfo.textContent;
  const newText = prompt("Edit task:", currentText);
  if (newText) taskInfo.textContent = newText;
}
