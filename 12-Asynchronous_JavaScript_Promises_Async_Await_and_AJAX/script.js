'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
     <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Our First AJAX Call_ XMLHttpRequest

console.log('\n');
console.log('---- Our First AJAX Call_ XMLHttpRequest ----');

// https://github.com/public-apis/public-apis

// Old way
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    renderCountry(data);
  });
};

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Callback Hell

// Nested Callbacks, callback inside callback
// Not a good practice, prefire use 'promises'

console.log('\n');
console.log('---- Callback Hell ----');

// setTimeout(() => {
//     console.log('1 sec passed');
//     setTimeout(() => {
//       console.log('2 sec passed');
//       setTimeout(() => {
//         console.log('3 sec passed');
//         setTimeout(() => {
//           console.log('4 sec passed');
//         },1000);
//       },1000);
//     },1000);
//   },1000);

const getCountryandNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // render country
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      // console.log(this.responseText);
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryandNeighbour('usa');

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Promises and FETCH API

// Promise : An object that is used as a placeholder for the future result of an asynchronous operation.
// A container for a future value. e.g: Response from AJAX call

// We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results
// Insted of nesting callbacks, we can chain promises for a sequence of asynchronous operations: escaping callback hell

console.log('\n');
console.log('---- Promises and FETCH API ----');

// Modern way - FETCH API
const requestFetch = fetch(`https://restcountries.com/v2/name/portugal`);

console.log(requestFetch);

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Consume Promises

console.log('\n');
console.log('---- Consume Promises ----');

const getCountryData2 = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`) // returning a promise
    .then(function (response) {
      // .then handle the promise
      console.log(response);
      return response.json(); // call the .json method to read the data on that response object, also return a promise
    })
    .then(function (data) {
      // handle the promise resulted from json method
      console.log(data); // now we can access the data
      renderCountry(data[0]);
    });
};

// getCountryData2('portugal');

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Chaining Promises

console.log('\n');
console.log('---- Chaining Promises ----');

const getCountryDataChaining = function (country) {
  // country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};

// getCountryDataChaining('portugal');

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Handling Rejected Promises

console.log('\n');
console.log('---- Handling Rejected Promises ----');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryDataRej = function (country) {
  // country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      //console.log(data[0]);
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour')) // then - called when promise is fulfilled
    .catch(err => {
      // catch - called when promise is rejected
      console.error(`${err} `);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      // finally - is gonna be called always. e.g: hide loading spinners
      countriesContainer.style.opacity = 1;
    });
};

// for simulate an error, in network tab on inspection, set offline and click the button

btn.addEventListener('click', function () {
  getCountryDataRej('portugal');
});
// getCountryDataRej('sfgsgse');
// getCountryDataRej('australia');

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Challenge #1

console.log('\n');
console.log('---- Challenge #1 ----');

const whereAmI = function (lat, lng) {
  console.log(lat, lng);
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      // console.log(response);
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`Something went wrong ${err.message}. Try again!`);
    });
};

// whereAmI(19.037, 72.873);
// whereAmI(52.508, 13.381);
// whereAmI(-33.933, 18.474);

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// The Event loop in practice

console.log('\n');
console.log('---- The Event loop in practice ----');

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1') // create a promisse that is immediately resolved
  .then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end');

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Building a simple promise

console.log('\n');
console.log('---- Building a simple promise ----');

// promise constructor
const lotteryPromise = new Promise(function (resolve, reject) {
  // executor function

  console.log(`Lotter draw is happening:`);

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve(`You win`); // fullfiled
    } else {
      reject(new Error(`You Lost`)); // rejected
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(3)
  .then(() => {
    console.log(`1 second(s) passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`2 second(s) passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`3 second(s) passed`);
    return wait(1);
  });

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x)); // reject promise immediately
