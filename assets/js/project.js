const buttons =
document.querySelectorAll(
".filter button"
);


const projects =
document.querySelectorAll(
".project-item"
);



buttons.forEach(btn=>{


btn.onclick=()=>{


buttons.forEach(b=>
b.classList.remove("active")
);


btn.classList.add("active");



let filter =
btn.dataset.filter;



projects.forEach(project=>{


if(
filter==="all" ||
project.dataset.category===filter
){

project.style.display="grid";


}

else{


project.style.display="none";


}



});


};



});