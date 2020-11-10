/*

loop for, break and continue

*/

"use strict";

//for
var array = [1, 2, 4, 6, 10];
for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
}

console.log('---------');

// break

for (let i = 0; i < 20; i += 3) {
    if (i == 15) {
        break
    };
    console.log(i)
}


console.log('---------');

//continue

for (let i = 0; i < 10; i++){

    if(i % 2 == 0){
        continue
    };

    console.log(i);

}


console.log('-------');

//for-in;

var names = 'David Sotto Mayor Maciel Fernandes'.split(' ');

for (let name in names){
    console.log(names[name]);
}
