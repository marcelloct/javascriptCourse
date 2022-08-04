"use-strict";
// Scoping in practice

// function calcAge is defined in global scope
function calcAge(birthYear) {
  // the body of this function is function scope
  const age = 2037 - birthYear;
  console.log(firstName);

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      const firstName = "Steven"; // new variable with same name as outer scope's variable
      output = "NEW OUTPUT"; // reassigning outer scope's variable
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str); // const and let are block scoped, so they are available only inside the block that are created
    // add(2, 3); // the scope in this function is only the block scope in which it was defined (in strict mode)
    console.log(output);
  }
  printAge();
  return age;
}

// global variable
const firstName = "Jonas";
calcAge(1991);
// console.log(age)
// printAge() // can't invoke the function in a function scope

//////////////////////////////////////////////////////////////////////
// Hoisting and Temporal Dead Zone (TDZ) in practice

// variables
// console.log(me); // undefined
// console.log(x); // TDZ
// console.log(y); // TDZ

var me = "hi";
let x = 2;
const y = 3;

// functions
// console.log(addDecl(2, 3)); // works fine
// console.log(addExpr(2, 3)); // TDZ
// console.log(addArrow(2, 3)); // TDZ

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

///////////////////////////////////////////////////////////////
// this keyword
console.log(this);

const calc = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};

calc(1991);

const calcArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // window object
};

calcArrow(1991);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;
matilda.calcAge();

const f = jonas.calcAge;
f();

///////////////////////////////////////////////
// Regular and arrow functions

const jonas2 = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // function inside a method

    // Solution 1 (pre ES6)
    // const self = this
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // }
    // isMillenial()

    // solution 2 (ES6)
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => console.log(`Hey ${this.firstName}`),
};
jonas.greet(); // arrow function not get its own this keyword, return undefined
jonas2.calcAge();

// arguments keyword
const addExpr2 = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr2(2, 5);
addExpr2(2, 5, 8, 12);

const addArrow2 = (a, b) => {
  console.log(arguments); // arguments keyword just exists in regular and expression functions, here a error are occured
  return a + b;
};
addArrow2(2, 5, 8);

/////////////////////////////////////////////////////////////////////
// Primitives vs. Objects (Primitive vs. Reference Types)

// const is immutable just when working with primitive values, with objects values can be changed

// primitive types
let lastName = "William";
console.log(lastName);
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName, oldLastName);

// reference types
const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = "Davis";
console.log("Before marriage: ", jessica);
console.log("After marriage: ", marriedJessica);

// copying objects
const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Bob"],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = "Davis";
console.log("Before marriage: ", jessica2);
console.log("After marriage: ", jessicaCopy);

jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");
// When change an object inside a object both are changed, because isn't a deep clone of the original object (jessica2)
console.log("Before marriage: ", jessica2);
console.log("After marriage: ", jessicaCopy);
