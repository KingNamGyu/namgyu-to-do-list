//유저가 값을 입력한다
// enter키를 누르거나 + 버튼을 클릭하면, 할일이 추가된다, 아무것도 입력을 안했을시 입력하세요 알림창이 뜬다
// delete버튼을 누르면 삭제 확인창이 뜨고 할일이 삭제된다
// 빈 박스를 누르면 할일이 끝나면서 박스안에check표시가 되고 글에 밑줄이 간다
//1. check박스 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남 탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

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
    // 엔터키가 눌렸을 때 실행할 내용
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
  taskList.push(task);
  console.log(taskList);
  document.getElementById("task-input", "add-button").value = "";
  render();
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
      resultHTML += `<div class="task" id="${list[i].id}">
        <div class="div-flex">  
        <button class="check" onclick="toggleComplete('${list[i].id}')"><i class='fas fa-check-circle' style='font-size:20px'></i></button>
        <span class="line-through">${list[i].taskContent}</span>
        </div>
        <div class="button-box">
        <button class="trash" onclick="deleteTask('${list[i].id}')"><i class="fas fa-trash icon-button"></i></button>
        </div>
       </div>`;
    } else {
      resultHTML += `<div class="task" id="${list[i].id}" >
      <div class="div-flex">  
      <button class="check-box" onclick="toggleComplete('${list[i].id}')"></button>
      <span>${list[i].taskContent}</span> 
      </div>
      <div class="button-box">  
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
  let confirm_val = confirm("정말 삭제하시겠습니까?");
  if (confirm_val == true) {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id == id) {
        filterList.splice(i, 1);
        taskList.splice(i, 1);
        break;
      }else{
      }
    }
    render();
  }
   else if (confirm_val == false) {
  }
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  //테스크탭스 라인 스타일
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
