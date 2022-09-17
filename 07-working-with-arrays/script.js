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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${`${mov} €`}</div>
      </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// console.log(containerMovements.innerHTML);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes} €`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;
};

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
// Implementing Login

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Event Handlers
let currentAccount;

btnLogin.addEventListener("click", function (event) {
  // Prevent form from submiting
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Implementing Transfers

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // console.log("Transfer valid");

    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// The findindex Method

// return the index of the element

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";

  labelWelcome.textContent = `Log in to get started`;
});

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Challenge #2
console.log("\n");
console.log("---- Challenge #2 ----");

// convert dog ages to human
// calculate the average age of all dogs

const calclAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(dog => dog >= 18);
  const average = adults.reduce((acc, el) => acc + el, 0) / adults.length;
  // console.log(humanAges, adults, average);
  return average;
};

const avg1 = calclAverageHumanAge([1, 6, 9, 3, 11, 4]);
const avg2 = calclAverageHumanAge([2, 8, 7, 1]);
console.log(avg1, avg2);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// The Magic of Chaining Methods
console.log("\n");
console.log("---- The Magic of Chaining Methods ----");

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUSD)
  .map((mov, i, arr) => {
    // great use of arr for inspect the current array for possible issues in application
    console.log(arr);
    return mov * eurToUSD;
  })
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

// not overuse chaining, cause optimization problems
// avoid mutating arrays, like using splice or reverse, in this type of chaining and in bigger applications

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Challenge #3
console.log("\n");
console.log("---- Challenge #3 ----");

const calcAvgHumanAgeChaining = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, el, i, arr) => acc + el / arr.length, 0);

const avg3 = calcAvgHumanAgeChaining([1, 6, 9, 3, 11, 4]);
const avg4 = calcAvgHumanAgeChaining([2, 8, 7, 1]);
console.log(avg3, avg4);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// The find Method
console.log("\n");
console.log("---- The find Method ----");

// used to retrieve one element of an array based on a condition
// not return an Array, only return the first element based on the condition

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === "Jessica Davis");
console.log(account);

// with for of
for (const acc of accounts) {
  if (acc.owner === "Jessica Davis") {
    console.log(acc);
  } else {
    continue;
  }
}

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// some and every methods
console.log("\n");
console.log("---- some and every methods ----");

console.log(movements.includes(-130)); // equality

// some: condition
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// every
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// separate callback
const dep = mov => mov > 0;
console.log(movements.some(dep));
console.log(movements.every(dep));
console.log(movements.filter(dep));

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// flat and flatmap methods
console.log("\n");
console.log("---- flat and flatmap methods ----");

// use in nested arrays

const a = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(a.flat());

const aDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(aDeep.flat());
console.log(aDeep.flat(2));

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

const allMovements = accountMovements.flat();
console.log(allMovements);

const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// chaining
const overalBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

const overalBalance3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance3);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Sorting Arrays
console.log("\n");
console.log("---- Sorting Arrays ----");

// strings
const owners = ["Jonas", "Zack", "Adam", "Marta"];
console.log(owners.sort()); // mutate the original array

// numbers
console.log(movements);

// return < 0, a ,b (keep order)
// return > 0, b, a (switch order)

// ascending
// movements.sort((a, b) => {
//   // current and next value
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// More Ways of Creating and Filling Arrays
console.log("\n");
console.log("---- More Ways of Creating and Filling Arrays ----");

const c = [1, 2, 3, 4, 5, 6, 7];

// empty arrays + fill method
const z = new Array(7);
console.log(z);

// z.fill(1);
z.fill(1, 3, 5);
console.log(z);

c.fill(23, 2, 6);
console.log(c);

// array.from
const d = Array.from({ length: 7 }, () => 1);
console.log(d);

const e = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(e);

// assignment exercise
const dice = Array.from(
  { length: 50 },
  (_, i) => Math.trunc(Math.random() * 6) + 1
);
console.log(dice);

labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    el => el.textContent.replace("€", "")
  );
  console.log(movementsUI);
});

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Summary: Which Array Method to Use

// ---------------- To Mutate Original Array

// Add to original: .push (end), .unshift (start)
// Remove from original: .pop (end), .shift (start), .splice (any)
// Others: .reverse, .sort, .fill

// ---------------- A New Array

// Computed from original: .map (loop)
// Filtered using condition: .filter
// Portion of original: .slice
// Adding original to other: .concat
// Flatenning the original: .flat, .flatMap

// ---------------- An Array index

// Based on value: .indexOf
// Based on test condition: .findIndex

// ---------------- An Array Element

// Based on test condition: .find

// ---------------- Know if Array Includes

// Based on value: .includes
// Based on test condition: .some, .every

// ---------------- A New String

// Based on separator string: .join

// ---------------- To Transform To Value

// Based on accumulator: .reduce

// Boil down array to single value of any type: number,string, boolean, or even new array or object

// ---------------- To Just Loop Array

// Based on callback: .forEach

// Does not creat a new array, just loops over it
// doesn't produce any new value, just do some work

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// Challenge #4
console.log("\n");
console.log("---- Challenge #4 ----");

// studying if dogs are
// eating too much or too little

// too much = current food portion is larger than the recommended portion,
// and eating too little = is the opposite.
// ok amount = current food portion is within a range 10% above and 10% below the recommended portion

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1)
// calculate the recommended food portion
// add it to the object as a new property.
// Do not create a new array

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

console.log(dogs);

// 2)
// find Sarah
// Sarah's dog eating too much or too little

const dogSarah = dogs.find(dog => dog.owners.includes("Sarah"));

console.log(dogSarah);
console.log(
  `Sarah's dog is eating ${
    dogSarah.curFood > dogSarah.recFood ? "much" : "little"
  }`
);

// 3)
// Create an array containing all owners of dogs who eat too much - ownersEatTooMuch
// and an array with all owners of dogs who eat too little - ownersEatTooLittle
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
// .flat()
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4)

console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat to little!`);

// 5)

console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6)
console.log(
  dogs.some(
    dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
  )
);

// 7)
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.filter(checkEatingOkay));

// 8)
// Create a shallow copy of the 'dogs' array
// sort it by recommended food portion in an ascending order

const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
