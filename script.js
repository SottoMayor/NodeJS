/*

Functions Closures 

*/

"use strict";

function hello(name) {

    var text = 'hello ' + name;
    return function () {
        console.log(text);
    }

};

var helloDavid = hello('David');

helloDavid();


