function router(routes, callback, err) {
   if (!routes) return $;

   const regex = (path) =>
      new RegExp(
         "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"
      );

   const start = (uri) => {
      if (typeof uri === "string") history.pushState(null, null, uri);

      const params = () => {
         const values = location.pathname.split("/").slice(2);

         let obj = {};
         for (let i = 0; i < values.length; i++) {
            obj[`\$${i + 1}`] = values[i];
         }

         return obj;
      };

      const match = routes.filter((route) => {
         let path = regex(route.path);
         return location.pathname.match(path);
      })[0];

      if (match) {
         new Promise((resolve) => {
            match.page.then((m) =>
               resolve(
                  callback({
                     cmp: m.default,
                     params: params(),
                  })
               )
            );
         });
      } else if (typeof err === "object") {
         new Promise((resolve) => {
            err.then((m) =>
               resolve(
                  callback({
                     cmp: m.default,
                  })
               )
            );
         });
      } else if (typeof err === "function") {
         callback({
            cmp: err,
         });
      } else console.log("404 ☛ Page not found!");

      return;
   };

   addEventListener("popstate", start);
   addEventListener("replacestate", start);
   addEventListener("pushstate", start);

   document.body.addEventListener("click", (ev) => {
      const isActive = ev.target.getAttribute("href");
      if (isActive) {
         ev.preventDefault();
         start(isActive);
      }
   });

   start(location.pathname);
}

export default router;
