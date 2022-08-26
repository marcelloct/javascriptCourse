/////////////////////////////////////////////////////////////////////
////////////////////// Assignments /////////////////////////////////
////////////////////////////////////////////////////////////////////
"use strict";
// Fundamentals Part 1

// 1) Values and Variables
console.log("---- Assignment 1 ----");
const country = "Brazil";
const continent = "South America";
let population = 212;

console.log(country, continent, population);

// 2 - 3) Data Types / let, const and var
console.log("\n");
console.log("---- Assignment 2 - 3 ----");
const isIsland = false;
const language = "portuguese";

console.log(isIsland, language);

// 4) Basic Operators
console.log("\n");
console.log("---- Assignment 4 ----");
let splitPopulation = population / 2;
console.log(splitPopulation);
splitPopulation++;
console.log(splitPopulation);
console.log(population > 6);
console.log(population <= 33);

// 5) Strings and Template Literals
console.log("\n");
console.log("---- Assignment 5 ----");
console.log(
  `${country} is in ${continent}, and its ${population} million people speak ${language}`
);

// 6) Taking Decisions: if / else Statements
console.log("\n");
console.log("---- Assignment 6 ----");

population >= 33
  ? console.log(`${country}'s population is above the average`)
  : console.log(`${country}population is 22 million below average`);

// 7) Type Conversion and Coercion
console.log("\n");
console.log("---- Assignment 7 ----");
console.log("9" - "5");
console.log("19" - "13" + "17");
console.log("19" - "13" + 17);
console.log("123" < 57);
console.log(5 + 6 + "4" + 9 - 4 - 2);

// 8) Equality Operators: == vs. ===
console.log("\n");
console.log("---- Assignment 8 ----");

// let numNeighbours = Number(
//   prompt("How many neighbour countries does your country have?")
// );
let numNeighbours = 1;

if (numNeighbours === 1) {
  console.log("Only 1 border!");
} else if (numNeighbours > 1) {
  console.log("More than 1 border");
} else {
  console.log("No borders!");
}

// 9) Logical Operators
console.log("\n");
console.log("---- Assignment 9 ----");

if (language === "portuguese" && population < 300 && isIsland == false) {
  console.log(`You should live in ${country} :)`);
} else {
  console.log(`${country} does not meet your criteria :(`);
}

console.log(!isIsland);

// 10) Switch operator
console.log("\n");
console.log("---- Assignment 10 ----");

switch (language) {
  case "chinese":
  case "mandarim":
    console.log("MOST number of native speakers!");
    break;
  case "spanish":
    console.log("2nd place in number of native speakers");
    break;
  case "english":
    console.log("3rd place");
    break;
  case "hindi":
    console.log("Number 4");
    break;
  default:
    console.log("Great language too!");
    break;
}

// 11) The Conditional (Ternary) Operator
console.log("\n");
console.log("---- Assignment 11 ----");
console.log(
  `${country}'s population is ${population >= 30 ? "above" : "below"} average`
);

////////////////////////////////////////////////////////////////////////////////
// Fundamentals Part 2

// 1) Functions
console.log("\n");
console.log("---- Assignment 1 ----");

const describeCountry = function (country, population, capitalCity) {
  return `${country} has ${population} million people and its capital city is ${capitalCity}`;
};

const descPortugal = describeCountry("Portugal", 33, "Lisboa");
const descBrazil = describeCountry("Brazil", 212, "Brasilia");
const descSpain = describeCountry("Spain", 110, "Barcelona");

console.log(descPortugal);
console.log(descBrazil);
console.log(descSpain);

// 2) Function Declarations vs. Expressions
console.log("\n");
console.log("---- Assignment 2 ----");

function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}

let percChina = percentageOfWorld1(1441);

console.log(percChina);

const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

percChina = percentageOfWorld2(1780);

console.log(percChina);

// 3) Arrow Functions
console.log("\n");
console.log("---- Assignment 3 ----");

const percentageOfWorld3 = population => {
  return (population / 7900) * 100;
};

percChina = percentageOfWorld3(2200);

console.log(percChina);

// 4) Functions Calling Other Functions
console.log("\n");
console.log("---- Assignment 4 ----");

const describePopulation = function (country, population) {
  const percentage = percentageOfWorld3(population);
  const str = ` ${country} has ${population} million people, which is about ${percentage.toFixed(
    2
  )}% of the world.`;
  return str;
};

console.log(describePopulation("Brazil", 212));

// 5) Introduction to Arrays
console.log("\n");
console.log("---- Assignment 5 ----");

const populations = [212, 331, 33, 1441];

console.log(populations.length === 4);

let percentages = [
  percentageOfWorld1(populations[0]),
  percentageOfWorld1(populations[1]),
  percentageOfWorld1(populations[2]),
  percentageOfWorld1(populations[3]),
];

console.log(percentages);

// 6) Basic Array Operations (Methods)
console.log("\n");
console.log("---- Assignment 6 ----");

const neighbours = ["Argentina", "Chile", "Peru"];

neighbours.push("Utopia");
console.log(neighbours);

neighbours.pop();
console.log(neighbours);

if (!neighbours.includes("Alemanha"))
  console.log("Probably not a South American country");

neighbours[neighbours.indexOf("Peru")] = "Costa Rica";

console.log(neighbours);

// 7) Introduction to Objects
console.log("\n");
console.log("---- Assignment 7 ----");

const myCountry = {
  country: "Brazil",
  capital: "Brasilia",
  language: "portuguese",
  population: 212,
  neighbours: neighbours,

  describe: function () {
    return `${this.country} has ${this.population + 2} million ${
      this.language
    }-speaking people, ${this.neighbours.length} neighbouring countries
    and a capital called ${this["capital"]}.`;
  },

  checkIsland: function () {
    this.isIsland = this.neighbours.length === 0 ? true : false;
    return this.isIsland;
  },
};

console.log(myCountry);

// 8) Dot vs. Bracket Notation
console.log("\n");
console.log("---- Assignment 8 ----");

console.log(`${myCountry.country} has ${myCountry.population + 2} million ${
  myCountry.language
}-speaking people, ${myCountry.neighbours.length} neighbouring countries
and a capital called ${myCountry["capital"]}.`);

console.log(`${myCountry.country} has ${myCountry["population"] - 2} million ${
  myCountry.language
}-speaking people, ${myCountry.neighbours.length} neighbouring countries
and a capital called ${myCountry["capital"]}.`);

// 9) Object Methods
console.log("\n");
console.log("---- Assignment 9 ----");

console.log(myCountry.describe());
console.log(myCountry.checkIsland());
console.log(myCountry);

// 10) Iteration: The for Loop
console.log("\n");
console.log("---- Assignment 10 ----");

for (let i = 1; i <= 5; i++) {
  console.log(`Voter number ${i} is currently voting`);
}

// 11) Looping Arrays, Breaking and Continuing
console.log("\n");
console.log("---- Assignment 11 ----");

let percentages2 = [];

for (let i = 0; i < populations.length; i++) {
  const perc = percentageOfWorld1(populations[i]);
  percentages2.push(perc);
}

console.log(percentages2);

// 12) Looping Arrays, Breaking and Continuing
console.log("\n");
console.log("---- Assignment 12 ----");

const listOfNeighbours = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];

for (let i = 0; i < listOfNeighbours.length; i++) {
  //   console.log(listOfNeighbours[i]);
  for (let x = 0; x < listOfNeighbours[i].length; x++) {
    // console.log(listOfNeighbours[i][x]);
    console.log(`Neighbour: ${listOfNeighbours[i][x]}`);
  }
}

// 13) The while Loop
console.log("\n");
console.log("---- Assignment 13 ----");

let percentages3 = [];
let init = 0;

while (init < populations.length) {
  //   console.log(listOfNeighbours[init]);
  const perc = percentageOfWorld1(populations[init]);
  percentages3.push(perc);
  init++;
}
console.log(percentages3);
