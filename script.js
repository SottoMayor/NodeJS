/*

Types...

Boolean -> true or false
Number -> 1 or 1.2
string -> 'a' or "a"
Null -> null
Undefined -> undefined
Objects -> {} or New Object()

typeof(element) -> How know the type of an element


*/

"use strict";

function typeOf(variable){

    console.log(typeof(variable));

}

var a;
typeOf(a);

var a = null;
typeOf(a);

var a = 1.2;
typeOf(a);

var a = true;
typeOf(a);

var a = 'Hello world';
typeOf(a);

var a = {'name':'David', 'surname':'Sotto Mayor'};
typeOf(a);


// OBS: Undefined is equal to null!

console.log(null == undefined);