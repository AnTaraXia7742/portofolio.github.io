const items =
document.querySelectorAll(".reveal");


const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(
(entry)=>{


if(entry.isIntersecting){

entry.target.classList.add(
"show"
);

}


});

},
{
threshold:.2
}
);



items.forEach(
(item)=>observer.observe(item)
);