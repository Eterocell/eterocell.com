HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this);this.parentNode.removeChild(this);e.appendChild(this)};(function(){const e=()=>document.dispatchEvent(new Event("page:loaded",{bubbles:true}));if(document.readyState==="loading"){document.addEventListener("readystatechange",e,{once:true})}else{e()}document.addEventListener("pjax:success",e)})();NexT.utils={registerExtURL:function(){document.querySelectorAll("span.exturl").forEach((e=>{const t=document.createElement("a");t.href=decodeURIComponent(atob(e.dataset.url).split("").map((e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2))).join(""));t.rel="noopener external nofollow noreferrer";t.target="_blank";t.className=e.className;t.title=e.title;t.innerHTML=e.innerHTML;e.parentNode.replaceChild(t,e)}))},registerCopyCode:function(){let e=document.querySelectorAll("figure.highlight");if(e.length===0)e=document.querySelectorAll("pre:not(.mermaid)");e.forEach((e=>{e.querySelectorAll(".code .line span").forEach((e=>{e.classList.forEach((t=>{e.classList.replace(t,`hljs-${t}`)}))}));if(!CONFIG.copycode.enable)return;let t=e;if(CONFIG.copycode.style!=="mac")t=e.querySelector(".table-container")||e;t.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');const n=e.querySelector(".copy-btn");n.addEventListener("click",(()=>{const t=e.querySelector(".code")||e.querySelector("code");const o=t.innerText;if(navigator.clipboard){navigator.clipboard.writeText(o).then((()=>{n.querySelector("i").className="fa fa-check-circle fa-fw"}),(()=>{n.querySelector("i").className="fa fa-times-circle fa-fw"}))}else{const e=document.createElement("textarea");e.style.top=window.scrollY+"px";e.style.position="absolute";e.style.opacity="0";e.readOnly=true;e.value=o;document.body.append(e);e.select();e.setSelectionRange(0,o.length);e.readOnly=false;const t=document.execCommand("copy");n.querySelector("i").className=t?"fa fa-check-circle fa-fw":"fa fa-times-circle fa-fw";e.blur();n.blur();document.body.removeChild(e)}}));e.addEventListener("mouseleave",(()=>{setTimeout((()=>{n.querySelector("i").className="fa fa-copy fa-fw"}),300)}))}))},wrapTableWithBox:function(){document.querySelectorAll("table").forEach((e=>{const t=document.createElement("div");t.className="table-container";e.wrap(t)}))},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach((e=>{const t=["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some((t=>e.src.includes(t)));if(t&&!e.parentNode.matches(".video-container")){const t=document.createElement("div");t.className="video-container";e.wrap(t);const n=Number(e.width);const o=Number(e.height);if(n&&o){t.style.paddingTop=o/n*100+"%"}}}))},updateActiveNav:function(){if(!Array.isArray(NexT.utils.sections))return;let e=NexT.utils.sections.findIndex((e=>e&&e.getBoundingClientRect().top>10));if(e===-1){e=NexT.utils.sections.length-1}else if(e>0){e--}this.activateNavByIndex(e)},registerScrollPercent:function(){const e=document.querySelector(".back-to-top");const t=document.querySelector(".reading-progress-bar");window.addEventListener("scroll",(()=>{if(e||t){const n=document.body.scrollHeight-window.innerHeight;const o=n>0?Math.min(100*window.scrollY/n,100):0;if(e){e.classList.toggle("back-to-top-on",Math.round(o)>=5);e.querySelector("span").innerText=Math.round(o)+"%"}if(t){t.style.setProperty("--progress",o.toFixed(2)+"%")}}this.updateActiveNav()}),{passive:true});e&&e.addEventListener("click",(()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})}))},registerTabsTag:function(){document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach((e=>{e.addEventListener("click",(t=>{t.preventDefault();if(e.classList.contains("active"))return;const n=e.parentNode;const o=n.nextElementSibling;o.style.overflow="hidden";o.style.transition="height 1s";const i=o.querySelector(".active")||o.firstElementChild;const c=parseInt(window.getComputedStyle(i).height.replace("px",""),10)||0;const r=parseInt(window.getComputedStyle(i).paddingTop.replace("px",""),10);const s=parseInt(window.getComputedStyle(i.firstElementChild).marginBottom.replace("px",""),10);o.style.height=c+r+s+"px";[...n.children].forEach((t=>{t.classList.toggle("active",t===e)}));const a=document.getElementById(e.querySelector("a").getAttribute("href").replace("#",""));[...a.parentNode.children].forEach((e=>{e.classList.toggle("active",e===a)}));a.dispatchEvent(new Event("tabs:click",{bubbles:true}));const l=document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight);const d=parseInt(window.getComputedStyle(o.querySelector(".active")).height.replace("px",""),10);o.style.height=d+r+s+"px";setTimeout((()=>{if(document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)!==l){o.style.transition="height 0.3s linear";const e=parseInt(window.getComputedStyle(o.querySelector(".active")).height.replace("px",""),10);o.style.height=e+r+s+"px"}setTimeout((()=>{o.style.transition="";o.style.height=""}),250)}),1e3);if(!CONFIG.stickytabs)return;const u=n.parentNode.getBoundingClientRect().top+window.scrollY+10;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:u})}))}));window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){window.addEventListener("message",(({data:e})=>{if(typeof e==="string"&&e.includes("ciu_embed")){const t=e.split(":")[1];const n=e.split(":")[2];document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(n,10)+5+"px"}}),false)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item a[href]").forEach((e=>{const t=e.pathname===location.pathname||e.pathname===location.pathname.replace("index.html","");const n=!CONFIG.root.startsWith(e.pathname)&&location.pathname.startsWith(e.pathname);e.classList.toggle("menu-item-active",e.hostname===location.hostname&&(t||n))}))},registerLangSelect:function(){const e=document.querySelectorAll(".lang-select");e.forEach((e=>{e.value=CONFIG.page.lang;e.addEventListener("change",(()=>{const t=e.options[e.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach((e=>{e.innerText=t.text}));window.location.href=t.dataset.href}))}))},registerSidebarTOC:function(){this.sections=[...document.querySelectorAll(".post-toc:not(.placeholder-toc) li a.nav-link")].map((e=>{const t=document.getElementById(decodeURI(e.getAttribute("href")).replace("#",""));e.addEventListener("click",(n=>{n.preventDefault();const o=t.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:o,complete:()=>{history.pushState(null,document.title,e.href)}})}));return t}));this.updateActiveNav()},registerPostReward:function(){const e=document.querySelector(".reward-container button");if(!e)return;e.addEventListener("click",(()=>{document.querySelector(".post-reward").classList.toggle("active")}))},activateNavByIndex:function(e){const t=document.querySelector(".post-toc:not(.placeholder-toc) .nav");if(!t)return;const n=t.querySelectorAll(".nav-item");const o=n[e];if(!o||o.classList.contains("active-current"))return;const i=n[n.length-1].offsetHeight;t.querySelectorAll(".active").forEach((e=>{e.classList.remove("active","active-current")}));o.classList.add("active","active-current");let c=o.querySelector(".nav-child")||o.parentElement;let r=0;while(t.contains(c)){if(c.classList.contains("nav-item")){c.classList.add("active")}else{r+=i*c.childElementCount+5;c.style.setProperty("--height",`${r}px`)}c=c.parentElement}const s=document.querySelector(CONFIG.scheme==="Pisces"||CONFIG.scheme==="Gemini"?".sidebar-panel-container":".sidebar");if(!document.querySelector(".sidebar-toc-active"))return;window.anime({targets:s,duration:200,easing:"linear",scrollTop:s.scrollTop-s.offsetHeight/2+o.getBoundingClientRect().top-s.getBoundingClientRect().top})},updateSidebarPosition:function(){if(window.innerWidth<1200||CONFIG.scheme==="Pisces"||CONFIG.scheme==="Gemini")return;const e=document.querySelector(".post-toc:not(.placeholder-toc)");let t=CONFIG.page.sidebar;if(typeof t!=="boolean"){t=CONFIG.sidebar.display==="always"||CONFIG.sidebar.display==="post"&&e}if(t){window.dispatchEvent(new Event("sidebar:show"))}},activateSidebarPanel:function(e){const t=document.querySelector(".sidebar-inner");const n=["sidebar-toc-active","sidebar-overview-active"];if(t.classList.contains(n[e]))return;const o=t.querySelector(".sidebar-panel-container");const i=o.firstElementChild;const c=o.lastElementChild;let r=i.scrollHeight;if(e===0){const e=i.querySelector(".nav");if(e){r=parseInt(e.style.getPropertyValue("--height"),10)}}const s=[r,c.scrollHeight];o.style.setProperty("--inactive-panel-height",`${s[1-e]}px`);o.style.setProperty("--active-panel-height",`${s[e]}px`);t.classList.replace(n[1-e],n[e])},getScript:function(e,t={},n){if(typeof t==="function"){return this.getScript(e,{condition:n}).then(t)}const{condition:o=false,attributes:{id:i="",async:c=false,defer:r=false,crossOrigin:s="",dataset:a={},...l}={},parentNode:d=null}=t;return new Promise(((t,n)=>{if(o){t()}else{const o=document.createElement("script");if(i)o.id=i;if(s)o.crossOrigin=s;o.async=c;o.defer=r;Object.assign(o.dataset,a);Object.entries(l).forEach((([e,t])=>{o.setAttribute(e,String(t))}));o.onload=t;o.onerror=n;if(typeof e==="object"){const{url:t,integrity:n}=e;o.src=t;if(n){o.integrity=n;o.crossOrigin="anonymous"}}else{o.src=e}(d||document.head).appendChild(o)}}))},loadComments:function(e,t){if(t){return this.loadComments(e).then(t)}return new Promise((t=>{const n=document.querySelector(e);if(!CONFIG.comments.lazyload||!n){t();return}const o=new IntersectionObserver(((e,n)=>{const o=e[0];if(!o.isIntersecting)return;t();n.disconnect()}));o.observe(n)}))}};