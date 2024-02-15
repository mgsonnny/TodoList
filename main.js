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
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let mode = 'all'
let underLine = document.getElementById("under-line");

console.log(tabs);

addButton.addEventListener("click",addTask);

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)});
}

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
    //1. 내가 선택한 탭에 따라서 리스트를 달리 보여준다.
    // all taskList
    // ongoing done filterList
    let list=[]
    if(mode === "all"){
        // taskList
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        // filterList
        list = filterList
    }
    let resultHTML = "";
    for (let i = 0; i <list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task2">
        <div class = "task-done">
            ${list[i].taskContent}
        </div>
        <div>
            <i class="fa-regular fa-circle-check fa-2xl" onclick="toggleComplete('${list[i].id}')"> </i>
            <i class="fa-solid fa-x fa-2xl" onclick="deleteTask('${list[i].id}')"></i>
        </div>
    </div>`;
        }else{
            resultHTML += `<div class="task">
        <div>
            ${list[i].taskContent}
        </div>
        <div>
            <i class="fa-solid fa-circle-check fa-2xl" onclick="toggleComplete('${list[i].id}')"> </i>
            <i class="fa-solid fa-x fa-2xl" onclick="deleteTask('${list[i].id}')"></i>
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
    filter();
    // render();
    // console.log(taskList);

}

function deleteTask(id){
    for(let i=0;i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
        
    }

    filter();
    // render();
}

function filter(event){
    // console.log("filter", event.target.id);
    
    if(event){
        mode = event.target.id;
        underLine.style.left = event.currentTarget.offsetLeft + "px";
        underLine.style.width = event.currentTarget.offsetWidth + "px";
        underLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
    }

    filterList = [];
    if(mode === "all"){
        //전체 리스트를 보여준다
        render();
    }else if(mode === "ongoing"){
        //진행중인 아이템을 보여준다
        //task.isComplete=false
        for(let i=0; i< taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        
        // console.log("진행중", filterList)
    }else if(mode === "done"){
        //끝나는 케이스를 보여준다
        //task.isComplete=true
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        
    }
    render();
}


function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 16);
}