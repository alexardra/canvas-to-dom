# canvas-to-dom-assets-generator 

Helper package for generating assets for [canvas-to-dom](https://github.com/alexardra/canvas-to-dom) in node.


## Installation

```shell
$ npm install --save canvas-to-dom-assets-generator
```

## Quick start

```javascript
const assetsGenerator = require("canvas-to-dom-assets-generator");

assetsGenerator({
    "url": "http://localhost:3000",
    "selector": "canvas",
    "frame": "1",
    "outputDir": "/home/user/Desktop/"
})
```
**Use with cli**
```javascript
assetsGenerator()
```
or
```javascript
assetsGenerator({
    "cli": true
})
```
```bash
node example.js url=http://localhost:3000 frame=1 outputDir=/home/user/Desktop/
```

## Examples

**Use canvas id selector**
```javascript
assetsGenerator({
    "url": "http://localhost:3000",
    "selectorId": "app",
    "frame": "1",
    "outputDir": "/home/user/Desktop/",
    "outputFrameName": "frame1.png"
})
```
**Use canvas class selector**
```javascript
assetsGenerator({
    "url": "http://localhost:3000",
    "selectorCls": "app",
    "frame": "1",
    "outputDir": "/home/user/Desktop/"
})
```
**Use with default options**
```javascript
assetsGenerator({
    "url": "http://localhost:3000"
})
```
Default options:
* selector: **canvas**
* frame: **0**
* outputFrameName: **screenshot.png**
* outputDir: **current directory**

