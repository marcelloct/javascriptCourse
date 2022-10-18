"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");

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

//////////////////////////////////////////////////
/////////////////////////////////////////////////
// Event Delegation - Page Navigation

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  // console.log(e.target);
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    // console.log("LINK");

    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//////////////////////////////////////////////////
/////////////////////////////////////////////////
// Building a Tabbed Component

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // remove active classes
  tabs.forEach(t => t.classList.remove("operations__tab--active"));
  tabsContent.forEach(c => c.classList.remove("operations__content--active"));

  // Active tab
  clicked.classList.add("operations__tab--active");

  // Active content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//////////////////////////////////////////////////
/////////////////////////////////////////////////
// Passing Arguments to Event Handlers - Menu dade animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(el => {
      if (el != link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// passing 'argument' into hancler
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

//////////////////////////////////////////////////
/////////////////////////////////////////////////
// Implementing a Sticky Navigation - The Scroll Event

//////////////////////////////////////////////////
/////////////////////////////////////////////////
//////////////////////////////////////////////////
/////////////////////////////////////////////////
//////////////////////////////////////////////////
/////////////////////////////////////////////////
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
// Implementing Smooth Scrolling - Button Scrolling

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

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);

//   //// Stop propagation
//   //// Generally not used
//   //// e.stopPropagation();
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Container", e.target, e.currentTarget);
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Nav", e.target, e.currentTarget);
// });

//////////////////////////////////////////////////
/////////////////////////////////////////////////
// DOM Traversing

console.log("\n");
console.log("---- DOM Traversing ----");

// Going downwards: child
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "white";

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// IMPORTANT ONE, especially for event delegation
// h1.closest(".header").style.background = "var(--gradient-secondary)";

// h1.closest("h1").style.background = "var(--gradient-primary)";

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });
