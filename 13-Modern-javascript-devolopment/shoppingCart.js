// Exporting Module

// the global variables in modules are scoped, to the current module, we can only use them here
const shippingCost = 10;
export const cart = [];

// Named exports
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} adde to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// Default Exports
// When we only want to exports one thing per module

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
