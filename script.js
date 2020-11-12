/*

Arrays - .map(), .forEach(), .slice(), .push(), .pop()

*/

"use strict";

var sports = ['football', 'voleyball', 'tenis', 'baseball'];

console.log(sports);


console.log('------------');

//Using map

var favSports = sports.map(sport => 'My favorite sport is ' + sport); //new array!

console.log(favSports);



console.log('------------');

//forEach();

sports.forEach(function(item, index){
    console.log(`${item}: ${index}`);
});

var sports = ['football', 'voleyball', 'tenis', 'baseball'];

console.log('------------');

var sameArray = sports.slice();
console.log(sameArray);

console.log('------------');
