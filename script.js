/*

Strings!!!

We can declare using double quotes or single quotes. Remember that we can mix these 
two types of quotes in one string! -- "Hello I'm David!".

The strings can be multilines!!! We must use ` ` for this!

For cancate strings in JS, we use the symbol + between two string fragments.
We can also replace only certain words in a string, using the ${X} syntax 
in the string, where 'X' is a variable or an expression, We must use ` ` for this!


*/

"use strict";

console.log("Hello, I'm David!");

var msg = `
helloooo
muu
uu
ltiliiiiines
express
ion!!!
`

console.log(msg);


var name = 'David';
var surname = ' Sotto Mayor';
var concate = name + surname;
console.log(concate);

var account = 998;
var total = 132.99;

var message = `Hello user ${account}, the total is \$ ${total}.`
console.log(message);


var bold = true;
var hello = `Hello my name is ${(bold) ? '<bold>David</bold>' : 'David'}`;

console.log(hello);

