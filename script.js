/*

Rest Parameters...

The rest parameter syntax allows us to represent an indefinite number of arguments as an ARRAY.

Rest parameters are the only ones that have not been assigned a separate name. 
Rest parameters are Array instances, which means that methods such as sort, map, 
forEach or pop can be applied directly.



*/

"use strict";

var array1 = [1, 2, 3];

var array2 = [array1, 4, 5, 6];

var array3 = [...array1, 4, 5, 6];

// look! array2 and array3 are diferents!

console.log(array2);

console.log(array3);

console.log('--------------------');

// copy arrays...

var array4 = [...array3];
array3[0] = 10;

console.log(array3);// the first element of the array3 now is 10...

console.log(array4); // the array3 is now the array4...


console.log('--------------------');

var avenue = 'Constantino Nery';
var condominiums = ['Parque dos Ingleses', 'Bosque dos Ingleses', 'Jornalistas', 'Tocantins'];

function neighbordhood(avenue, condominiums) {
    console.log(avenue);
    console.log(...condominiums); // if not '...' the condominius names would return an array of condominius.
}

neighbordhood(avenue, condominiums);