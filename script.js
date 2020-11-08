/*

Variables in global scope and function scope...

Values ​​within functions are local, but values ​​in the document's global 
scope are global. That is, what is declared within the function remains 
in the function and what is declared in the global scope is for the 
entire document.

*/

"use strict";

var value = 100

function myFunc(value) {
    value = 0;
    console.log('local: ' + value);
}

myFunc(value);

console.log('global: ' + value);


console.log('---------------------------');


var ok = true;

function badFunction(ok) {
    ok = false;
    console.log('local: ' + ok);
}

badFunction(ok);

console.log('global: ' + ok);