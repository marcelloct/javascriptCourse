"use strict";
///////////////////////////////////////////////////////////////////
// Destructuring Arrays
console.log("---- Destructuring Arrays ----");

const arr = [2, 3, 4];

const [x, y, z] = arr;

console.log(x, y, z);
console.log(arr);

const restaurant = {
  name: "Classico Italiano",
  location: "Via angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Foccacia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

// const [first, second] = restaurant.categories;
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// switching variables
[main, secondary] = [secondary, main];
console.log(main, secondary);

// console.log(restaurant.order(2, 0));

// receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);

// nested destructuring
const [i, , [j, k]] = nested;
console.log(i, j, k);

// default values
const [p = 1, q = 1, r = 1] = [8];
console.log(p, q, r);

///////////////////////////////////////////////////////////////////
// Destructuring Objects
console.log("---- Destructuring Objects ----");

const restaurant2 = {
  name: "Classico Italiano",
  location: "Via angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Foccacia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    // console.log(obj);
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} 
      will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1},${ing2},${ing3}`);
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
    let str = "";
    for (let i = 0; i < otherIngredients.length; i++) {
      str += `- ${otherIngredients[i]}\n`;
    }
    console.log(str);
  },
};

// using the same properties names in varaiables
const { name, openingHours, categories } = restaurant2;
console.log(name, openingHours, categories);

// variables names different then properties names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant2;
console.log(restaurantName, hours, tags);

// default values to properties that don't exist on the object
const { menu = [], starterMenu: starters = [] } = restaurant2;
console.log(menu, starters);

// mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// nested objects
const { sat } = openingHours;
console.log(sat);

const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

// object as argument to a function
restaurant2.orderDelivery({
  time: "22:30",
  adress: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});

restaurant2.orderDelivery({
  adress: "Via del Sole, 21",
});

////////////////////////////////////////////////////////////////////
// The Spread Operator (...)
console.log("---- The Spread Operator (...) ----");

// used to build new arrays or pass multiple values into a function
// expand an array into individual elements

// take all elements from array and doesn't create new variables like destructuring

// we can use only where we write values separated by commas (,)

// usually only expected when we pass arguments into a function or when we built a new array

const arr2 = [7, 8, 9];
const newArr = [1, 2, ...arr2];
console.log(newArr);
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

// copy array
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 or more arrays
const joinArr = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(joinArr);

// iterables: arrays, strings, maps, sets. NOT objects
const str = "Jonas";
const letters = [...str, "", "S."];
console.log(letters);

// real-world example
const ingredients = [
  //   prompt("Let's make pasta! Ingredient 1?"),
  //   prompt("Let's make pasta! Ingredient 2?"),
  //   prompt("Let's make pasta! Ingredient 3?"),
];
console.log(ingredients);

restaurant2.orderPasta(...ingredients);

// objects
const newRestaurant = { foundedIn: 1998, ...restaurant2, founder: "Guiseppe" };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant2 };
restaurantCopy.name = "Ristorante Roma";
console.log(restaurantCopy.name);
console.log(restaurant2.name);

////////////////////////////////////////////////////////////////////
// Rest Pattern and Parameters
console.log("---- Rest Pattern and Parameters ----");

// used to collect multiple elements and condense then into an array

// we can use only where we write variables names separated by commas (,). NOT values separated by commas

// 1) Destructuring

// SPREAD, because on RIGHT side of =
const arrSpread = [1, 2, ...[3, 4]];

// REST, because on LEFT side of =
const [ab, bc, ...others] = [1, 2, 3, 4, 5];
console.log(ab, bc, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant2.mainMenu,
  ...restaurant2.starterMenu,
];
console.log(pizza, risotto, otherFood);

// objects
const { sat: saturday, ...weekdays } = restaurant2.openingHours;
console.log(saturday, weekdays);

// 2) Functions
const add = function (...numbers) {
  //   console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const n = [23, 5, 7];
add(...n);

restaurant2.orderPizza("mushrooms", "onions", "olives", "spinach");
restaurant2.orderPizza("mushrooms");

////////////////////////////////////////////////////////////////////////
// Short Circuiting (&& and ||)
console.log("---- Short Circuiting (&& and ||) ----");

// Use ANY data type, return ANY data type, short-circuiting

// return the first truthy value from the evaluation and ignore/not evaluate the others values
console.log("----- OR -----");

console.log(3 || "Jonas");
console.log("" || "Jonas");
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || null || 0 || "" || "Hello" || 2);

restaurant2.numGuests = 23;
// const guests1 = restaurant2.numGuests ? restaurant2.numGuests : 10;
// console.log(guests1);

// the same result as before, but using shot-circuiting
const guests2 = restaurant2.numGuests || 10;
console.log(guests2);

console.log("----- AND -----");
// return the first falsy value from the evaluation and ignore/not evaluate the others values
// but if all values evaluated are truthy, return the last evaluated one
console.log(0 && "Jonas");
console.log(7 && "Jonas");
console.log("Jonas" && 23 && null && 7);
console.log("Jonas" && 23 && "Hi" && 7);

// if (restaurant2.orderPizza) {
//   restaurant2.orderPizza("mushroom");
// }

// the same result as before, but using shot-circuiting
restaurant2.orderPizza && restaurant2.orderPizza("mushrooms", "spinach");

// for practical usage we can use the OR operator to set default values,
// and we can use the AND operator to execute code in the second operand if the first one is true

///////////////////////////////////////////////////////////////////
// The Nullish Coalescing Operator (??)
console.log("---- The Nullish Coalescing Operator (??) ----");

restaurant2.numGuestsNullish = 0;
const guests3 = restaurant2.numGuestsNullish || 10;
console.log(guests3);

// Nullish: null and undefined (NOT 0 or '')
// if is null or undefined return falsy (10) . 0 and '' are treated like truthy here
const guestCorrect = restaurant2.numGuestsNullish ?? 10;
console.log(guestCorrect);

/////////////////////////////////////////////////////////////////////
//  Looping Arrays The for-of Loop
console.log("---- Looping Arrays The for-of Loop ----");

const menu2 = [...restaurant2.starterMenu, ...restaurant2.mainMenu];

// can be used continue and break

for (const item of menu2) console.log(item);

// to get the index

// for (const item of menu2.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }

// better way

for (const [i, el] of menu2.entries()) {
  console.log(`${i + 1}: ${el}`);
}

/////////////////////////////////////////////////////////////////////
//  Enhanced Object Literals
console.log("---- Enhanced Object Literals ----");

const weekdaysEn = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHoursEn = {
  [weekdaysEn[3]]: {
    open: 12,
    close: 22,
  },
  [weekdaysEn[4]]: {
    open: 11,
    close: 23,
  },
  [weekdaysEn[6]]: {
    open: 0,
    close: 24,
  },
};

const restaurantEnhanced = {
  name: "Classico Italiano",
  location: "Via angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Foccacia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  // ES6 enhanced object literals
  openingHoursEn,

  // removing function keyword for methods
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    // console.log(obj);
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} 
        will be delivered to ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1},${ing2},${ing3}`);
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
    let str = "";
    for (let i = 0; i < otherIngredients.length; i++) {
      str += `- ${otherIngredients[i]}\n`;
    }
    console.log(str);
  },
};

console.log(restaurantEnhanced);

///////////////////////////////////////////////////////////////////////
//  Optional Chaining (._)
console.log("---- Optional Chaining (._) ----");

// check if an property or method exist and if an array is empty, in case does not exist return undefined else than a error
// tests if the value on the left does exists
// normally used with nullish operator

if (restaurant2.openingHours && restaurant2.openingHours.mon)
  console.log(restaurant2.openingHours.mon.open);

// WITH optional chaining
console.log(restaurant2.openingHours.mon?.open);
console.log(restaurant2.openingHours?.mon?.open);

// example
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of days) {
  const open = restaurant2.openingHours[day]?.open ?? "-";
  console.log(`On ${day}, we open at ${open}`);
}

// Methods

console.log(restaurant2.order?.(0, 1) ?? "Method does not exist");
console.log(restaurant2.orderRisotto?.(0, 1) ?? "Method does not exist");

// Arrays
const users = [{ name: "Jonas", email: "hi@gmail.com" }];
console.log(users[0]?.name ?? "user array empty");

///////////////////////////////////////////////////////////////////////
// Looping Objects_ Object Keys, Values, and Entries
console.log("---- Looping Objects_ Object Keys, Values, and Entries ----");

// property names

const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// property values
const getValues = Object.values(openingHours);
console.log(getValues);

// entire object
const entries = Object.entries(openingHours);
console.log(entries);

// [key,value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

////////////////////////////////////////////////////////////////////
// Sets
console.log("---- Sets ----");

// collection of unique values
// iterable

const orderSet = new Set([
  "Pizza",
  "Pasta",
  "Risotto",
  "Pizza",
  "Pizza",
  "Risotto",
]);
console.log(orderSet);

console.log(new Set("Jonas"));

console.log(orderSet.size);
console.log(orderSet.has("Pizza"));
console.log(orderSet.has("Almondega"));
orderSet.add("Garlic Bread");
orderSet.delete("Risotto");
// orderSet.clear()
console.log(orderSet);

for (const order of orderSet) console.log(order);

// example
const staff = ["Chef", "Waiter", "Chef", "Manager", "Waiter"];
console.log(staff);
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(new Set(["Chef", "Waiter", "Chef", "Manager", "Waiter"]).size);

console.log(new Set("jonasschimmidt").size);

////////////////////////////////////////////////////////////////////////
// Maps Fundamentals
console.log("---- Maps fundamentals ----");

// used to map values to keys
// different then objects, in maps, the keys can have any type

const rest = new Map();
console.log(rest);

rest.set("name", "Classico Italiano");
rest.set(1, "Italy");
rest.set(2, "Portugal");

rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open")
  .set(false, "We are closed");

console.log(rest);

console.log(rest.get(true));

const timeTest = 8;
console.log(
  rest.get(timeTest > rest.get("open") && timeTest < rest.get("close"))
);

console.log(rest.has("categories"));
rest.delete(2);

const arrTest = [1, 2];
rest.set(arrTest, "Test");
rest.set(document.querySelector("h1"), "Heading");
console.log(rest);
console.log(rest.size);
// rest.clear()

console.log(rest.get(arrTest));

////////////////////////////////////////////////////////////////////////
// Maps Iteration
console.log("---- Maps Iteration ----");

// other way to populating a map (best way than set)
const question = new Map([
  ["question", "What is the best language programming in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "Javascript"],
  ["correct", 3],
  [true, "Correct"],
  [false, "Try again"],
]);
console.log(question);

// convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get("question"));
for (const [key, value] of question) {
  if (typeof key === "number") {
    console.log(`Answer ${key}: ${value}`);
  }
}
// const answer = Number(prompt("Your Answer"));
const answer = 3;
console.log(answer);

console.log(question.get(question.get("correct") === answer));

// convert map to array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);

////////////////////////////////////////////////////////////////////////
// Summary Which Data Structure to Use
console.log("---- Summary Which Data Structure to Use ----");

// data structures: arrays, objects, sets and maps

// Sources of Data
// 1) From the program itself: Data writen directly in source code (e.g. status messages)
// 2) From the UI: Data input from the user or data written in DOM (e.g. tasks in todo app)
// 3) From external sources: Data fetched for example from web API (e.g. recipe objects)

// For simple lists: array or set
// Needed key/value pair: objects or maps

// Arrays VS. Sets

// Array:
// Use when you need ordered list of values (might contain duplicates)
// Use when you need to manipulate data

// Sets
// Use when you need to work with unique values
// Use when high-performance is really important
// Use to remove duplicates from arrays

// Objects VS. Maps

// Objects:
// More 'traditional' key/value store ('abused' objects)
// Easier to write and access values with . and []
// Use when you need to include functions (methods)
// Use when working with JSON (can convert to map)

// Maps:
// Better performance
// Keys can have any data type
// Easy to iterate
// Easy to compute size
// Use when you simply need to map key to values
// Use when you need keys that are not strings

////////////////////////////////////////////////////////////////////////
// Working With Strings - Part 1
console.log("---- Working With Strings - Part 1 ----");

const airline = "TAP Air Portugal";
const plane = "A320";

console.log(plane[0]);
console.log("B737"[1]);

console.log(airline.length);
console.log("B737".length);

console.log(airline.indexOf("r"));
console.log(airline.lastIndexOf("r"));
console.log(airline.indexOf("Portugal"));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(" ")));
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  s === "B" || s === "E"
    ? console.log("You got the middle seat")
    : console.log("You got lucky");
};

checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

console.log(new String("Jonas")); // conversion that javascript does behind the scenes whenever we call a method on a string
// when operation is done the object is converted back to a regular string primitive
// all string methods return primitives
console.log(typeof new String("Jonas")); // object
console.log(typeof new String("Jonas").slice(1)); // string

////////////////////////////////////////////////////////////////////////
// Working With Strings - Part 2
console.log("---- Working With Strings - Part 2 ----");

console.log(airline.toLocaleLowerCase());
console.log("jonas".toUpperCase());

// Fix capitalization in name
const passenger = "jOnAs";
const passengerLower = passenger.toLowerCase(); // jonas
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1); // J + onas
console.log(passengerCorrect);

const correctCapitalization = function (name) {
  const lowerCase = name.toLowerCase();
  const correct = lowerCase[0].toUpperCase() + lowerCase.slice(1);
  console.log(correct);
};

correctCapitalization("jESSica");
correctCapitalization("peteR");

// Comparing emails
const email = "hello@jonas.io";
const loginEmail = " Hello@Jonas.Io \n";

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(email === normalizedEmail);

// replacing
const priceGB = "288,97$";
const priceUS = priceGB.replace("$", "R$").replace(",", ".");
console.log(priceUS);

const announcement =
  "All passengers come to barding door 12. Boarding door 23!";
console.log(announcement.replace("door", "gate"));
console.log(announcement.replaceAll("door", "gate"));
console.log(announcement.replace(/door/g, "gate")); // same result as replaceAll but with regex

// Booleans
const plane2 = "Airbus A320neo";
console.log(plane2.includes("A320"));
console.log(plane2.includes("Boeing"));

console.log(plane2.startsWith("Air"));

if (plane2.startsWith("Airbus") && plane2.endsWith("neo")) {
  console.log("Part of the New Airbus family");
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  baggage.includes("knife") || baggage.includes("gun")
    ? console.log("You are NOT allowed on board")
    : console.log("Welcome aboard!");
};

checkBaggage("I have a laptop, some Food and a pocket knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

////////////////////////////////////////////////////////////////////////
// Working With Strings - Part 3
console.log("---- Working With Strings - Part 3 ----");

// split and join
console.log("a+very+nice+string".split("+"));
console.log("Jonas Schmedtmann".split(" "));

const [firstName, lastName] = "Jonas Schmedtmann".split(" ");

const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(" ");
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(" "));
};

capitalizeName("jessica and smith davis");

// Padding
const message = "Go to gate 23";
console.log(message.padStart(25, "+"));
console.log("Jonas".padStart(25, "+"));

console.log(message.padStart(25, "+").padEnd(30, "+"));

// masking digits
const maskCreditCard = function (number) {
  const str = number + ""; // same as String(number)
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};

console.log(maskCreditCard(2345678923456789));
console.log(maskCreditCard(8735069054));

// repeat
const message2 = "Bad weather... All deparures deplayed... ";
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${"✈".repeat(n)}`);
};

planesInLine(5);
planesInLine(9);
