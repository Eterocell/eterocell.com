window.NexT||(window.NexT={}),function(){let e={},t={},n=n=>{var o=document.querySelector(`.next-config[data-name="${n}"]`);o&&(o=o.text,o=JSON.parse(o||"{}"),"main"===n?Object.assign(e,o):t[n]=o)};n("main"),window.CONFIG=new Proxy({},{get(o,i){let c;if(c=(i in e?e:(i in t||n(i),t))[i],i in o||"object"!=typeof c||(o[i]={}),i in o){let e=o[i];return"object"==typeof e&&"object"==typeof c?new Proxy({...c,...e},{set:(t,n,o)=>(t[n]=o,e[n]=o,!0)}):e}return c}}),document.addEventListener("pjax:success",(()=>{t={}}))}();