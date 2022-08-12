"use strict";
console.log("-------- Challenges --------");

console.log("-------- Challenge # 1 --------");

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

// 1.
const [players1, players2] = game.players;
console.log(players1, players2);

// 2.
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4.
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

// 5.
const {
  odds: { team1, x: draw, team2 },
} = game;
// const { team1, x: draw, team2 } = game.odds; // Other Way, same result
console.log(team1, draw, team2);

// 6.
const printGoals = function (...players) {
  console.log(`${players.length} goal(s) were scored`);
};

printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals(...game.scored);

// 7.
team1 < team2 && console.log("Team 1 is more likely to win");
team1 > team2 && console.log("Team 2 is more likely to win");

console.log("-------- Challenge # 2 --------");
// 1.
// .entries() method for arrays
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// 2.
const oddValues = Object.values(game.odds);
let oddSum = 0;
for (let odd of oddValues) {
  oddSum += odd;
}
const oddAverage = oddSum / oddValues.length;
console.log(oddAverage);

// 3.
// .entries(object)  for objects
for (const [team, odd] of Object.entries(game.odds)) {
  // console.log(team, odd);
  const teamStr = team === "x" ? "draw" : `victory ${game[team]}`;

  console.log(`Odd of ${teamStr} : ${odd}`);
}

console.log("-------- Challenge # 3 --------");

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
const gameUniqueEvents = [...new Set(gameEvents.values())];
console.log(gameUniqueEvents);

// 2)
gameEvents.delete(64);
console.log(gameEvents);

// 3)
const time = [...gameEvents.keys()].pop();
// console.log(time);
console.log(`An event happened, on
average, every ${time / gameEvents.size} minutes`);

// 4)
for (const [min, event] of gameEvents) {
  // console.log(min, event);
  const half = min <= 45 ? "FIRST" : "SECOND";
  console.log(`[${half}-HALF] ${min}: ${event}`);
}

console.log("-------- Challenge # 4 --------");
