document.addEventListener("DOMContentLoaded", function () {
    let parent = document.querySelector(".main");
    let slider = document.getElementById("myRange");
    let output = document.getElementById("slidervalue");
    
    let arr;
    updateElements();

    let slider1 = document.getElementById("myRange");


    if (window.innerWidth <= 480) {
        
        slider1.max = 50;
        slider1.value = 25;
        output.innerHTML = slider.value;
    } else {
        
        slider1.max = 100; 
        output.innerHTML = slider.value;
    }

    let factor = 100/slider.value;
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
    function updateElements() {
        
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        
        let slidervalue = parseInt(slider.value);
        
        let factor = 100/slidervalue;
        
        arr = [];
        for(let i=1;i<(slider.value+1)/10;i++){

            arr[i-1] = i;
        }

        
        
        for (let i = 0; i < arr.length; i++) {
            let str = arr[i].toString();
            let html = "<div class='num " + str + "'></div>";
            parent.innerHTML += html;
        }

        children = parent.children;

        for (let i = 0; i < children.length; i++) {
            
            children[i].style.width = (100/slidervalue).toString() + "%";
        
            children[i].style.height = (factor*(i+1)).toString() + "%";
        }
    
        
        output.innerHTML = slidervalue;
    }
    
    
    slider.oninput = function() {
        
        updateElements();
    };
    
    randomize.addEventListener("click",(e)=>{
        arr.sort(() => Math.random() - 0.5);
        let factor = 100/arr.length;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        for (let i = 0; i < arr.length; i++) {
            let str = arr[i].toString();
            
            let html = "<div class='num " + str + "'></div>";
            parent.innerHTML += html;
        }
        let child = parent.children;
        mainElement = parent;
        children = mainElement.children;
        
        for (let i = 0; i < child.length; i++) {
            
            children[i].style.width = (100/slidervalue).toString() + "%";
            
            children[i].style.height = (factor*(parseInt(child[i].classList[1]))).toString() + "%";
        }
    });

    

    async function swapAndAnimate(a, b) {
        a.classList.add("current");
        b.classList.add("current");
        await new Promise(resolve => setTimeout(resolve, 24));
        let tempHeight = a.style.height;
        a.style.height = b.style.height;
        b.style.height = tempHeight;

        var first = a.className;
        var second = b.className;
        a.className = second;
        b.className = first;
        a.classList.remove("current");
        b.classList.remove("current");
        
    }

    async function updateheight(children){
        factor = 100/slider.value;
        let temp =(parseInt(children.classList[1]))*factor;
        
        let height = temp.toString() + "%";

        children.style.height = height;
        
    }
    const learnButton = document.querySelector(".learn-button");
    const learnModal = document.getElementById("learnModal");
    learnModal.style.display = "none";
    const closeLearnModal = document.getElementById("closeLearnModal");
    
    function openLearnModal() {
        const backgroundOverlay = document.createElement("div");
        backgroundOverlay.classList.add("modal-overlay");
        document.body.appendChild(backgroundOverlay);
    
        learnModal.style.display = "flex";
        learnModal.style.justifyContent = "center"; 
        learnModal.style.alignItems = "center";    
        learnModal.addEventListener("click", (e) => {
            if ((e.target === learnModal)) {
                closeLearnModalFunction();
            }
        }); 
    }
    
    function closeLearnModalFunction() {
        learnModal.style.display = "none";
        const backgroundOverlay = document.querySelector(".modal-overlay");
        if (backgroundOverlay) {
            document.body.removeChild(backgroundOverlay);
        }
    }
    
    learnButton.addEventListener("click", openLearnModal);
    
    closeLearnModal.addEventListener("click", closeLearnModalFunction);

    let sorted = false;
    let sort = document.getElementById("sorting");
    sorted = false;
    async function quick() {
        async function quickSort(arr, low, high) {
            if (low < high) {
                let pi = await partition(arr, low, high);
                await quickSort(arr, low, pi - 1);
                await quickSort(arr, pi + 1, high);
            }
        }
    
        async function partition(arr, low, high) {
            let pivot = parseInt(arr[high].classList[1]);
            let i = low - 1;
    
            for (let j = low; j < high; j++) {
                if (parseInt(arr[j].classList[1]) < pivot) {
                    i++;
                    await swapAndAnimate(arr[i], arr[j]);
                }
            }
            
            await swapAndAnimate(arr[i + 1], arr[high]);
            return i + 1;
        }
    
        if (sorted == false) {
            sort.textContent = "Stop";
            document.getElementById("randomize").style.textDecoration = "none";
            sort.addEventListener("click", (e) => {
                location.reload();
            });
    
            
            const sortingPromise = new Promise((resolve) => {
                quickSort(children, 0, children.length - 1).then(() => {
                    resolve();
                });
            });
    
            
            sortingPromise.then(() => {
                sort.textContent = "Try Again!";
                sort.style.width = "fit-content";
                document.getElementById("randomize").disabled = true;
                document.getElementById("myRange").disabled = true;
            });
        }
    }
    
   

    sort.addEventListener("click",(e)=>{

        quick();
        document.getElementById("randomize").disabled = true;
        document.getElementById("myRange").disabled = true;
        document.getElementById("randomize").style.textDecoration = "line-through";
        

    });
    
    
    
});
