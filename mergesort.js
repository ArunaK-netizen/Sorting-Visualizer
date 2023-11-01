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
        await new Promise(resolve => setTimeout(resolve, 3));
        let tempHeight = a.style.height;
        a.style.height = b.style.height;
        b.style.height = tempHeight;

        var first = a.className;
        var second = b.className;
        a.className = second;
        b.className = first;
        
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
    
    async function mergesort(){
        
        async function merge(children,l,m,r){
            var n1 = m - l + 1;
            var n2 = r - m;

            var L = new Array(n1);
            var R = new Array(n2);

            for(var i=0;i<n1;i++){
                L[i] = parseInt(children[l+i].classList[1]);
            }
            for(var j=0;j<n2;j++){
                R[j] = parseInt(children[m+1+j].classList[1]);
            }

            var i=0;
            var j=0;
            var k=l;

            while(i<n1 && j<n2){
                
                if(L[i]<R[j]){
                    
                    children[k].className = "num "+L[i].toString();
                    updateheight(children[k])
                    
                    i++;
                    await new Promise(resolve => setTimeout(resolve, 3));

                }
                else{
                    children[k].className = "num "+ R[j].toString();
                    updateheight(children[k]);

                    j++;

                    
                }
                children[k].classList.add("current");
                await new Promise(resolve => setTimeout(resolve, 3));
                children[k].classList.remove("current");
                k++;
                await new Promise(resolve => setTimeout(resolve, 3)); 
                

                
            }

            while(i<n1){
                children[k].className = "num "+L[i].toString();
                updateheight(children[k]);
                i++;
                children[k].classList.add("current");
                await new Promise(resolve => setTimeout(resolve, 3));
                children[k].classList.remove("current");
                k++;
                await new Promise(resolve => setTimeout(resolve, 3)); 

            }
            while(j<n2){
                children[k].className = "num "+R[j].toString();
                updateheight(children[k]);
                children[k].classList.add("current");
                await new Promise(resolve => setTimeout(resolve, 3));
                children[k].classList.remove("current");
                j++;
                k++;
                await new Promise(resolve => setTimeout(resolve, 3)); 

            }
            sorted = true;
            

            
        }
        async function partition(children, l, r){
            if(l>=r){
                return;
            }
            var m = l + parseInt((r-l)/2);
            await partition(children,l,m);
            await partition(children,m+1,r);
            await merge(children,l,m,r);
            
        }
        
        if(sorted==false){
            sort.textContent = "Stop";
            document.getElementById("randomize").style.textDecoration = "none";
            sort.addEventListener("click",(e)=>{
                location.reload();
            });
            
            
        }
        
        await partition(children, 0, children.length-1);
        
        
        if (sorted) {
            
            sort.textContent = "Try Again!";
            sort.style.width = "fit-content";
            document.getElementById("randomize").disabled = true;
            document.getElementById("myRange").disabled = true;

            sort.addEventListener("click",(e)=>{
                location.reload();
            });
            
        }

        

        
    }
   

    sort.addEventListener("click",(e)=>{

        mergesort();
        document.getElementById("randomize").disabled = true;
        document.getElementById("myRange").disabled = true;
        document.getElementById("randomize").style.textDecoration = "line-through";
        

    });
    
    
    
});

