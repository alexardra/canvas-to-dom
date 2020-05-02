# Intro

The rules presented here are about keeping the codebase readable and maintainable, 
and give the code a consistent structure as it grows. That helps every contributor to
easily orientate in it.

Moreover, reading this doc helps save everyone's time when it comes to
get a PR reviewed.

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
2. Update the README.md with details of changes to the interface, this includes new environment 
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you 
   do not have permission to do that, you may request the second reviewer to merge it for you.

# Style Guide

## Comments vs. naming

Only use comments for communicating what cannot be conveyed by the code
itself through meaningful variable and function names, and splitting out
logic into separate functions.

**NOTE**: names should be long enough to be meaningful, but not 
ridiculously long.

## Rule - Order of functions in a file

Higher level functions must be placed before lower level functions, and
should be sorted chronologically.

#### Wrong

```javascript
function getInfoAboutA() {
    /* complex code */
    return allInfoAboutA;
}

function getInfoAboutB() {
    /* more complex code */
    return allInfoAboutB;
}

function getInfo() {
    return {
        infoAboutA: getInfoAboutA(),
        infoAboutB: getInfoAboutB()
    };
}
```

#### Correct

```javascript
function getInfo() {
    return {
        infoAboutA: getInfoAboutA(),
        infoAboutB: getInfoAboutB()
    };
}

function getInfoAboutA() {
    /* complex code */
    return allInfoAboutA;
}

function getInfoAboutB() {
    /* more complex code */
    return allInfoAboutB;
}
```

## Rule - Don't repeat yourself

Instead of repeating chunks of code, extract it to a function and 
call it multiple times.

There's no fixed recipe to define what a "repeated chunk of code is", it
really depends on the context. For example, even a couple of lines may
be worth refactoring into a function, especially if they require some
fairly complex error-handling logic.

### Rule - Minimize nesting when possible

#### Wrong

```javascript
function doSomethingMaybe() {
    if (condition) {
        /* do something here */
    }
}
```

#### Correct

```javascript
function doSomethingMaybe() {
    if (!condition) {
        return;
    }
    /* do something here */
}
```

### Rule - Comparisons

Use explicit comparisons, even with `0`, `NULL`, and `undefined`,
instead of relying on language-specific coercion. Only use implicit
for booleans.

#### Wrong

```javascript
if (value) {
  ...
}
```

#### Correct

```javascript
if (value !== 0) {
  ...
}
```


### Rule - Blank Lines

It's encouraged to leave **one** blank line when needing to separate
semantically distinct blocks of code or improve readability.
Just don't abuse that and never leave more than one blank line. 

#### Wrong

```javascript
function one() {
  ...
}


function two() {
  ...
}
```

#### Correct


```javascript
function one() {
  ...
}

function two() {
  ...
}
```


### Rule - Function definitions

Function names must be camelcase, e.g. `drawContours`
**NOTE**: this is true also for arguments and variable names

#### Wrong

```javascript
const get_contour_info = (src_image) => {
    ...
}
```

#### Correct

```javascript
const getContourInfo = (srcImage) => {
    ...
}
```

### Rule - String constants

Don't use single quotes.

#### Wrong

```javascript
throw new Error('Invalid argument');
```

#### Correct

```javascript
throw new Error("Invalid argument");
```

### Rule - Indentation

Indent with 2 spaces.

### Rule - Function curly braces

Curly braces go on the same line of the statement.

#### Wrong

```javascript
if (condition)
{
  ...
}
else
{
  ...
}
```

#### Correct

```javascript
if (condition) {
  ...
} else {
  ...
}
```

### Rule - Semicolons

Treat semicolons as mandatory.

#### Wrong

```javascript
console.log("hello world")
```

#### Correct

```javascript
console.log("hello world");
```

### Rule - Comparisons

Use strict comparisons.

#### Wrong

```javascript
if (methodName == "- init") {
  ...
}
```

#### Correct

```javascript
if (methodName === "- init") {
  ...
}
```

### Rule - ternary operator

Put parenthesis around the ternary comparison condition unless it's
simply referencing a boolean variable.

#### Wrong

```javascript
m = res[0] === "" ? "*" : res[0];
```

#### Correct

```javascript
m = (res[0] === "") ? "*" : res[0];
```

## Spaces

### Rule

Put no spaces between function name and argument list.

#### Wrong

```javascript
function parseExportsFunctionPattern (pattern) {
  var res = pattern.split ("!");
  ...
}
```

#### Correct

```javascript
function parseExportsFunctionPattern(pattern) {
  var res = pattern.split("!");
  ...
}
```

### Rule - Object properties

Reference object properties without quotes when possible.

#### Wrong

```javascript
enumerateMatches("exports:" + obj["module"] + "!" + obj["function"]);
```

#### Correct

```javascript
enumerateMatches("exports:" + obj.module + "!" + obj.function);
```
