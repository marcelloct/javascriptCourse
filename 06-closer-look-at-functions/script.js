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
// A functions that receives another function as an argument, that return a new function, or both
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

// Same as above with returning functions - Challenge
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(200));

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Challenge #1
console.log("\n");
console.log("---- Challenge #1 ----");

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    console.log(answer);
    // Register answer
    typeof answer === "number" &&
      answer < this.options.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults("string");
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

// poll.registerNewAnswer();

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
console.log("\n");
console.log("---- Immediately Invoked Function Expressions (IIFE) ----");

// Used to execute a function just once

(function () {
  console.log("This will never run again!");
})();

(() => console.log("This will ALSO never run again!"))();

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Closures
console.log("\n");
console.log("---- Closures ----");

// We don't create closures manually, closure happens automatically

// Closure makes a function remember all the variables that existed at the function's birthplace essentially

// Any function always has access to the variable environment of the execution context in which the function was created

// Closure: Variable environment (VE) to the function, exactly as it was at the time and place the function was created

// Thanks to the closure a function does not lose connection to variables that existed at the function's birthplace

// closure has priority over the scope chain

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passenger(s)`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// More Closure Examples
console.log("\n");
console.log("---- More Closure Examples ----");

// Example 1
let f;

const g = function () {
  const a = 22;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n}`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Challenge #2
console.log("\n");
console.log("---- Challenge #2 ----");

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", () => {
    header.style.color = "blue";
  });
})();
