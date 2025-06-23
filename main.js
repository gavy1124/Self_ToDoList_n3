let input = document.getElementById("input");
let addBtn = document.getElementById("addBtn");
// let taskArea = document.getElementById("taskArea")
let taskList = []
let list = [];
let mode = 'all';
let filterList = [];

addBtn.addEventListener("click", add);
input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        add();
    }
})
input.addEventListener("click", function () {
    input.value = "";
});



let menus = document.querySelectorAll(".taskTabs div:not(#underLine)");


menus.forEach(key => key.addEventListener("click", (e) => {
    filter(e);
    indicator(e);
}
));

function indicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}














// function indicator(e){
//     underLine.style.left = e.currentTarget.offsetLeft + "px";
//     underLine.style.width = e.currentTarget.offsetWidth + "px";
//     underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
// }



function filter(e){
    
    // mode = e.currentTarget.id;
    mode = typeof e === 'string' ? e : e.target.id;

    filterList = [];

    for (let i = 0; i < taskList.length; i++) {
        if(mode == 'all'){
            render();
        }else if(mode == 'onGoing'){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
            console.log('onGoing')
        }else if(mode == 'done'){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            
            }
        }        
    }
    
    
    console.log(filterList);
    render();
}









function add() {
    let inputText = input.value;

    let task = {
        id: generationID(),
        content: input.value,
        isComplete: false,
    };

    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    
    let resultHTML = ``;

    if(mode == 'all'){
        list = taskList;
    }else if(mode == 'onGoing' || mode == 'done'){
        list =  filterList;
    }




    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `
                           <div class="task">
                               <div class="taskDone">${list[i].content}</div>
                               <div>
                                   <button onclick="check('${list[i].id}')">Check</button>
                                   <button onclick="del('${list[i].id}')">Delete</button>
                               </div>
                           </div>
                           `;
        } else {
            resultHTML += `
                           <div class="task">
                               <div>${list[i].content}</div>
                               <div>
                                   <button onclick="check('${list[i].id}')">Check</button>
                                   <button onclick="del('${list[i].id}')">Delete</button>
                               </div>
                           </div>
                           `;
        }
    }

    document.querySelector(".taskArea").innerHTML = resultHTML;
}

function check(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    console.log(taskList);
    render();
}

function del(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    console.log('모드',mode)
    // render();
    filter(mode);
}

function generationID() {
    return Math.random().toString(36).substr(2, 16);
}
