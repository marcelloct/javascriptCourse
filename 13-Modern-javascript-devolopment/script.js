////////////////////////////////////////////////////////////
// Exporting and Importing in ES6 Modules

console.log("\n");
console.log("---- Exporting and Importing in ES6 Modules ----");

// Importing Module

// all importing statements are hoisted to the top, executed first
// all modules are executed in strict mode for default
// for import modules is necessary to put in html file, script tag, the type='module'

// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";
// addToCart("bread", 5);
// console.log(price, tq);

// import everything into an object
// basically, create an object containing everything that is exported from the module

import * as ShoppingCart from "./shoppingCart.js";
ShoppingCart.addToCart("bread", 5);
console.log(ShoppingCart.totalPrice);

// receive the default value, we can give any name that we want
// avoid (NOT) import the same module twice, mixing default and named exports

// import add from "./shoppingCart.js";
// add("pizza", 2);

//// Imports are not copies of the export. They are instead like a live connection, point to the same point in the memory
ShoppingCart.addToCart("rice", 2);
console.log(ShoppingCart.cart);

////////////////////////////////////////////////////////////
// The Module Pattern

console.log("\n");
console.log("---- The Module Pattern ----");

// Old way to implement modules in Javascript, before ES6
// Like regular modules, the main goal of module pattern, is to encapsulate functionality, to have private data and to expose a public API. The best way to achieve this is by simply using a function

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    // return a object with the stuff that remain public
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart("apple", 4);
ShoppingCart2.addToCart("pizza", 2);

////////////////////////////////////////////////////////////
// CommonJS Modules

console.log("\n");
console.log("---- CommonJS Modules ----");

// used in the past, before regular modules and module pattern
// used until today, mostly in node.js

// // export
//  export.addToCart2 = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//     );
//   };

//  // import
//   const {addToCart2} = require('./shoppingCart.js')

////////////////////////////////////////////////////////////
// Command Line

// ls (UNIX) - dir (WINDOWS) - show content in the current folder
// cd .. - backwards
// cd foldername (using TAB after start tipping the foldername, this show the possibilities of folders )
// cd ../.. - backwards two levels
// clear
// mkdir foldername - new folder
// touch filename.txt - create files
// touch file1.js file2.txt - create multiple files
// rm file1.js - delete files
// mv  file ../ - move files (move file to parent folder, one level before)
// rmdir - delete directory (only empty directories)
// rm -R directoryname - delete directory and files inside

////////////////////////////////////////////////////////////
// Introduction to NPM

console.log("\n");
console.log("---- Introduction to NPM ----");

// Node Package Manager

// npm -v - Check version of npm and if have instaled in machine
// npm init - start a new project (package.json)
// npm install nameOfPackage / npm i nameOfPackage (Short Version) - install packages (node_modules folder)

// NEVER include node_modules folder in Git or when you share your project
// For install all dependencies/packages again just type in bash: npm i

// npm i packagename@version - install a specific version of the package
// npm uninstall package - uninstall a package
// npm i package -g - install globally (prefere install localy)

// leaflet / lodash-es

// impractical usage, see next section to discover a better way
// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

// better way, with parcel
import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "rice", quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
// loadash
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateClone);
console.log(stateDeepClone);

////////////////////////////////////////////////////////////
// Bundling With Parcel and NPM Scripts

console.log("\n");
console.log("---- Bundling With Parcel and NPM Scripts ----");

// Simple to use
// npm i parcel --save-dev

// npx parcel index.html (file on the script are called)
// remove type='module' from script tag when using parcel

// parcel code
if (module.hot) {
  module.hot.accept();
}

// instead using npx parcel index.html all the time, create a script in package.json and call then (e.g: npm run scriptName)
// npm run build - bundling with parcel

////////////////////////////////////////////////////////////
// Configuring Babel and Polyfilling

console.log("\n");
console.log("---- Configuring Babel and Polyfilling ----");

// configure babel to transpile or super modern code back to ES5 code
// for old browsers can work for everyone
// parcel automatically uses Babel to transpile our code

class Person {
  greeting = "Hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person("Jonas");

console.log("Jonas" ?? null);

Promise.resolve("TEST").then(x => console.log(x));

// npm i core-js

import "core-js/stable";
// import "core-js/stable/array/find";
// import "core-js/stable/promise";

// Polifilling async functions
// npm i regenerator-runtime
import "regenerator-runtime/runtime";

////////////////////////////////////////////////////////////
// Let's Fix Some Bad Code!

// - View clean.js file
