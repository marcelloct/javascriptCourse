"use strict";

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Default Parameters
console.log("---- Default Parameters ----");

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    // enhanced objects
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking("AB700");
createBooking("AB700", 2);
createBooking("AB700", 2, 800);
createBooking("AB700", undefined, 800);
createBooking("AB700", undefined);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// How Passing Arguments Works - Value vs. Reference
console.log("\n");
console.log("---- How Passing Arguments Works ----");

const flight = "AB300";
const jonas = {
  name: "Jonas Schmiddt",
  passportNum: 1234567890,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999"; // (primitive type in function) completely new variable, not modify the outside flight variable
  passenger.name = "Mr. " + passenger.name; // (reference type in function) a reference to the object in the memory heap

  if ((passenger.passportNum = 1234567890)) {
    // alert("Check-In");
  } else {
    // alert("Wrong passport");
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passportNum = Math.trunc(Math.random() * 100000000);
};

newPassport(jonas);
console.log(jonas);

// we pass reference to the function, but we do not pass by reference, that reference itself is a value

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// First-Class and Higher-Order Functions
console.log("\n");
console.log("---- First-Class and Higher-Order Functions ----");

// First Class Functions
// Javascript treats functions as first-class functions
// This means that functions are simply values
// Functions are just another 'type' of object

// Store functions in variables or properties
// pass functions as arguments toOTHER functions
// Return functions from functions
// call methods on functions

// Higher Order Functions
// A functons that receives another function as an argument, that return a new function, or both
// This is only possible because of first-class functions

// addEventListener is an higher order function, that can be passed a function as callback
// document.querySelector('h1').addEventListener('click',callbackFunction)

// function that return new function

function count() {
  // high order function
  let counter = 0;
  return function () {
    // returned function
    counter++;
  };
}

// First class functions is just a feature that a programming language either has or does not have
// All it means is that all functions are values

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Functions Accepting Callback Functions
console.log("\n");
console.log("---- Functions Accepting Callback Functions ----");

const oneWord = function (str) {
  return str.replaceAll(" ", "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

console.log(oneWord("lorem Ipsum"));
console.log(upperFirstWord("lorem Ipsum"));

// High-Order Function
const transform = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed String: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transform("lorem Ipsum Add X", oneWord);
transform("lorem Ipsum Add X", upperFirstWord);

// JS uses callbacks all the time

function high5() {
  console.log("✋");
}

// document.body.addEventListener("click", high5);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Functions Returning Functions
console.log("\n");
console.log("---- Functions Returning Functions ----");

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHi = greet("Hi");
greeterHi("Jonas");
greeterHi("Peter");

greet("Hello")("Jonas");

const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

greetArrow("Hey")("Amanda");

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// The call and apply Methods
console.log("\n");
console.log("---- The call and apply Methods ----");

// allow us to explicity define the this keyword in any function

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(23, "Jonas Schmitt");
console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, "James Bond");

// Call Method
book.call(eurowings, 21, "James Bond");
console.log(eurowings);

const swiss = {
  airline: "Swiss",
  iataCode: "SW",
  bookings: [],
};

book.call(swiss, 300, "Amanda Seyfried");

// Apply Method - NOT used in Modern Javascript
const flightArr = [35, "Penelope Cruz"];
book.apply(swiss, flightArr);

// instead uses the spread operator on call method
book.call(swiss, ...flightArr);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// The bind Method
console.log("\n");
console.log("---- The bind Method ----");

// like the call method, allow us to manually set this keywords for any function call
// the difference is that bind, does not immediately call the function
// instead it returns a new function where the this keyword is bound

// return a function where this keyword will allways be set to Eurowings
book.bind(eurowings);

// first argument of bind is this keyword
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookSW = book.bind(swiss);

bookEW(100, "Peter Jackson");

// set arguments in bind methods
const bookEW23 = book.bind(eurowings, 23);
bookEW23("Antonio Banderas");

// With addEventListeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// lufthansa.buyPlane();

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// Partial application (preset parameters)
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// null is set, because don't have this keyword in use
const addVAT = addTax.bind(null, 0.23); // addVAT = value => value + value * 0.23

console.log(addVAT(200));

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHi = greet("Hi");
// greeterHi("Jonas");
// greeterHi("Peter");

// Same as above with returning functions - Challenge
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(200));
