"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Creating DOM Elements

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);

// console.log(containerMovements.innerHTML);

const calcPrintBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

calcPrintBalance(account1.movements);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Computing Usernames

const createUserNames = function (acc) {
  acc.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  });
};
createUserNames(accounts);
// console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Simple Array Methods
console.log("---- Simple Array Methods ----");

let arr = ["a", "b", "c", "d", "e"];

// SLICE
// Does not change the original array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); // last two elements in array
console.log(arr.slice(1, -2));

// SPLICE
// Change the original array, different than slice
// console.log(arr.splice(2));

// Normally used to delete the last element of an array
arr.splice(-1);
console.log(arr);
arr.splice(1, 2); // the second parameter is the number of elements that we want to delete
console.log(arr);

// REVERSE
// Change the original array too
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
// concatenate 2 arrays
// Does not change the original array
arr = ["a", "b", "c", "d", "e"];
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // Same result

// JOIN
// Does not change the original array
console.log(letters.join(" - "));

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Looping Arrays_ forEach
console.log("\n");
console.log("---- Looping Arrays_ forEach ----");

const mvs = [200, 450, -400, 3000, -650, -130, 70, 1300];

// with for of

// for (const mv of mvs) {
for (const [i, mv] of mvs.entries()) {
  mv > 0
    ? console.log(`Movement ${i + 1}: You deposited ${mv}`)
    : console.log(`Movement ${i + 1}:  You withdrew ${Math.abs(mv)} `);
}

console.log("---- FOREACH ----");

// with forEach

mvs.forEach(function (mv, i, arr) {
  // receive the currently element of array as an argument
  // you can add index and array as parameters too (OPTIONAL)
  // 1st par. current element of array / 2nd par. current index / 3rd par. entire array
  mv > 0
    ? console.log(`Movement ${i + 1}: You deposited ${mv}`)
    : console.log(`Movement ${i + 1}:  You withdrew ${Math.abs(mv)} `);
});

// you can't break up the forEach loop (continue and break)

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// forEach With Maps and Sets
console.log("\n");
console.log("---- forEach With Maps and Sets ----");

// Map
const curs = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

curs.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const cursUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(cursUnique);
cursUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Challenge #1
console.log("\n");
console.log("---- Challenge #1 ----");

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrect = dogsJulia.slice();
  dogsJuliaCorrect.splice(0, 1); // element start, number of elements to remove
  dogsJuliaCorrect.splice(-2); // remove the last two
  console.log(dogsJuliaCorrect);

  const allDogs = dogsJuliaCorrect.concat(dogsKate);
  console.log(allDogs);

  allDogs.forEach(function (v, i) {
    v >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${v} years old`)
      : console.log(`Dog number ${i + 1} is still a puppy`);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Data Transformations - map, filter, reduce
console.log("\n");
console.log("---- Data Transformations - map, filter, reduce ----");

// map looks like forearch loop, but with the difference that creates a new array
// map returns a new array containing the results of applying an operation on all original array elements. e.g: current * 2

// filter returns a new array containing the array elements that passed a specified test condition. e.g: current > 2

// reduyce boils ('reduces') all array elements down to one single value. e.g: adding all elements together

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// The map Method
console.log("\n");
console.log("---- The map Method ----");

const eurToUSD = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUSD;
// });

const movementsUSD = movements.map(mov => mov * eurToUSD);
console.log(movements);
console.log(movementsUSD);

// with for of
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUSD);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map((mov, i, arr) => {
  return `Movement ${i + 1}: You ${
    mov > 0 ? "deposited" : "withdrew"
  } ${Math.abs(mov)}`;
});

console.log(movementsDescriptions);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// The filter Method
console.log("\n");
console.log("---- The filter Method ----");

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// The reduce Method
console.log("\n");
console.log("---- The reduce Method ----");

// different then others callback functions prviously learned
// in reduce method the parameters order are: accumulator, current element, index, array
// accumulator -> snowball
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0); // initial value for the accumulator
console.log(balance);

// maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
