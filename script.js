/*

Arrow Functions

*/

"use strict";

var myName = (name='* Unknow *') => 'My name is ' + name;

console.log(myName());
console.log(myName('Davizim'));

var sum = (a, b, c) => {

    return a + b + c

};

console.log(sum(1, 2, 3));

var soma = (...args) => {

    var soma = 0;

    for(let i = 0; i < args.length; i++){

        soma += args[i]

    }

    return soma;

}

console.log(soma(1, 2, 3, 4, 5));