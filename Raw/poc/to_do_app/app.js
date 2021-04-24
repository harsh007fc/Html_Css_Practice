let input  = document.querySelector(".input_box");

let ul = document.querySelector(".task_list")

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
         

        ///event  added to remove a list item
        li.addEventListener("dblclick",function ()
        {
            li.remove();
        })


        li.innerText = task;
        li.setAttribute("class","task");
         //append as a child
        ul.appendChild(li);
        input.value = " ";
    }

    
})