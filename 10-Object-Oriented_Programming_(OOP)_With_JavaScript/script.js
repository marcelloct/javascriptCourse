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

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Prototypal Inheritance and The Prototype Chain

console.log("\n");
console.log("---- Prototypal Inheritance and The Prototype Chain ----");

console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 4, 4, 5, 6, 8, 8]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ == Array.prototype);

console.log(arr.__proto__.__proto__);

// added a new method to the prototype property of the array constructor
// all arrays inherited this method
// avoid use this, because Javascript might add a method with the same name
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir(h1);
console.dir(x => x + 1);

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Challenge #1

console.log("\n");
console.log("---- Challenge #1 ----");

// 1.
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

console.log(bmw, mercedes);

// 2.
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} Km/h`);
};

// 3.
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} Km/h`);
};

// 4.
bmw.accelerate();
mercedes.accelerate();
bmw.brake();
mercedes.brake();

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// ES6 Classes

console.log("\n");
console.log("---- ES6 Classes ----");

// Modern syntax

// class expression
// const PersonCl = class {}

// class declaration

class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Method will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

const jessica = new PersonCl("Jessica", 1996);
console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype);

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

jessica.greet();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizes
// 3. Classes are executed in strict mode
