/*

Rest Parameters...

The rest parameter syntax allows us to represent an indefinite number of arguments as an ARRAY.

Rest parameters are the only ones that have not been assigned a separate name. 
Rest parameters are Array instances, which means that methods such as sort, map, 
forEach or pop can be applied directly.



*/

"use strict";

function sum(...args) { // (1, 2, 3, ..., n) -> [1, 2, 3, ..., n]

    var sum = 0;

    for (var i = 0; i < args.length; i++) {

        sum += args[i];

    }

    return sum;

}

console.log(sum(1, 2, 3, 4, 5));

console.log('----------------------');


function random(socialMedia, ...numbers /*, something else - > ERROR!!!!!*/) {

    console.log(socialMedia);

    console.log(numbers);

    /*console.log(something else);*/ // ERROR!!!!!

}

random('Instagram', 1, 2, 7, 9, 11);

