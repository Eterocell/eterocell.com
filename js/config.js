if(!window.NexT)window.NexT={};(function(){const e="next-config";const t={};let n={};const o=e=>JSON.parse(e||"{}");const i=i=>{const c=document.querySelector(`.${e}[data-name="${i}"]`);if(!c)return;const r=o(c.text);if(i==="main"){Object.assign(t,r)}else{n[i]=r}};i("main");window.CONFIG=new Proxy({},{get(e,o){let c;if(o in t){c=t[o]}else{if(!(o in n))i(o);c=n[o]}if(!(o in e)&&typeof c==="object"){e[o]={}}if(o in e){const t=e[o];if(typeof t==="object"&&typeof c==="object"){return new Proxy({...c,...t},{set(e,n,o){e[n]=o;t[n]=o;return true}})}return t}return c}});document.addEventListener("pjax:success",(()=>{n={}}))})();