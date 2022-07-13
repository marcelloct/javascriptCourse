const country = "Brazil";
const continent = "South America";
let population = 212

const isIsland = false
let language
let notValueDefined = null

console.log(typeof country)
console.log(continent)
console.log(population)
console.log(isIsland)
console.log(language)
console.log(notValueDefined)
console.log(country, continent)
console.log(country + ' - ' + continent)
console.log(`${country} - ${continent}`)

language = "portuguese"

let count = 10 + 5
console.log(count)
count += 10 // count = count + 10
console.log(count)
count++
console.log(count)

console.log(population > count)

let splitPopulation = population / 2
console.log(splitPopulation)
splitPopulation++
console.log(splitPopulation)
console.log(population >= 6)
let description = `${country} is in ${continent}, an it is ${population} million people speak ${language}`
console.log(description)

// --------------------------------------------- Challenge #1

// let massMark = 78;
// let heightMark = 1.69;
// let massJohn = 92;
// let heightJohn = 1.95;

let massMark = 95;
let heightMark = 1.88;
let massJohn = 85;
let heightJohn = 1.76;

let BMIMark = massMark / heightMark ** 2;
let BMIJohn = massJohn / (heightJohn * heightJohn);
let markHigherBMI = BMIMark > BMIJohn

console.log(BMIMark, BMIJohn, markHigherBMI);

// --------------------------------------------- Challenge #1 Complete

console.log(`String
in multiple lines
with template literals 😊`);

if (population >= 33) {
    console.log(`${country}'s population is above average`)
} else {
    console.log(`${country}'s population is ${33 - population} million below average`)
}

// --------------------------------------------- Challenge #2

if (BMIMark > BMIJohn) {
    console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})`)
} else {
    console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})`)
}

// --------------------------------------------- Challenge #2 Complete

// type conversion
const inputYear = '1991';
console.log(inputYear + 18);
console.log(Number(inputYear) + 18)
console.log(String(18))

// type coercion
console.log('i am ' + 23 + ' years old')
console.log('23' - '10' - 3)
console.log('23' > '18')
console.log('20' / '2')


console.log('9' - '5');
console.log('19' - '13' + '17');
console.log('19' - '13' + 17);
console.log('123' < 57);
console.log(5 + 6 + '4' + 9 - 4 - 2);