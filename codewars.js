// Write a function that takes an array of numbers and returns the sum
// of the numbers. The numbers can be negative or non-integer.
// If the array does not contain any numbers then you should return 0.

// Examples
// Input: [1, 5.2, 4, 0, -1]
// Output: 9.2

// Input: []
// Output: 0

// Input: [-2.398]
// Output: -2.398

// Assumptions
// You can assume that you are only given numbers.
// You cannot assume the size of the array.
// You can assume that you do get an array and if the array is empty, return 0.

function sum(numbers) {
  "use strict";
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (typeof numbers[i] !== "number") continue;
    total += numbers[i];
  }
  return total;
}

// Alternative Way, But here strings are allowed and concatenated with numbers

// function sum(numbers) {
//   const initialValue = 0;
//     return numbers.reduce(
//       (previousValue, currentValue) => previousValue + currentValue,
//       initialValue
//     );
// }

console.log(sum([1, 5.2, 4, 0, -1]));

/////////////////////////////////////////////////////////////////////////
///////

// Implement a function which convert the given boolean value
// into its string representation.

function booleanToString(b) {
  //your code here
  if (typeof b !== "boolean" || b === "") {
    return "Just booleans are accepted";
  } else {
    const convertToString = b.toString();
    return convertToString;
  }
}

// Short Way, no validation here

// function booleanToString(b){
//     return b.toString();
// }

console.log(booleanToString(true));

/////////////////////////////////////////////////////////////////////////
///////

// In this simple assignment you are given a number and have to make it
// negative. But maybe the number is already negative?

// makeNegative(1);    // return -1
// makeNegative(-5);   // return -5
// makeNegative(0);    // return 0
// makeNegative(0.12); // return -0.12

function makeNegative(num) {
  return num == 0 || num == -0 ? 0 : -Math.abs(num);
}

console.log(makeNegative(0));

/////////////////////////////////////////////////////////////////////////
///////

// Nathan loves cycling.

// Because Nathan knows it is important to stay hydrated, he drinks
// 0.5 litres of water per hour of cycling.

// You get given the time in hours and you need to return the
// number of litres Nathan will drink, rounded to the smallest value.

// time = 3 ----> litres = 1

// time = 6.7---> litres = 3

// time = 11.8--> litres = 5

function litres(time) {
  return Math.floor(time * 0.5);
}

console.log(litres(3));

/////////////////////////////////////////////////////////////////////////
///////

// You were camping with your friends far away from home,
// but when it's time to go back, you realize that your fuel is
// running out and the nearest pump is 50 miles away! You know that on
// average, your car runs on about 25 miles per gallon.
// There are 2 gallons left.

// Considering these factors, write a function that tells you if
// it is possible to get to the pump or not.

// Function should return true if it is possible and false if not.

//
const zeroFuel = (distanceToPump, mpg, fuelLeft) => {
  return mpg * fuelLeft >= distanceToPump ? true : false;
};

console.log(zeroFuel(50, 25, 2));

/////////////////////////////////////////////////////////////////////////
///////

// If we list all the natural numbers below 10
// that are multiples of 3 or 5, we get 3, 5, 6 and 9.
// The sum of these multiples is 23.

// Finish the solution so that it returns the sum of all the
// multiples of 3 or 5 below the number passed in.
// Additionally, if the number is negative,
// return 0 (for languages that do have them).

// Note: If the number is a multiple of both 3 and 5, only count it once.

// return sum of multiples 3 or 5
// return 0 if negative
// count once

function solution(number) {
  let multiples = 0;
  // let arrayTest = []
  for (let i = 1; i < number; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      //   arrayTest.push(i)
      multiples += i;
    }
  }
  return multiples;
  // console.log(arrayTest);
}

console.log(solution(100));

/////////////////////////////////////////////////////////////////////////
///////

// Create a function that takes an integer as an argument and
// returns "Even" for even numbers or "Odd" for odd numbers.

function even_or_odd(number) {
  return number % 2 === 0 ? "Even" : "Odd";
}
console.log(even_or_odd(6));

/////////////////////////////////////////////////////////////////////////
///////

// Trolls are attacking your comment section!

// A common way to deal with this situation is to remove all
// of the vowels from the trolls' comments, neutralizing the threat.

// Your task is to write a function that takes a string and return a
// new string with all vowels removed.

// For example, the string
// "This website is for losers LOL!" would become
// "Ths wbst s fr lsrs LL!".

function disemvowel(str) {
  return str.replace(/[aeiou]/gi, "");
}

console.log(disemvowel("alendro"));
