/*

What is Nan...

NaN is Not a Number.


isNaN(element) - how to know if an element is Not a Number (NaN)

*/

"use strict";

var string = 'abc';
var number = 4;

var nan = string/number

console.log(nan); //NaN

console.log(NaN == 1); //false

console.log(isNaN(nan));