function Router(s,o){const i=e=>new RegExp("^"+e.replace(/\//g,"\\/").replace(/:\w+/g,"(.+)")+"$"),l=e=>{const t=location.pathname.split("/").slice(2),c=Array.from(e.matchAll(/:(\w+)/g)).map(a=>a[1]);return Object.fromEntries(c.map((a,p)=>[a,t[p].replace(/_/g," ")]))},n=()=>{let e=s.filter(t=>location.pathname.match(i(t[0])))[0];e?e[1](l(e[0])):typeof o=="function"?o():console.log("Page you are looking for is not found. Probably was eaten by a snake!");},r=e=>{history.pushState(null,null,e),n();};r(location.pathname),addEventListener("popstate",n),addEventListener("replacestate",n),addEventListener("pushstate",n),addEventListener("popstate",n),document.body.addEventListener("click",e=>{e.preventDefault();const t=e.target.getAttribute("href");t&&r(t);});}module.exports=Router;
