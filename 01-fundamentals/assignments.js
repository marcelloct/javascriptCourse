const country = "Brazil";
const continent = "South America";
let population = 212;

const isIsland = false;
let language;
let notValueDefined = null;

console.log(typeof country);
console.log(continent);
console.log(population);
console.log(isIsland);
console.log(language);
console.log(notValueDefined);
console.log(country, continent);
console.log(country + " - " + continent);
console.log(`${country} - ${continent}`);

language = "portuguese";

let count = 10 + 5;
console.log(count);
count += 10; // count = count + 10
console.log(count);
count++;
console.log(count);

console.log(population > count);

let splitPopulation = population / 2;
console.log(splitPopulation);
splitPopulation++;
console.log(splitPopulation);
console.log(population >= 6);
let description = `${country} is in ${continent}, an it is ${population} million people speak ${language}`;
console.log(description);

// --------------------------------------------- Challenge #1

// let massMark = 78;
// let heightMark = 1.69;
// let massJohn = 92;
// let heightJohn = 1.95;

let massMark = 95;
let heightMark = 1.88;
let massJohn = 85;
let heightJohn = 1.76;

let BMIMark = massMark / heightMark ** 2;
let BMIJohn = massJohn / (heightJohn * heightJohn);
let markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark, BMIJohn, markHigherBMI);

// --------------------------------------------- Challenge #1 Complete

console.log(`String
in multiple lines
with template literals 😊`);

if (population >= 33) {
  console.log(`${country}'s population is above average`);
} else {
  console.log(
    `${country}'s population is ${33 - population} million below average`
  );
}

// --------------------------------------------- Challenge #2

if (BMIMark > BMIJohn) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})`);
} else {
  console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})`);
}

// --------------------------------------------- Challenge #2 Complete

// type conversion
const inputYear = "1991";
console.log(inputYear + 18);
console.log(Number(inputYear) + 18);
console.log(String(18));

// type coercion
console.log("i am " + 23 + " years old");
console.log("23" - "10" - 3);
console.log("23" > "18");
console.log("20" / "2");

console.log("9" - "5");
console.log("19" - "13" + "17");
console.log("19" - "13" + 17);
console.log("123" < 57);
console.log(5 + 6 + "4" + 9 - 4 - 2);

// falsy truthy
console.log(Boolean(0));
console.log(Boolean());
console.log(Boolean("Name"));
console.log(Boolean({}));

// equality operators
if (population === 212) console.log("It's exact the same number");
console.log("18" == 18, "loose equality"); // type coercion with ==
console.log("18" === 18, "strict equality");

// const favouriteNumber = Number(prompt("What's your favourite number"))
// console.log(favouriteNumber, typeof favouriteNumber)

// if (favouriteNumber === 23) {
//     console.log('Cool! 23 is an amazing number!')
// } else if (favouriteNumber === 7) {
//     console.log('7 is also a cool number')
// } else {
//     console.log('Number is not 23 or 7')
// }

// if (favouriteNumber !== 23) console.log('Why not 23?')

// const numNeighbours = Number(prompt('How many neightbour countrie does your country have?'))

// if(numNeighbours === 1) {
//     console.log('Only 1 border')
// } else if (numNeighbours > 1) {
//     console.log('More than 1 border')
// } else {
//     console.log('No borders')
// }

const hasDriversLicense = true;
const hasGoodVision = true;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

if (hasDriversLicense && hasGoodVision) {
  console.log("Sarah is able to drive!");
} else {
  console.log("Someone else should drive...");
}

const isTired = true;
console.log(hasDriversLicense || hasGoodVision || isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log("Sarah is able to drive!");
} else {
  console.log("Someone else should drive...");
}

if (language === "english" && population < 50 && !isIsland) {
  console.log(`You should live in ${country}`);
} else {
  console.log(`${country} does not meet your criteria`);
}

// --------------------------------------------- Challenge #3

// const scoreDolphins = (96 + 108 + 89) / 3
// const scoreKoalas = (88 + 91 + 110) / 3
// const scoreDolphins = (97 + 112 + 101) / 3
// const scoreKoalas = (109 + 95 + 123) / 3
const scoreDolphins = (97 + 112 + 101) / 3;
const scoreKoalas = (109 + 95 + 106) / 3;

console.log(scoreDolphins, scoreKoalas);

if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
  console.log("Team Dolphins Wins!!!");
} else if (
  scoreDolphins === scoreKoalas &&
  scoreDolphins >= 100 &&
  scoreKoalas >= 100
) {
  console.log("Team Dolphins and Team Koalas Draw");
} else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
  console.log("Team Koalas Wins!!!");
} else {
  console.log("No one wins the trophy");
}

// --------------------------------------------- Challenge #3 Complete

// switch statement -> compare equality

const day = "monday";

switch (day) {
  case "monday": // day === 'monday'
    console.log("Plan course structure");
    console.log("Go to coding meetup");
    break;
  case "tuesday":
    console.log("Prepare theory videos");
    break;
  case "wednesday":
  case "thursday":
    console.log("Write code examples");
    break;
  case "friday":
    console.log("Record videos");
  case "saturday":
  case "sunday":
    console.log("Enjoy the weekend");
    break;
  default:
    console.log("Not a valid day");
}

if (day === "monday") {
  console.log("Plan course structure");
  console.log("Go to coding meetup");
} else if (day === "tuesday") {
  console.log("Prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
  console.log("Write code examples");
} else if (day === "friday") {
  console.log("Record videos");
} else if (day === "saturday" || day === "sunday") {
  console.log("Enjoy the weekend");
} else {
  console.log("Not a valida day");
}

switch (language) {
  case "mandarim":
  case "chinese":
    console.log("MOST number of native speakers");
    break;
  case "spanish":
    console.log("2nd palce in number of native speakers");
    break;
  case "english":
    console.log("3rd place");
    break;
  case "hindi":
    console.log("Number 4");
    break;
  case "arabic":
    console.log("5th most spoken language");
    break;
  default:
    console.log("Great language too :D");
}

// if/else ternary operator

population >= 33
  ? console.log(`${country}'s population is above average`)
  : console.log(`${country}'s population is below average`);

console.log(
  `${country}'s population is ${population >= 33 ? "above" : "below"} average`
);

// --------------------------------------------- Challenge #4

const bill = 275;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);

// --------------------------------------------- Challenge #4 Complete
