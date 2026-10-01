
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll("[data-choice]").forEach(group=>{
    group.querySelectorAll(".choice").forEach(btn=>btn.addEventListener("click",()=>{
      group.querySelectorAll(".choice").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
    }));
  });
  const menu=document.querySelector(".menu"),nav=document.querySelector(".navlinks");
  if(menu&&nav)menu.addEventListener("click",()=>{nav.style.display=nav.style.display==="flex"?"none":"flex";nav.style.position="absolute";nav.style.top="68px";nav.style.left="14px";nav.style.right="14px";nav.style.padding="18px";nav.style.background="white";nav.style.border="1px solid #e1e6df";nav.style.borderRadius="18px";nav.style.flexDirection="column"});
  document.querySelectorAll("[data-water]").forEach(b=>b.addEventListener("click",()=>{
    const e=document.querySelector("[data-water-value]");if(!e)return;
    let v=Math.min(3,parseFloat(e.dataset.value)+parseFloat(b.dataset.water));e.dataset.value=v.toFixed(1);e.textContent=v.toFixed(1)+" L / 3.0 L";
  }));
});
