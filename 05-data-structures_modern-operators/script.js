"use strict";
///////////////////////////////////////////////////////////////////
// Destructuring Arrays

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
// Short Circuiting (&& and __)

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
// The Nullish Coalescing Operator (__)

restaurant2.numGuestsNullish = 0;
const guests3 = restaurant2.numGuestsNullish || 10;
console.log(guests3);

// Nullish: null and undefined (NOT 0 or '')
// if is null or undefined return falsy (10) . 0 and '' are treated like truthy here
const guestCorrect = restaurant2.numGuestsNullish ?? 10;
console.log(guestCorrect);

/////////////////////////////////////////////////////////////////////
//  Looping Arrays The for-of Loop

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
