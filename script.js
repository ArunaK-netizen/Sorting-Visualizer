document.addEventListener("DOMContentLoaded", function () {
    let menu = document.getElementById("menu");
    let sidebar = document.querySelector(".sidebar");
    let sortsbutton = document.getElementById("openSidebarButton");
    menu.addEventListener("click", (e)=>{
        e.preventDefault()
        sidebar.style.transform = "translateX(0)";
    })

    let closemenu = document.getElementById("closemenu");
    closemenu.addEventListener("click",(e)=>{
        e.preventDefault()
        sidebar.style.transform = "translateX(-100%)";
    })


    const greets = ["WELCOME"];
    const writing_speed = 150;
    let greetindex = 0;
    let charIndex = 0;
    let greet = document.getElementById("greeting");
    function writing() {
        if (greetindex < greets.length) {
            if (charIndex < greets[greetindex].length) {
                greet.innerHTML += greets[greetindex][charIndex];
                
                charIndex++;
                setTimeout(writing, writing_speed);
            } else {
                greetindex++;
                charIndex = 0;
                setTimeout(writing, writing_speed);
            }
        }
    }
    writing();

    
    sortsbutton.addEventListener("click",(e)=>{
        sidebar.style.transform = "translateX(0)";
    })


    
    
});
