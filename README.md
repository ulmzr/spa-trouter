# SPA Router for Malinajs

Very simple and limited SPA router, build for [Malinajs](https://malinajs.github.io/docs/). Perhaps, it can also be used on other js library/framework.

**Install**

```bash
npm install -D spa-trouter
```

_Example for use:_

**Directory structure**
```
project/
├ src/
│ ├ component/
│ │ └ [your component]
│ ├ module/
│ │ └ [your module / part of pages]
│ ├ pages/
│ │ ├ config
│ │ │ ├ pageIndex.xht or pageIndex.svelte
│ │ │ ├ pages.js
│ │ │ ├ +system.xht or +system.svelte
│ │ │ └ [your pages]
│ │ ├ other-routes
│ │ │ └ ...
│ │ └ [your pages]
│ ├ App.xht or App.svelte
│ └ main.js
├ package.json
└ ...
```
**Script section**

```js
import Router from "spa-trouter";

import Home from "./pages/Home.xht";
import About from "./pages/About.xht";
import Config from "./pages/config/pageIndex.xht";
import Error from "./modules/E404.xht";

let cmp, params, active, uri;

const routes = [
   {
      path: '/',
      page: Home
   },
   {
      path: '/about',
      page: About
   },
   {
      path: '/config/:page',
      page: Config
   }
]

let router = Router(routes, Error, (page, opts) => {
   cmp = page
   params = opts
}).listen()

$onDestroy(() => router.unlisten())

```
**HTML section**

```html
<!-- App.xht or App.svelte -->
<aside>
   <a href="/">Home</a>
   <a href="/about">About</a>
   <a href="/config/system">About</a>
<aside>
<main>
	{#if cmp}
		<component:cmp {params} />
	{/if}
</main>

<!-- pageIndex.xht -->
<script>
	import * as pages from './pages.js';
	export let params = {};
	const page = pages[params.page];
</script>

{#if page}
	<component:page />
{:else}
   ...
{/if}
```
