"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// App

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition(); // when the object has created (loads page), trigger this method immediatelly

    form.addEventListener("submit", this._newWorkout.bind(this));

    inputType.addEventListener("change", this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          // function for error
          alert("Could not get your location");
        }
      );
  }

  _loadMap(position) {
    // function for success
    console.log(position);
    //  const latitude = position.coords.latitude;
    const { latitude } = position.coords; // Same as above, but using deconstructuring
    const { longitude } = position.coords;
    console.log(latitude, longitude);
    console.log(`https://www.google.com.br/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    // Leaflet API
    console.log(this);
    this.#map = L.map("map").setView(coords, 13);
    console.log(this.#map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    // .on - method from leaflet
    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();
    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
    // Displaying a Map Marker
    console.log(this.#mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup",
        })
      )
      .setPopupContent("Workout")
      .openPopup();
  }
}

const app = new App();
