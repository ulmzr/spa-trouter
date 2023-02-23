function Router(routes, callback) {
   const pathToRegex = (path) =>
      new RegExp(
         "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"
      );

   const getParams = (match) => {
      const values = location.pathname.split("/").slice(2);
      const keys = Array.from(match.matchAll(/:(\w+)/g)).map(
         (result) => result[1]
      );
      return Object.fromEntries(
         keys.map((key, i) => {
            return [key, values[i].replace(/_/g, " ")];
         })
      );
   };

   const startRoute = () => {
      let match = routes.filter((route) => {
         return location.pathname.match(pathToRegex(route[0]));
      })[0];
      if (match) {
         match[1](getParams(match[0]));
      } else {
         if (typeof callback === "function") {
            callback();
         } else {
            console.log(
               "Page you are looking for is not found. Probably was eaten by a snake!"
            );
         }
      }
   };

   const navigateTo = (uri) => {
      history.pushState(null, null, uri);
      startRoute();
   };

   navigateTo(location.pathname);

   addEventListener("popstate", startRoute);
   addEventListener("replacestate", startRoute);
   addEventListener("pushstate", startRoute);
   addEventListener("popstate", startRoute);

   document.body.addEventListener("click", (ev) => {
      ev.preventDefault();
      const isActive = ev.target.getAttribute("href");
      if (isActive) {
         navigateTo(isActive);
      }
   });

   return;
}

module.exports = Router;

/**
let cmp, params, uri, active;
$: location.pathname, uri = location.pathname, active = uri.split('/')[1] || 'home';

addEventListener('replacestate', track);
addEventListener('pushstate', track);
addEventListener('popstate', track);

const isActive = str => active === str ? 'selected' : ''
 */
