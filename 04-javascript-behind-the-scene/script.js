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
