# SPA Router for Malinajs

Very simple and limited SPA router, build for [Malinajs](https://malinajs.github.io/docs/). Possible use for vanilajs web application.

_Example for use:_

**Script section.**

```js
import Router from "malinajs-trouter";
import Home from "./Home.xht";
import E404 from "./E404.xht";

let cmp, params, uri, active;
$: location.pathname,
   () => {
      uri = location.pathname;
      active = uri.split("/")[1] || "home";
   };

function run(comp, obj) {
   params = obj;
   if (typeof comp === "function") cmp = comp;
   else
      comp.then((module) => {
         cmp = module.default;
      });
}

Router(
   [
      {
         path: "/",
         page: () => run(Home),
      },
      {
         path: "/posts",
         page: () => run(import("./Posts.xht")),
      },
      {
         path: "/post/:id/:comments",
         page: (obj) => run(import("./Article.xht"), obj),
      },
   ],
   () => run(E404)
);
```

**HTML section.**

```html
<Navbar {active} />

{#if cmp}
<component:cmp {params} />
{/if}
```
