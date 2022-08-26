/////////////////////////////////////////////////////////////////////
//////////////////////// Challenges /////////////////////////////////
////////////////////////////////////////////////////////////////////
"use strict";

// 1) Challenge #1
console.log("---- Challenge 1 ----");

const massMark = 78;
const heightMark = 1.69;

const massJohn = 95;
const heightJohn = 1.88;

const calculateBMI = function (mass, height) {
  const BMI = mass / height ** 2;
  return BMI;
};

const markBMI = calculateBMI(massMark, heightMark);
const johnBMI = calculateBMI(massJohn, heightJohn);

const markHigherBMI = markBMI > johnBMI;

console.log(markBMI, johnBMI, markHigherBMI);

// 2) Challenge #2
console.log("\n");
console.log("---- Challenge 2 ----");

markHigherBMI
  ? console.log(
      `Mark's BMI (${markBMI.toFixed(
        2
      )}) is higherthan John's (${johnBMI.toFixed(2)})`
    )
  : console.log(
      `John's BMI (${johnBMI.toFixed(
        2
      )}) is higher than Mark's (${markBMI.toFixed(2)})`
    );

// 3) Challenge #3
console.log("\n");
console.log("---- Challenge 3 ----");

// § Data 1: Dolphins [96, 108, 89] Koalas [88, 91 , 110]
// § Data Bonus 1: Dolphins  [97, 112 , 101] Koalas  [109, 95 , 123]
// § Data Bonus 2: Dolphins  [97, 112 , 101] Koalas  [109, 95 , 106]

const scoreDolphins = [96, 108, 89];
const scoreKoalas = [88, 91, 110];

const calculateAverage = function (array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  const avg = sum / array.length;
  return avg;
};

const avgDolphins = calculateAverage(scoreDolphins);
const avgKoalas = calculateAverage(scoreKoalas);

console.log(avgDolphins, avgKoalas);

if (avgDolphins > avgKoalas && avgDolphins >= 100) {
  console.log(`Team Dolphins Wins!`);
} else if (
  avgDolphins === avgKoalas &&
  avgDolphins >= 100 &&
  avgKoalas >= 100
) {
  console.log(`Team Dolphins and Team Koalas Draw`);
} else if (avgKoalas > avgDolphins && avgKoalas >= 100) {
  console.log(`Team Koalas Wins!`);
} else {
  console.log(`No one wins the trophy`);
}

// 4) Challenge #4
console.log("\n");
console.log("---- Challenge 4 ----");

// § Data 1: Test for bill values 275, 40 and 430

const calculateTip = function (bill) {
  const tip = bill >= 50 && bill <= 300 ? bill * (15 / 100) : bill * (20 / 100);
  return `The bill was ${bill}, the tip was ${tip}, and the total value ${
    bill + tip
  }`;
};

console.log(calculateTip(275));

// 5) Challenge #5
console.log("\n");
console.log("---- Challenge 5 ----");

const calcAverage = array => {
  let sum = 0;
  for (const a of array) {
    sum += a;
  }
  return sum / array.length;
};

const avgDolhins2 = calcAverage(scoreDolphins);
const avgKoalas2 = calcAverage(scoreKoalas);

const checkWinner = (avg1, avg2) => {
  if (avg1 >= 2 * avg2) {
    console.log(`Team Dolphins Win! ${avg1} vs. ${avg2}`);
  } else if (avg2 >= 2 * avg1) {
    console.log(`Team Koalas Win! ${avg2} vs. ${avg1}`);
  } else {
    console.log("No one wins!");
  }
};

checkWinner(avgDolhins2, avgKoalas2);

// 6) Challenge #6
console.log("\n");
console.log("---- Challenge 6 ----");

const bills = [275, 11, 60];

const calcTip = function (bills) {
  const tips = [];
  for (const bill of bills) {
    bill >= 50 && bill <= 300
      ? tips.push(bill * (15 / 100))
      : tips.push(bill * (20 / 100));
  }
  return tips;
};

const calculatedTips = calcTip(bills);

console.log(
  `The bill was ${bills[0]}, the tip was ${
    calculatedTips[0]
  }, and the total value ${bills[0] + calculatedTips[0]}`
);

// 7) Challenge #7
console.log("\n");
console.log("---- Challenge 7 ----");

// Your tasks:

// 3. Log to the console who has the higher BMI, together with the full name and the
// respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"

const MarkObject = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,
  calc: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const JohnObject = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,
  calc: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

MarkObject.calc();
JohnObject.calc();

if (MarkObject.BMI > JohnObject.BMI) {
  console.log(
    `${MarkObject.fullName}'s BMI (${MarkObject.BMI}) is higher than ${JohnObject.fullName}'s (${JohnObject.BMI})`
  );
} else {
  console.log(
    `${JohnObject.fullName}'s BMI (${JohnObject.BMI}) is higher than ${MarkObject.fullName}'s (${MarkObject.BMI})`
  );
}

// 8) Challenge #8
console.log("\n");
console.log("---- Challenge 8 ----");

const bills2 = [22, 295, 176, 440, 37, 105, 10, 1100, 86];
const tips2 = calcTip(bills2);
const total = [];

for (let i = 0; i < bills2.length && i < tips2.length; i++) {
  total.push(bills2[i] + tips2[i]);
}

console.log(tips2);
console.log(total);
console.log(calcAverage(total));

for (
  let i = 0;
  i < bills2.length && i < tips2.length && i < total.length;
  i++
) {
  console.log(
    `The bill was ${bills2[i]}, the tip was ${tips2[i]}, and the total value ${total[i]}`
  );
}

// 9) Challenge #9
console.log("\n");
console.log("---- Challenge 9 ----");

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

const printForecast = function (array) {
  let str = "";
  for (let [k, v] of array.entries()) {
    str += ` ${v}ºC in ${k + 1} days ...`;
  }
  return "... " + str;
};

console.log(printForecast(data1));

// Data Structures, Modern Operators and Strings
// 1) Challenge #1
console.log("\n");
console.log("---- Challenge 1 ----");

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1)
const [players1, players2] = game.players;
console.log(players1, players2);

// 2)
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3)
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4)
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

// 5)
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6)
const printGoals = function (...players) {
  console.log(`${players.length} goal (s) were scored`);
};

printGoals("Thiago", "Coutinho", "Perisic");
printGoals(...game.scored);

// 7)
team1 < team2 && console.log("Team 1 is more likely to win");
team1 > team2 && console.log("Team 2 is more likely to win");

// 2) Challenge #2
console.log("\n");
console.log("---- Challenge 2 ----");

// 1)
const scored = game.scored.entries();
for (const [k, v] of scored) {
  console.log(`Goal ${k + 1}: ${v}`);
}

// 2)
const odds = Object.values(game.odds);
let oddSum = 0;
for (const odd of odds) {
  oddSum += odd;
}
const oddAverage = oddSum / odds.length;
console.log(oddAverage);

// 3)
for (const [team, odd] of Object.entries(game.odds)) {
  // console.log(`${team} ${odds}`);
  let teamStr = team === "x" ? "draw" : `victory ${game[team]}`;

  console.log(`Odd of ${teamStr} : ${odd}`);
}

// 4)
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

// 3) Challenge #3
console.log("\n");
console.log("---- Challenge 3 ----");

const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🔶 Yellow card"],
]);

// 1)
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2)
gameEvents.delete(64);
console.log(gameEvents);

// 3)
const time = [...gameEvents.keys()].pop();

console.log(`An event happened, on
average, every ${time / gameEvents.size} minutes`);

// 4)
for (const [k, v] of gameEvents) {
  let period = k <= 45 ? "FIRST" : "SECOND";
  console.log(`[${period}-HALF] ${k}: ${v}`);
}

// 4) Challenge #4
console.log("\n");
console.log("---- Challenge 4 ----");

// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to
// insert the elements), and conversion will happen when the button is pressed.

const textarea = document.body.append(document.createElement("textarea"));
const button = document.body.append(document.createElement("button"));

document.querySelector("button").addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  const rows = text.split("\n");

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split("_");
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd("20", " ")}${"✔".repeat(i + 1)}`);
  }
});
