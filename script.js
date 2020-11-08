/*

What's Strict Mode?

'
The strict mode of ECMAScript 5 is a form of resource by a restricted variant of JavaScript.
Browsers that don't support strict mode will run strict mode code with a different behavior 
than browsers that support it, so don't rely on strict mode without testing functionality 
support for the relevant aspects of strict mode.

Strict mode makes several changes to normal JavaScript semantics. It eliminates some silent
JavaScript errors by making them throw exceptions. It avoids misunderstandings that make
JavaScript engines difficult to optimize: strict mode code can sometimes be made to run
faster than identical non-strict mode code. It prohibits some syntaxes that are likely to
be defined in future versions of ECMAScript.

To invoke strict mode for an entire script, put the "use strict" statement exactly 
before any other statements.

Likewise, to invoke strict mode for a function, place the "use strict" statement
in the body of the function exactly before any other declaration.
'

*/

//strict mode not actived...

function myCode() {

    "use strict";
    //strict mode actived...

}

//strict mode not actived...

var value = 1;
valu = 2;

if( value >= 2 ){
    console.log('Yeaaahh');
}


//strict mode actived...

"use strict";

var value = 1;
valu = 2;

if( value >= 2 ){
    console.log('Yeaaahh');
}