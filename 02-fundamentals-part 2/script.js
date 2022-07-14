'use strict'

////////////////////////////////////////////////////////////////////
/// Functions

function logger() {
    console.log('My name is Jonas');
}

// calling / running / invoking function
logger();

////////////////////////////////////////////////////////////////////
// function declaration vs expressions

// function name(parameters) {
//     function body
// }
// name(arguments)


// function expression / anonymous function

// const name = function (parameters) {
//     function body
// }
// name(arguments)


function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const appleJuice = fruitProcessor(5, 0); // receive the returned value in the function
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice)

 
function describeCountry(country,population,capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

const descPortugal = describeCountry('Portugal', 33, 'Lisboa')
const descBrazil  = describeCountry('Brazil', 212, 'Brasilia');
const descSpain = describeCountry('Spain', 110 ,'Barcelona')

console.log(descPortugal)
console.log(descBrazil)
console.log(descSpain)


function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}

const percChina1 = percentageOfWorld1(1441);
const percBrazil1 = percentageOfWorld1(212);
const percPortugal1 = percentageOfWorld1(33);
console.log(percChina1, percBrazil1, percPortugal1);


const percentageOfWorld2 = function(population) {
    return (population / 7900) * 100;
}

const percChina2 = percentageOfWorld2(1441);
const percBrazil2 = percentageOfWorld2(212);
const percPortugal2 = percentageOfWorld2(33);
console.log(percChina2, percBrazil2, percPortugal2);

////////////////////////////////////////////////////////////////////////
/// arrow function

// const name = one parameter => one line of code, 'return' can be omited in this case
// const name = (parameters) => {code}

const percentageOfWorld3 = population => (population / 7900) * 100;

const percChina3 = percentageOfWorld3(1441);
const percBrazil3 = percentageOfWorld3(212);
const percPortugal3 = percentageOfWorld3(33);
console.log(percChina3, percBrazil3, percPortugal3);

/////////////////////////////////////////////////////////////////////////
/// functions calling other functions

function cutFruitPieces(fruit) {
    return fruit * 4
}

function fruitProcessor2(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applePieces} apples and ${orangePieces} oranges.`;
    return juice;
}

console.log(fruitProcessor2(2, 3));

function describePopulation(country, population) {
    const perc = percentageOfWorld1(population);

    return `${country} has ${population} million people, which is about ${perc}% of the world.`;
}

console.log(describePopulation('China', 1441))

///////////////////////////////////////////////////////////////////////
/// Review Functions

const calcAge = function (birthYear) {
    return 2037 - birthYear;
}

const yearUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;

    if (retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years.`);
        return retirement;
    } else {
        console.log(`${firstName} has already retired!`);
        return 0;
    }
}

console.log(yearUntilRetirement(1991, 'Jonas'));
console.log(yearUntilRetirement(1950, 'Mike'));