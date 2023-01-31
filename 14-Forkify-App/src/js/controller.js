// controller is like a bridge between model and views

import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// console.log(icons);

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// The files we see in browser using parcel, came from dist folder (compiled files), is a compilation of our code into this 'package' ready to the browsers

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. Loading Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// window.addEventListener('hashchange', controlRecipes)
// window.addEventListener('load',controlRecipes)
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
