# eleventy-less-boilerplate

Build LESS with an 11ty transform. The magic happens in `.eleventy.js` and `src/pages/_less.liquid`.

Also includes a very basic Gulp clean process.


## Install
Requires Node 10+ (for 11ty)
```
npm ci
```


## Build
```
npm run build
```
builds to `_site`


## Dev
```
npm run dev
```
spins up http://localhost:8080 and watches for changes


## Clean
```
npm run clean
```
removes 11ty build folder, automatically run before `dev` and `build`
