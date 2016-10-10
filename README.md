### In This Documentation
1. [Description](#description)
2. [Browser Support](#browser-support)
3. [Methods](#methods)
4. [Returned object](#returned-object)
5. [Syntax](#syntax)
5. [Implementation](#implementation)
6. [License](#license)

# Description

##### How does **matrixDecoder** work?
MatrixDecoder is fully JavaScript object with a couple of methods which you can use to compute the dimensions of HTML elements' corners. You can use `getBoundingClientRect` method or `offsetWidth`, `offsetHeight` property, to get the 2d box dimensions, but it's not effective, if you transform your HTML object with CSS `transform` property and want to get proper dimensions of transformed 3d box. MatrixDecoder gets `matrix()` and `matrix3d()` values of `transform` CSS property and convert it's 6 or 16 values into proper box dimensions. MatrixDecoder computes the **x** and **y** coordinates of four element corners toward the chosen element.

##### What can I use **matrixDecoder** for?
 * better control of transforming
 * easier manipulation with CANVAS
 * when you use `event.clientX` `event.clientY` to calculate the proper position of the mouse cursor on the transformed element
 * to stick outer elements to the edges of transformed element
 * when you know the position of each corner, you can calculate, alike using CANVAS method `isPointInPath()`, whether the 2d or 3d transformed element overlaps another one.
 * to transform the element till it's corners reach specified positions

##### Where can I check how does **matrixDecoder** work?
###### The generator of **DIV** element transformed with `transform`, `transform-style`, `transform-origin` and `perspective` properties:
* https://devrafalko.github.io/matrixDecoder/samp/
* the four small boxes with blue border and x, y, z coordinates use the **matrixDecoder** to get sticked to the corners of transforming box. 
* You can manipulate transform values and examine, how **matrixDecoder** works in the flow
* You can select **Value Type** from the select element to change the dimensions returned in four corner boxes. Use the `top`, `left` and `rotate` slider to understand the differences between returned values.

# Browser Support

|Chrome|Firefox|IE|Safari|Opera|iOS Safari|Opera Mini
:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|11+|4+|9-11|5+|10.6+|3.2+|5+|

# Methods

|name|description|syntax|parameters|parameters description|
|:---:|:---|:---:|:---:|:---:|
|decode|The `decode()` method returns the **rounded** `x` and `y` `px` coordinates of four corners of the chosen HTML element. It returns the full numbers of pixels, *eg. 4, 100, 1500*  |`matrixDecoder.decode(elem)`|*elem*|The HTML element, which dimensions you want to get.|
|decodePrecise|The `decodePrecise()` method returns the **accurate** computed values for `x` and `y` `px` coordinates of four corners of the chosen HTML element. It returns the numbers with decimal fractions *(if exists)* of pixels, *eg. 4, 100.234523, 1500.2354634346*|`matrixDecoder.decodePrecise(elem)`|*elem*|The HTML element, which dimensions you want to get.|


# Returned Object
#### The structure of returned object:
```javascript
{fixed:
    {A: {x:number,y:number},
     B: {x:number,y:number},
     C: {x:number,y:number},
     D: {x:number,y:number}},
parent:{
    {A: {x:number,y:number},
     B: {x:number,y:number},
     C: {x:number,y:number},
     D: {x:number,y:number}},
element{
    {A: {x:number,y:number},
     B: {x:number,y:number},
     C: {x:number,y:number},
     D: {x:number,y:number}}}
```
The `decode()` method and `decodePrecise()` method **return** the object with **3 types** of values:
* **`fixed`** - returns the coordinates *(`top` and `left` properties)* of four corners **relative to the screen top-left corner**
* **`parent`** - returns the coordinates *(`top` and `left` properties)* of four corners **relative to the element's parent top-left corner**
* **`element`** - returns the coordinates *(`top` and `left` properties)* of four corners **relative to itself top-left corner, as if the element would be set to `transform:none`**

Each **type of value** contains `A` `B` `C` `D` objects related to 4 corners of element *(going clockwise from top-left)*:
* **`A`** - returns the coordinates *(`top` and `left` properties)* of **top-left corner**
* **`B`** - returns the coordinates *(`top` and `left` properties)* of **top-right corner**
* **`C`** - returns the coordinates *(`top` and `left` properties)* of **bottom-right corner**
* **`D`** - returns the coordinates *(`top` and `left` properties)* of **bottom-left corner**

Each **corner** contains `x` and `y` properties:
* **`x`** define **left** numerical value of pixels
* **`y`** define **top** numerical value of pixels

# Syntax
```javascript
//find HTML element
var getElement = document.getElementById('htmlDivContainer');

//return the object with all coordinates
var getCoorinates = matrixDecoder.decode(getElement);

//get the top (y) and left (x) position of top-left corner (A), relative to the element's parent (parent)
console.log(getCoordinates.parent.A.x,
            getCoordinates.parent.A.y); 

//get the left (x) positions of top-right (B) and bottom-right (C) corners, relative to the BODY (fixed)
console.log(getCoordinates.fixed.B.x, 
            getCoordinates.fixed.C.x);

//get the new top (y) and left (x) position of bottom-right (C) corner of transformed element (element)
//relative to it's non-transformed position
console.log(getCoordinates.element.C.x, 
            getCoordinates.element.C.y);

});
```
# Implementation

#### 1. Include matrixDecoder on your site.
```html
<script src="matrixDecoder.js"></script>
```
> Any outer libraries needed. It is a fully JavaScript project.

#### 2. Create new HTML element.
```html
<div id="container"></div>
```
#### 3. Set some CSS transforms
```css
#container {
    transform: rotateX(50deg) rotateY(25deg) skewX(10deg);
}
```
#### 4. Get the accurate corner's coordinates of 3d transformed element and do what you want.
```javascript
var getElement = document.getElementById('container');
var getCoorinates = matrixDecoder.decode(getElement);
```

# License
Released under the MIT license.
>Copyright (c) 2016 Paweł Rafałko dev.rafalko@gmail.com

>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

>The above copyright notice and this permission notice **shall be included** in all
copies or substantial portions of the Software.

>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.