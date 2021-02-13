# canvas-to-dom

**canvas-to-dom** is an experimental project, which generates DOM from HTML5 canvas through visual inference.
It serves as a demonstration of how computer vision techniques can be applied to automate web animation testing process. 

Library extracts canvas state information from arbitrary frame. It is intended to be used as a testing framework and visualization tool for HTML5 canvas.

## Project Status

This project is currently in development. Users can generate DOM from frames which contain simple geometric shapes.

## Installation

If you use npm,

```shell
$ npm install canvas-to-dom --save-dev 
```

Otherwise, download minifed version from github repository.

canvas-to-dom is written using [ES2015 modules](https://2ality.com/2014/09/es6-modules-final.html). Create custom bundle with webpack. 
You can use configuration given in examples. 

Library is available both for browser and node.

## Quick start

Main library functions:

```javascript
loadCanvasToDom();
canvasToDOM(canvasEl, options);
canvasDOMCompare(canvasEl1, canvasEl2, options);
```

### browser

```html
<canvas id="app"></canvas>
<script>
    loadCanvasToDom().then(() => {
        const dom = canvasToDom("app");
    });
</script>
```
Output format type can be specified with options. Supported output types: JSON, string, document (Document object model). Last one is the default.

Generating information as JSON:
```html
<canvas id="app"></canvas>
<script>
    loadCanvasToDom().then(() => {
        const dom = canvasToDom("app", {
            "type": "json"
        });
    });
</script>
```
To extract information from part of canvas, use options:
```html
<canvas id="app"></canvas>
<script>
    loadCanvasToDom().then(() => {
        const dom = canvasToDom("app", {
            "type": "document",
            "fragment": {
                "x": 100,
                "y": 100,
                "width": 200, 
                "height": 200,
            }
        });
    });
</script>
```
For comparing two different canvas data:
```html
<canvas id="app"></canvas>
<script>
    loadCanvasToDom().then(() => {
        const dom = canvasToDom("app");
        const expected = "<canvas><line center=\"(149.5,149.5)\" point-0=\"(128,129)\" point-1=\"(128,129)\" \
                            color=\"#fefefe\" z-order=\"1\"orientation=\"43.23\"></line></canvas>";
        canvasDOMCompare(dom, expected);
    });
</script>
```
**canvasDOMCompare** function compares all supported types. Given argument can be either canvas element, canvas id or any type of result
generated from **canvasToDom** function.
Using comparator options:
```html
<canvas id="app"></canvas>
<script>
    loadCanvasToDom().then(() => {
        const dom = canvasToDom("app");
        const expected = "<canvas><line center=\"(149.5,149.5)\" point-0=\"(128,129)\" point-1=\"(128,129)\" \
                            color=\"#fefefe\" z-order=\"1\"orientation=\"43.23\"></line></canvas>";
        canvasDOMCompare(dom, expected, {
            "center": {
                "delta": 2 
            },
            "width": {
                "delta": -1
            },
            "height": {
                "delta": 0
            }, 
            "diameter": {
                "delta": 4
            },
            "points": {
                "delta": -3
            },
            "orientation": {
                "delta": 2,
            },
            "color": {
                "precision": "identical",
                "method": "CIE2000"
            },
            "zOrder": {
                "delta": -1
            }
        });
    });
</script>
```
Every property in options can be specified separately. Default values for property delta-s are zeros. 
For color property comparison precision option has five values: `identical`, `close`, `similar`, `distinct` and `opposite`. Supported comparator methods are: `CIE2000`,  `CIE94`,  `CIE76`. `CIE2000` is the default. Default precision option - `identical`.

### node
All the above methods are available in node.

```javascript
import { createCanvasFromImage, installDomParser, loadOpenCV, canvasToDOM } from "../../index.js";
```

```javascript

(async () => {
    await loadOpenCV();

    const canvasEl = createCanvasFromImage("./screenshot.png");
    const dom = canvasToDOM(canvasEl, {
        "type": "json"
    });
})();
```

For generating Document object model from `canvasToDom` use `installDomParser` function.

```javascript

(async () => {
    await loadOpenCV();

    const canvasEl = createCanvasFromImage("./screenshot.png");
    installDomParser();
    const dom = canvasToDOM(canvasEl, {
        "type": "document"
    });
})();
```

It's possible to load dom and opencv.js separately using functions:
```javascript
loadDOM();
loadOpenCV();
```

For more information, see [examples](https://github.com/alexardra/canvas-to-dom/tree/master/examples)

## Licence

This project is licensed under the MIT License.


