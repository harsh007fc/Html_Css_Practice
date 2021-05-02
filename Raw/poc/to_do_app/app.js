let input  = document.querySelector(".input_box");

let ul = document.querySelector(".task_list")

let arr = [];


if(localStorage.getItem("allTask"))
{
    let stringArr = localStorage.getItem("allTask");
    arr = JSON.parse(stringArr);

    for(let i = 0; i < arr.length; i++)
    {
        let li = document.createElement("li");
        li.innerText = arr[i];
        li.addEventListener("dblclick",function ()
        {
            li.remove();
        })
        li.setAttribute("class","task");
        ul.appendChild(li);
        input.value = " ";
    }
}

input.addEventListener("keydown",function(e)
{
    // console.log("some key was pressed ");
    // console.log("event-->",e);

    if(e.key == "Enter")
    {
        console.log("user want to enter a task");
        let task = input.value;
        console.log(task);

        //create any html elment
        let li = document.createElement("li");
        li.innerText = task;

        if (localStorage.getItem("allTask")) {
            let stringArr = localStorage.getItem("allTask");
            arr = JSON.parse(stringArr);
        }

        arr.push(task);
        let stringArr = JSON.stringify(arr);
        localStorage.setItem("allTask",stringArr);
        ///event  added to remove a list item
        li.addEventListener("dblclick",function ()
        {
            li.remove();
            
        })


        
        li.setAttribute("class","task");
         //append as a child
        ul.appendChild(li);
        input.value = " ";
    }

    
})