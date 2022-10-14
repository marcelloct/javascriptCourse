"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////
// How the DOM really works

// Allow us to make javascript interact with the browser

// we can write javascript to create, modify and delete HTML elements; set styles, classes and attributes; and listen and respond to events

// DOM tree is generated from an HTML document,which we can then interact with

// DOM is a very complex API that contains lots of methods and properties to interact with the DOM tree

///////////////////////////////////////////////////////////////
// How the DOM API is organized behind the scenes

// Node => Element (<tags>) / Text (<p>Text inside elements</p>) / Comment (<!---->) / Document

// Element => HTMLElement -> HTMLButtonElement / HTMLDivElement / ...

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Selecting, Creating, and Deleting Elements

console.log("---- Selecting, Creating, and Deleting Elements ----");

// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

console.log(document.getElementsByClassName("btn"));

// Creating and inserting elements
// .insertAdjacentHTML;

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = 'We use cookies for improved funcionality and analytics'
message.innerHTML =
  'We use cookies for improved funcionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message)
// header.after(message)

// Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // message.parentElement.removeChild(message)
    message.remove(); // new way to remove elements
  });

//////////////////////////////////////////////////
/////////////////////////////////////////////////
// Styles, Attributes and Classes

console.log("\n");
console.log("---- Styles, Attributes and Classes ----");

// Styles
message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

// Atributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

console.log(logo.getAttribute("src"));

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add("c", "j");
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c"); // not includes

// Don't use
logo.className = "jonas";

//////////////////////////////////////////////////
/////////////////////////////////////////////////
// Implementing Smooth Scrolling

console.log("\n");
console.log("---- Implementing Smooth Scrolling ----");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll(X/Y)", window.pageXOffset, window.pageYOffset);

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling

  // Old Way

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // Modern Way

  section1.scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////////////////
/////////////////////////////////////////////////
// Types of Events and Event Handlers

console.log("\n");
console.log("---- Types of Events and Event Handlers ----");

const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading :D");

  // h1.removeEventListener("mouseenter", alertH1)
};

h1.addEventListener("mouseenter", alertH1);

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// Old Way

// h1.onmouseenter = function (e) {
//   alert("addEventListener: Great! You are reading the heading ");
// };

//////////////////////////////////////////////////
/////////////////////////////////////////////////
// Event Propagation in Practice

console.log("\n");
console.log("---- Event Propagation in Practice ----");

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget);

  // Stop propagation
  // Generally not used
  // e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Container", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Nav", e.target, e.currentTarget);
});
