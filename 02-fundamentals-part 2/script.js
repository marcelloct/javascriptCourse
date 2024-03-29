"use strict";

////////////////////////////////////////////////////////////////////
/// Functions

function logger() {
  console.log("My name is Jonas");
}

// calling / running / invoking function
logger();

////////////////////////////////////////////////////////////////////
// function declaration vs expressions

// function name(parameters) {
//     function body
// }
// name(arguments)

// function expression

// const name = function (parameters) {
//     function body
// }
// name(arguments)

function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0); // receive the returned value in the function
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

const descPortugal = describeCountry("Portugal", 33, "Lisboa");
const descBrazil = describeCountry("Brazil", 212, "Brasilia");
const descSpain = describeCountry("Spain", 110, "Barcelona");

console.log(descPortugal);
console.log(descBrazil);
console.log(descSpain);

function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}

const percChina1 = percentageOfWorld1(1441);
const percBrazil1 = percentageOfWorld1(212);
const percPortugal1 = percentageOfWorld1(33);
console.log(percChina1, percBrazil1, percPortugal1);

const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

const percChina2 = percentageOfWorld2(1441);
const percBrazil2 = percentageOfWorld2(212);
const percPortugal2 = percentageOfWorld2(33);
console.log(percChina2, percBrazil2, percPortugal2);

////////////////////////////////////////////////////////////////////////
/// arrow function

// const name = one parameter => one line of code, 'return' can be omited in this case
// const name = (parameters) => {code}

const percentageOfWorld3 = population => (population / 7900) * 100;

const percChina3 = percentageOfWorld3(1441);
const percBrazil3 = percentageOfWorld3(212);
const percPortugal3 = percentageOfWorld3(33);
console.log(percChina3, percBrazil3, percPortugal3);

/////////////////////////////////////////////////////////////////////////
/// functions calling other functions

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor2(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} apples and ${orangePieces} oranges.`;
  return juice;
}

console.log(fruitProcessor2(2, 3));

function describePopulation(country, population) {
  const perc = percentageOfWorld1(population);

  return `${country} has ${population} million people, which is about ${perc}% of the world.`;
}

console.log(describePopulation("China", 1441));

///////////////////////////////////////////////////////////////////////
/// Review Functions

const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const yearUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years.`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired!`);
    return 0;
  }
};

console.log(yearUntilRetirement(1991, "Jonas"));
console.log(yearUntilRetirement(1950, "Mike"));

// --------------------------------------------- Challenge #1

const calcAverage = (a, b, c) => (a + b + c) / 3;
console.log(calcAverage(2, 4, 5));

let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);

const checkWinners = (avgDolphins, avgKoalas) => {
  if (avgDolphins >= 2 * avgKoalas) {
    console.log(`Team Dolphins Win! ${avgDolphins} vs. ${avgKoalas}`);
  } else if (avgKoalas >= 2 * avgDolphins) {
    console.log(`Team Koalas Win! ${avgKoalas} vs. ${avgDolphins}`);
  } else {
    console.log("No one wins!");
  }
};

checkWinners(scoreDolphins, scoreKoalas);

scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
checkWinners(scoreDolphins, scoreKoalas);

// --------------------------------------------- Challenge #1 Complete

////////////////////////////////////////////////////////////////////////
/// Arrays

const friends = ["Michael", "Steven", "Peter"];

const years = new Array(1991, 1984, 2008);

console.log(friends[0]);
console.log(friends.length);
console.log(friends[friends.length - 1]); // retrieve the last element

friends[2] = "Jay";
console.log(friends);

const jonas = [scoreDolphins, "name", 2037 - 1991, friends];
console.log(jonas);

const agesArray = [calcAge(years[0]), calcAge(years[1])];
console.log(agesArray);

const populations = [212, 33, 19, 414];
console.log(populations.length === 4);
const percentages = [
  percentageOfWorld1(populations[0]),
  percentageOfWorld1(populations[1]),
  percentageOfWorld1(populations[2]),
  percentageOfWorld1(populations[3]),
];
console.log(percentages);

////////////////////////////////////////////////////////////////////////
/// Basic Array Operations (Methods)

friends.push("John");
console.log(friends);

friends.unshift("Omar");
console.log(friends);

friends.pop();
const popped = friends.pop();
console.log(friends);
console.log(popped);

friends.shift();
console.log(friends);

console.log(friends.indexOf("Steven"));

console.log(friends.includes("Steven"));

if (friends.includes("Peter")) {
  console.log("You have a friend named Peter");
} else {
  console.log("You dont have a friend named Peter");
}

const neighbours = ["Argentina", "Peru", "Chile"];
neighbours.push("Utopia");
console.log(neighbours);
neighbours.pop();
console.log(neighbours);

if (!neighbours.includes("Germany")) {
  console.log("Problably not a South American country");
}

neighbours[neighbours.indexOf("Chile")] = "Bolivia";
console.log(neighbours);

// --------------------------------------------- Challenge #2

const calcTip = function (billValue) {
  if (billValue >= 50 && billValue <= 300) {
    return billValue * 0.15;
  } else {
    return billValue * 0.2;
  }
};

const bills = [100, 125, 44];
console.log(bills);

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
console.log(tips);

const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(total);

console.log(
  `The bill was ${bills[0]}, the tip was ${tips[0]}, and the total value ${total[0]}`
);

console.log(
  `The bill was ${bills[1]}, the tip was ${tips[1]}, and the total value ${total[1]}`
);

console.log(
  `The bill was ${bills[2]}, the tip was ${tips[2]}, and the total value ${total[2]}`
);

// --------------------------------------------- Challenge #2 Complete

///////////////////////////////////////////////////////////////////////
/// Introduction to Objects

// object literal syntax
// object = {
//     property: value,
// }

const jonasObject = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  age: 2037 - 1991,
  friends: ["Michael", "Peter", "Steven"],
};
console.log(jonasObject);

const myCountry = {
  country: "Brazil",
  capital: "Brasilia",
  language: "Portuguese",
  population: 212,
  neighbours: neighbours,
};
console.log(myCountry);

///////////////////////////////////////////////////////////////////////
/// Dot vs. Bracket Notation

console.log(jonasObject.firstName);
console.log(jonasObject["firstName"]);

const nameKey = "Name";
console.log(jonasObject["first" + nameKey]);
console.log(jonasObject["last" + nameKey]);

// const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lastName, age and friends')

// if (jonasObject[interestedIn]) {
//     console.log(jonasObject[interestedIn])
// } else {
//     console.log('Wrong request! Choose between firstName, lastName, age and friends')
// }

jonasObject.location = "Brazil";
jonasObject["twitter"] = "@jonasschmedtman";
console.log(jonasObject);

console.log(
  `${jonasObject.firstName} has ${jonasObject.friends.length} friends, and his best friend is called ${jonasObject.friends[0]}`
);
console.log(
  `${myCountry.country} has ${myCountry["population"] - 2} million ${
    myCountry.language
  }-speaking people, ${
    myCountry.neighbours.length
  } neighbouring countries and a capital called ${myCountry.capital}`
);

////////////////////////////////////////////////////////////////////////
/// Object Methods

const jonasObject2 = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYear: 1991,
  friends: ["Michael", "Peter", "Steven"],
  hasDriversLicense: true,
  // functions attached in a  object is called method
  // calcAge: function() {
  //     console.log(this);
  //     return 2037 - this.birthYear;
  // }
  calcAge: function () {
    this.age = 2037 - this.birthYear; // create new property (age) to store the value
    return this.age;
  },
  getSummary: function () {
    return `${this.firstName} have ${this.calcAge()}-year old, and he has ${
      this.hasDriversLicense ? "a" : "no"
    } driver's license.`;
  },
};

console.log(jonasObject2.calcAge());
console.log(jonasObject2.age);
console.log(jonasObject2.getSummary());

const myCountry2 = {
  country: "Brazil",
  capital: "Brasilia",
  language: "Portuguese",
  population: 212,
  neighbours: neighbours,

  describe: function () {
    return `${this.country} has ${this["population"]} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}`;
  },

  checkIsland: function () {
    this.isIsland = this.neighbours.length === 0 ? true : false;
  },
};

console.log(myCountry2.describe());
console.log(myCountry2.checkIsland());
console.log(myCountry2);

// --------------------------------------------- Challenge #3

const markObject = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.resultsBMI = this.mass / this.height ** 2;
    return this.resultsBMI;
  },
};

const johnObject = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    return (this.resultsBMI = this.mass / this.height ** 2);
  },
};

markObject.calcBMI();
johnObject.calcBMI();

console.log(markObject.resultsBMI, johnObject.resultsBMI);

if (markObject.resultsBMI > johnObject.resultsBMI) {
  console.log(
    `${markObject.fullName}'s BMI (${markObject.resultsBMI}) is higher than ${johnObject.fullName}'s BMI (${johnObject.resultsBMI})`
  );
} else {
  console.log(
    `${johnObject.fullName}'s BMI (${johnObject.resultsBMI}) is higher than ${markObject.fullName}'s BMI (${markObject.resultsBMI})`
  );
}

// --------------------------------------------- Challenge #3 Complete

///////////////////////////////////////////////////////////////////////
/// Iteration - The for Loop

// (initializer, condition, increment)
// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 5; rep++) {
  console.log(`Lifting weights repetition ${rep}`);
}

///////////////////////////////////////////////////////////////////////
/// Looping Arrays, Breaking and Continuing

const myArray = [
  "Jonas",
  "Schmedtmann",
  1991,
  "teacher",
  ["Michael", "Peter"],
  true,
];

const typesInArray = [];

for (let i = 0; i < myArray.length; i++) {
  // Reading from myArray
  console.log(myArray[i], typeof myArray[i]);

  // Filling types array
  typesInArray.push(typeof myArray[i]);
}

console.log(typesInArray);

const yearsArray = [1991, 2007, 1969];
const receiveAges = [];

for (let i = 0; i < yearsArray.length; i++) {
  receiveAges.push(2037 - yearsArray[i]);
}

console.log(receiveAges);

// continue and break
console.log("------- Only Strings --------");
for (let i = 0; i < myArray.length; i++) {
  if (typeof myArray[i] !== "string") continue;
  console.log(myArray[i], typeof myArray[i]);
}

console.log("------- Break with number --------");
for (let i = 0; i < myArray.length; i++) {
  if (typeof myArray[i] === "number") break;
  console.log(myArray[i], typeof myArray[i]);
}

const percentages2 = [];

for (let i = 0; i < populations.length; i++) {
  const perc = percentageOfWorld1(populations[i]);
  percentages2.push(perc);
}

console.log(percentages2);

////////////////////////////////////////////////////////////////////////
/// Looping Backwards and Loops in Loops

for (let i = myArray.length - 1; i >= 0; i--) {
  console.log(i, myArray[i]);
}

for (let ex = 1; ex <= 3; ex++) {
  console.log(`------ Starting Exercise ${ex} -------`);

  for (let rep = 1; rep <= 5; rep++) {
    console.log(`Exercise ${ex}: Lifting weights repetition ${rep}`);
  }
}

const listOfNeightbours = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];

for (let i = 0; i < listOfNeightbours.length; i++) {
  // console.log(listOfNeightbours[i])
  for (let y = 0; y < listOfNeightbours[i].length; y++) {
    console.log(listOfNeightbours[i][y]);
  }
}

////////////////////////////////////////////////////////////////////////
/// While Loop
// Not have to depend on any counter variable
// Used when you dont know how many iterations the loop will have
let w = 1;
while (w <= 5) {
  console.log(`WHILE: Lifting weights repetition ${w}`);
  w++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log("Loop is about to end...");
}

for (let i = 0; i < populations.length; i++) {
  const perc = percentageOfWorld1(populations[i]);
  percentages2.push(perc);
}

const percentages3 = [];
let i = 0;
while (i < populations.length) {
  percentages3.push(percentageOfWorld1(populations[i]));
  i++;
}
console.log(percentages3);

// --------------------------------------------- Challenge #4

const billsArray = [22, 295, 176, 440, 37, 105];
const tipsArray = [];
const totalArray = [];

for (let i = 0; i < billsArray.length; i++) {
  const tip = calcTip(billsArray[i]);
  tipsArray.push(tip);
  totalArray.push(tip + billsArray[i]);
}

console.log(billsArray, tipsArray, totalArray);

function calcAverage2(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    // sum = sum + arr[i]
    sum += arr[i];
  }
  console.log(sum);
  return sum / arr.length;
}

console.log(calcAverage2(totalArray));

for (
  let i = 0;
  i < billsArray.length && i < tipsArray.length && i < totalArray.length;
  i++
) {
  console.log(
    `The bill was ${billsArray[i]}, the tip was ${tipsArray[i]}, and the total value ${totalArray[i]}`
  );
}

// --------------------------------------------- Challenge #4 Complete

console.table(myCountry);

// --------------------------------------------- Challenge #1 Developer Skills Section
// 1) Understand
// Array to string, separated by...
// What is the X days? index + 1

// 2) sub-problems
// Transform array to string
// Transform each element to string with °C
// Strings needs to contain day (index + 1)
// Add... between elements and start and end of string

// return a string with these temperatures

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

const printForecast = arr => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}°C in ${i + 1} days... `;
  }
  return "..." + str;
};

console.log(printForecast(data2));
