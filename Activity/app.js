let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main_container");
let body = document.body;

let plusButton = document.querySelector(".fa-plus");

let colorArr = ["pink","blue","green","black"];



// let removeModalContainer = document.getElementById("removed");

for(let i = 0; i < colorBtn.length; i++)
{
    colorBtn[i].addEventListener("click",function(e)
    {
        let color = colorBtn[i].classList[1];
        mainContainer.style.backgroundColor  = color;
    })
}


// to count clicks so tjhat on odd click display modal

// let count = 0;
// plusButton.onclick = function() {
//   count += 1;
// };


plusButton.addEventListener("click", createModal);


function createModal() {
    let modal_container = document.createElement("div");
    modal_container.setAttribute("class", "modal_container");
    // modal_container.setAttribute("id", "removed");
    modal_container.innerHTML = `<div class="input_container">
    <textarea class="modal_input" placeholder="Enter Your Task"></textarea>
</div>
<div class="modal_filter_container">
    <div class="popup_filter pink"></div>
    <div class="popup_filter blue"></div>
    <div class="popup_filter green"></div>
    <div class="popup_filter black"></div>
</div>`;

    body.appendChild(modal_container);
    
    handleModal(modal_container);
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

            createTask(cColor,textArea.value);
        }

    })
}

function createTask(color,task)
{
    //feature of color change on clicking
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class","task_container");
    taskContainer.innerHTML = ` <div class="task_filter ${color}"></div>
    <div class="task_desc_container" >
        <h3 class="uid">#example</h3>
        <div class="task_desc" contenteditable = "true">${task}</div>
    </div>`;

    mainContainer.appendChild(taskContainer);


    let taskFilter = taskContainer.querySelector(".task_filter");
    // taskFilter.addEventListener("click",function changeColor()
    // { //feature of color changing
    //     let cColor =  taskFilter.classList[1];
    //     let idx = colorArr.indexOf(cColor);
    //     let newColorIdx = (idx +1) % 4;
    //     taskFilter.classList.remove(cColor);
    //     taskFilter.classList.add(colorArr[newColorIdx]);
    // })
    taskFilter.addEventListener("click",changeColor);

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

// let taskFilter = document.querySelectorAll(".task_filter");
