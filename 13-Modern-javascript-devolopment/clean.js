// Bad Code

// var sc = [
//   { product: "bread", quantity: 6 },
//   { product: "pizza", quantity: 2 },
//   { product: "milk", quantity: 4 },
//   { product: "water", quantity: 10 },
// ];

// var allow = {
//   lisbon: 5,
//   others: 7,
// };

// var description = "";

// var check = function (city) {
//   if (sc.length > 0) {
//     var allowed;
//     if (city == "lisbon") {
//       allowed = allow.lisbon;
//     } else {
//       allowed = allow.others;
//     }

//     for (item of sc) {
//       if (item.quantity > allowed) item.qunatity = allowed;
//     }
//   }
// };
// check("lisbon");
// console.log(sc);

// var createDescription = function () {
//   var first = sc[0];
//   var p = first.product;
//   var q = first.quantity;

//   if (sc.length > 1) {
//     description = "order with " + q + " " + p + ",etc...";
//   } else {
//     description = "order with " + q + " " + p + ".";
//   }
// };

// createDescription();

// console.log(description);

///////////////////////////////////////////////
//////////////////////////////////////////////
// Clean Code

const shoppingCart = [
  { product: "bread", quantity: 6 },
  { product: "pizza", quantity: 2 },
  { product: "milk", quantity: 4 },
  { product: "water", quantity: 10 },
];

const allowedProduct = {
  lisbon: 5,
  others: 7,
};

const checkCorrectAllowedProducts = function (cart, numAllowed, city) {
  if (!cart.length) return [];

  // const allowed = numAllowed[city] > 0 ? numAllowed[city] : numAllowed.others;
  const allowed = numAllowed?.[city] ?? allowedProduct.others;

  const newCart = cart.map(item => {
    const { product, quantity } = item;
    return {
      product,
      quantity: quantity > allowed ? allowed : quantity,
    };
  });

  return newCart;
};
const allowedShoppingCart = checkCorrectAllowedProducts(
  shoppingCart,
  allowedProduct,
  "lisbon"
  // "faro"
);
console.log(allowedShoppingCart);

const createOrderDescription = function (cart) {
  const [{ product: p, quantity: q }] = cart;
  console.log(p, q);

  return `Order with ${q} ${p} ${cart.length > 1 ? ",etc..." : "."}`;
};

const orderDescription = createOrderDescription(allowedShoppingCart);

console.log(orderDescription);
