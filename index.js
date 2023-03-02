function router(routes, cb) {
   if (!routes) return;

   const regex = (path) =>
      new RegExp(
         "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"
      );

   const startRoute = (uri) => {
      if (typeof uri === "string") history.pushState(null, null, uri);

      const params = () => {
         const values = location.pathname.split("/").slice(2);

         const keys = Array.from(match.path.matchAll(/:(\w+)/g)).map(
            (result) => result[1]
         );

         return Object.fromEntries(
            keys.map((key, i) => {
               return [key, values[i].replace(/_/g, " ")];
            })
         );
      };

      const match = routes.filter((route) => {
         let path = regex(route.path);
         return location.pathname.match(path);
      })[0];

      if (match) match.page(params());
      else if (typeof callback === "function") cb();
      else console.log("404 ☛ Page not found!");

      return;
   };

   addEventListener("popstate", startRoute);
   addEventListener("replacestate", startRoute);
   addEventListener("pushstate", startRoute);

   document.body.addEventListener("click", (ev) => {
      const isActive = ev.target.getAttribute("href");
      if (isActive) {
         ev.preventDefault();
         startRoute(isActive);
      }
   });

   startRoute(location.pathname);
}

export default router;

/**
let cmp, params, uri, active;
$: location.pathname, uri = location.pathname, active = uri.split('/')[1] || 'home';

addEventListener('replacestate', track);
addEventListener('pushstate', track);
addEventListener('popstate', track);

const isActive = str => active === str ? 'selected' : ''

function track(obj) {
   uri = obj.state || obj.uri || location.pathname;
   if (window.ga) ga.send('pageview', { dp:uri });
}
 */
