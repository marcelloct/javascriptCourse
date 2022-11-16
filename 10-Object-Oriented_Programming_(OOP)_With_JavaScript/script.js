"use strict";

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Constructor Functions and the new Operator

console.log("---- Constructor Functions and the new Operator ----");

// The constructor function is a completely normal function, the only difference is we call a constructor function with the new operator
// Function expression and function declaration both work as constructor, arrow function don't, because it doesn't have its own this keyword

// Constructor
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this
  // Never create a method inside of the constructor function

  // this.calcAge = function(){
  //     console.log(2037 - this.birthYear);
  // }
};

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automaticaly return {}

// jonas, matilda, jack are instances of Person
const jonas = new Person("Jonas", 1991);
const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
console.log(jonas, matilda, jack);

console.log(jonas instanceof Person);

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Prototypes

console.log("\n");
console.log("---- Prototypes ----");

// Every function in Javascript automaticaly has a property called prototype
// All the objects that are created through this constructor function will inherit, get access, to all the methods and properties that are defined on this prototype property. e.g: Person.prototype

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

// Person.prototype is not the prototype of Person
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = "Homo Sapiens";
console.log(jonas.species, matilda.species);
console.log(jonas);

// own properties are only the ones that are declared directly on the object itself, not including the inherited properties
console.log(jonas.hasOwnProperty("firstName"));
console.log(jonas.hasOwnProperty("species"));
