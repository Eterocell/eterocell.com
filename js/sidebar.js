document.addEventListener("DOMContentLoaded",(()=>{const e="right"===CONFIG.sidebar.position;({mouse:{},init(){window.addEventListener("mousedown",this.mousedownHandler.bind(this)),window.addEventListener("mouseup",this.mouseupHandler.bind(this)),document.querySelector(".sidebar-dimmer").addEventListener("click",this.clickHandler.bind(this)),document.querySelector(".sidebar-toggle").addEventListener("click",this.clickHandler.bind(this)),window.addEventListener("sidebar:show",this.showSidebar),window.addEventListener("sidebar:hide",this.hideSidebar)},mousedownHandler(e){this.mouse.X=e.pageX,this.mouse.Y=e.pageY},mouseupHandler(e){var i=e.pageX-this.mouse.X,d=e.pageY-this.mouse.Y;(Math.hypot(i,d)<20&&e.target.matches(".main")||e.target.matches("img.medium-zoom-image"))&&this.hideSidebar()},clickHandler(){document.body.classList.contains("sidebar-active")?this.hideSidebar():this.showSidebar()},showSidebar(){document.body.classList.add("sidebar-active");const i=e?"fadeInRight":"fadeInLeft";document.querySelectorAll(".sidebar .animated").forEach(((e,d)=>{e.style.animationDelay=100*d+"ms",e.classList.remove(i),setTimeout((()=>{e.classList.add(i)}))}))},hideSidebar(){document.body.classList.remove("sidebar-active")}}).init()}));