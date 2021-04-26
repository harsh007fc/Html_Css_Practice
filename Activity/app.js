let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main_container");
let body = document.body;

let plusButton = document.querySelector(".fa-plus");

for(let i = 0; i < colorBtn.length; i++)
{
    colorBtn[i].addEventListener("click",function(e)
    {
        let color = colorBtn[i].classList[1];
        mainContainer.style.backgroundColor  = color;
    })
}


plusButton.addEventListener("click", function () {
    let modal_container = document.createElement("div");
    modal_container.setAttribute("class", "modal_container");
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
})












{/* <div class="modal_container">
    <div class="input_container">
        <textarea class="modal_input" placeholder="Enter Your Task"></textarea>
    </div>
    <div class="modal_filter_container">
        <div class="popup_filter pink"></div>
        <div class="popup_filter blue"></div>
        <div class="popup_filter green"></div>
        <div class="popup_filter black"></div>
    </div>
</div> */}
