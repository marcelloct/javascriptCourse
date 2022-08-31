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

document.body.addEventListener("click", high5);
