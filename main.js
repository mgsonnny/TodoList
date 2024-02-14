//유저가 값을 입력한다.
// +버튼을 클릭하면, 할일이 추가된다.
//유저가 delete 버튼을 클릭하면 할일이 삭제 된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true false 가 바뀐다
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로
// 진행중 완료 탭을 누르면, 언더바가 이동한다.
// 완료탭은, 완료 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click",addTask);

function addTask(){
    
    let task = {
        id: randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    };

    console.log(task.id);

    if(task.taskContent == ""){
        console.log("냉무")
        return
    }
    taskList.push(task);
    // console.log(taskList);
    taskInput.value = ""
    render();
}

function render(){
    let resultHTML = "";
    for (let i = 0; i <taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task2">
        <div class = "task-done">
            ${taskList[i].taskContent}
        </div>
        <div>
            <i class="fa-regular fa-circle-check fa-2xl" onclick="toggleComplete('${taskList[i].id}')"> </i>
            <i class="fa-solid fa-x fa-2xl" onclick="deleteTask('${taskList[i].id}')"></i>
        </div>
    </div>`;
        }else{
            resultHTML += `<div class="task">
        <div>
            ${taskList[i].taskContent}
        </div>
        <div>
            <i class="fa-solid fa-circle-check fa-2xl" onclick="toggleComplete('${taskList[i].id}')"> </i>
            <i class="fa-solid fa-x fa-2xl" onclick="deleteTask('${taskList[i].id}')"></i>
        </div>
    </div>`;
        }

    }

    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id){
    console.log("ID:",id);
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    // console.log(taskList);

}

function deleteTask(id){
    for(let i=0;i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    render();

}


function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 16);
}