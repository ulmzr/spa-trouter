const { transform } = require("esbuild");

module.exports = {
   input: "src/index.js",
   output: [
      {
         file: "./index.js",
      },
   ],
   plugins: [minify()],
};

function minify() {
   return {
      name: "minify",
      async transform(code) {
         let result = await transform(code, {
            minify: true,
         });
         return { code: result.code };
      },
   };
}
