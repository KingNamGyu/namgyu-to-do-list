let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
  console.log(tabs);
}
function enterkey() {
  if (window.event.keyCode == 13) {
    
    addTask();
  }
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  if (document.getElementById("task-input", "add-button").value == "") {
    alert("할일을 입력하세요");
    return;
  }
  if (task == 1) {
    task = 1;
    return true;
  } else {
    alert("지금 처리중입니다. 잠시만 기다려 주세요.");
    taskList.push(task);
    console.log(taskList);
    document.getElementById("task-input", "add-button").value = "";
    render();
    return false;
  }
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task task-done" id="${list[i].id}">
        <span>${list[i].taskContent}</span>
        <div class="button-box">
        <button class="reply" onclick="toggleComplete('${list[i].id}')"><i class="fas fa-reply icon-button"></i></button>
        <button class="trash" onclick="deleteTask('${list[i].id}')"><i class="fas fa-trash icon-button"></i></button>
        </div>
       </div>`;
    } else {
      resultHTML += `<div class="task" id="${list[i].id}" >
      <span>${list[i].taskContent}</span>  
      <div class="button-box">  
      <button class="reply" onclick="toggleComplete('${list[i].id}')"><i class="fas fa-check icon-button"></i></button>
      <button class="trash" onclick="deleteTask('${list[i].id}')"><i class="fas fa-trash icon-button"></i></button>
      </div>
  </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  document.getElementById("under-line").style.width =
    event.target.offsetWidth + "px";
  document.getElementById("under-line").style.top =
    event.target.offsetTop + event.target.offsetHeight + "px";
  document.getElementById("under-line").style.left =
    event.target.offsetLeft + "px";
  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
  console.log(filterList);
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
