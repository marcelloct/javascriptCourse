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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
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

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Promisifying the Geolocation API

console.log('\n');
console.log('---- Promisifying the Geolocation API ----');

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );
// console.log('Getting position: ');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject); // same results as above
  });
};

// getPosition().then(pos => console.log(pos));

const whereAmI2 = function () {
  getPosition()
    .then(pos => {
      console.log(pos.coords);
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })

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

// whereAmI2();

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Challenge #2

console.log('\n');
console.log('---- Challenge #2 ----');

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  // when promisifying always return your promise
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImage;

createImage('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => console.error(err));

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Consuming Promises with Async Await
// Error handling with try...catch

console.log('\n');
console.log('---- Consuming Promises with Async Await ----');

// when the function is done, it automatically returns a promise
const whereAmI3 = async function () {
  try {
    // Geolocation
    const pos = await getPosition(); // await the results of this promise
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country data

    // fetch(`https://restcountries.com/v2/name/${country}`).then(res=>console.log(res))
    // Same as using then, but more cleaner.

    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');

    const data = await res.json();
    // console.log(res)
    // console.log(data);
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} ☹`);
    renderError(` 😭 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

// whereAmI3();
// whereAmI3();

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Returning Values from Async Functions

console.log('1: Will get location');

// whereAmI3()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

// Using async/await with immediately invoked function expressions (IIFE)
(async function () {
  try {
    const city = await whereAmI3();
    console.log(`2: ${city}`);
  } catch (error) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: Finished getting location');
})();

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Running promises in parallel

// Ever use try catch with async

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    // console.log([data1.capital, data2.capital, data3.capital]);

    // load many promises at the same time, instead one after another
    // if one promise is rejected, all the promises are rejected
    // usage case: if you need to do multiple asynchronous operations at the same time, and operations that don't depend on one another, then you should always run them in parallel
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (error) {
    console.log(er);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Other promise combinators

// promise.race
// just like all other combinators, receives an array of promises and it also returns a promise
// the promise returned by promise.race is settled as soon as one of the input promises settles (a value is available, but it doesn't matter if the promise got fullfiled or rejected)

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(res[0]);
  // only get one result, the fastest one
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  // if timeout happens first, all of this here will be rejected
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(0.1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// promise.allSettled
// return an array of all the settled promises
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// promise.any [ES2021]
// return the first fullfiled promise
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Challenge #3

// PART 1
const loadNPause = async function () {
  try {
    // load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';
    // load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
};

// loadNPause();

// PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img)); // results in a array of promises
    console.log(imgs);

    const imgsEl = await Promise.all(imgs); // handle the array of promises
    console.log(imgsEl);

    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (error) {
    console.error(error);
  }
};

// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
