'use strict'; //global wale mein error deta hai
let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main_container");
let body = document.body;

let crossBtn = document.querySelector(".fa-times");

let plusButton = document.querySelector(".fa-plus");

let colorArr = ["pink","blue","green","black"];

let deleteState = false;

let taskArr = [];

if(localStorage.getItem("allTask"))
{
   let taskArr =  JSON.parse(localStorage.getItem("allTask"));
   for(let i = 0; i < taskArr.length; i++)
   {
       let {id,color,task} = taskArr[i];
       createTask(color,task,false,id );
   }
}

crossBtn.addEventListener("click",setDeleteState);


// let removeModalContainer = document.getElementById("removed");

for(let i = 0; i < colorBtn.length; i++)
{
    colorBtn[i].addEventListener("click",function(e)
    {
        let color = colorBtn[i].classList[1];
        mainContainer.style.backgroundColor  = color;
    })
}

plusButton.addEventListener("click", createModal);

function createModal() {

    let modalContainer = document.querySelector(".modal_container");
    if(modalContainer == null)
    {
          modalContainer = document.createElement("div");
         modalContainer.setAttribute("class", "modal_container");
    // modal_container.setAttribute("id", "removed");
    modalContainer.innerHTML = `<div class="input_container">
    <textarea class="modal_input" placeholder="Enter Your Task"></textarea>
</div>
<div class="modal_filter_container">
    <div class="popup_filter pink"></div>
    <div class="popup_filter blue"></div>
    <div class="popup_filter green"></div>
    <div class="popup_filter black"></div>
</div>`;

    body.appendChild(modalContainer);
    handleModal(modalContainer);
    }
    let textarea = modalContainer.querySelector(".modal_input");
    textarea.value = "";

    
    
    // handleModal(modalContainer);
};

function handleModal(modal_container)
{
    let cColor = "black";
    let modalFilters = document.querySelectorAll(".popup_filter");
    modalFilters[3].classList.add("border");
    

    for(let i = 0 ; i < modalFilters.length; i++ )
    {
        modalFilters[i].addEventListener("click",function()
        {  //removeborder frok all elements
            modalFilters.forEach((filter)=>{
                filter.classList.remove("border");
            })
            modalFilters[i].classList.add("border");
            cColor = modalFilters[i].classList[1];
        })
    }


    let textArea = document.querySelector(".modal_input");

    textArea.addEventListener("keydown",function(e)
    {
        if(e.key == "Enter" && textArea.value != "")
        {
            console.log("Task",textArea.value, " color",cColor);

            //remove modal
            modal_container.remove();

            createTask(cColor,textArea.value,true);
        }

    })
}

function createTask(color,task,flag,id)
{
    //   Instantiate id 
      let uidFn =  new ShortUniqueId();

      let uid = id || uidFn();
    //feature of color change on clicking
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class","task_container");
    taskContainer.innerHTML = ` <div class="task_filter ${color}"></div>
    <div class="task_desc_container" >
        <h3 class="uid">${uid}</h3>
        <div class="task_desc" contenteditable = "true">${task}</div>
    </div>`;

    mainContainer.appendChild(taskContainer);


    let taskFilter = taskContainer.querySelector(".task_filter");

    if(flag== true)
    {      
        let obj = {"task":task,"id":uid,"color":color};
        taskArr.push(obj);
        let finalArr = JSON.stringify(taskArr);
        localStorage.setItem("allTask",finalArr);
    }
    taskFilter.addEventListener("click",changeColor);

    taskContainer.addEventListener("click",deleteTask);

    let taskDesc = taskContainer.querySelector(".task_desc");

    taskDesc.addEventListener("keypress",editTask);
}

function changeColor(e)
{
    let taskFilter = e.currentTarget;
    let cColor =  taskFilter.classList[1];
    let idx = colorArr.indexOf(cColor);
    let newColorIdx = (idx +1) % 4;
    taskFilter.classList.remove(cColor);
    taskFilter.classList.add(colorArr[newColorIdx]);
}

function setDeleteState(e)
{
    let crossBtn = e.currentTarget;
    let parent = crossBtn.parentNode;
    
    if(deleteState == false)
    {
        parent.classList.add("active");
    }
    else
    {
        parent.classList.remove("active");
    }
    deleteState = !deleteState;
}

function deleteTask(e)
{
    let taskContainer = e.currentTarget;
    if(deleteState)
    {
        let uidElem = taskContainer.querySelector(".uid");
        let uid = uidElem.innerText;

        for(let i = 0; i < taskArr.length; i++)
        {
            let {id} = taskArr[i];
            if(id == uid)
            {
                taskArr.splice(i,1);
                let finalTaskArr = JSON.stringify(taskArr);
                localStorage.setItem("allTask",finalTaskArr); 
                taskContainer.remove();
                break;
            }
        }
    }
}

function editTask(e){
    let taskDesc = e.currentTarget;
    let uidElem = taskDesc.parentNode.children[0];
    let uid = uidElem.innerText;

        for(let i = 0; i < taskArr.length; i++)
        {
            let {id} = taskArr[i];
            if(id == uid)
            {
                taskArr[i].task = taskDesc.innerText;
                let finalTaskArr = JSON.stringify(taskArr);
                localStorage.setItem("allTask",finalTaskArr); 
                taskContainer.remove();
                break;
            }
        }
}