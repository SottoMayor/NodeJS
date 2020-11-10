/*

Destructuring

*/

"use strict";

const obj = {first: 'David', age: 20, last: 'Fernandes'};

const{first: something, last} = obj;

console.log(something);
console.log(last);


console.log('------------');


var array = ['David', 'Fernandes'];
var [name, lastName] = array;

console.log(name);
console.log(lastName);




