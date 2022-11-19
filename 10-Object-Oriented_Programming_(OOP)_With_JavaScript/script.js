"use strict";

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Constructor Functions and the new Operator

console.log("---- Constructor Functions and the new Operator ----");

// The constructor function is a completely normal function, the only difference is we call a constructor function with the new operator
// Function expression and function declaration both work as constructor, arrow function don't, because it doesn't have its own this keyword

// Constructor
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this
  // Never create a method inside of the constructor function

  // this.calcAge = function(){
  //     console.log(2037 - this.birthYear);
  // }
};

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automaticaly return {}

// jonas, matilda, jack are instances of Person
const jonas = new Person("Jonas", 1991);
const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
console.log(jonas, matilda, jack);

console.log(jonas instanceof Person);

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Prototypes

console.log("\n");
console.log("---- Prototypes ----");

// Every function in Javascript automaticaly has a property called prototype
// All the objects that are created through this constructor function will inherit, get access, to all the methods and properties that are defined on this prototype property. e.g: Person.prototype

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

// Person.prototype is not the prototype of Person
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = "Homo Sapiens";
console.log(jonas.species, matilda.species);
console.log(jonas);

// own properties are only the ones that are declared directly on the object itself, not including the inherited properties
console.log(jonas.hasOwnProperty("firstName"));
console.log(jonas.hasOwnProperty("species"));

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Prototypal Inheritance and The Prototype Chain

console.log("\n");
console.log("---- Prototypal Inheritance and The Prototype Chain ----");

console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 4, 4, 5, 6, 8, 8]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ == Array.prototype);

console.log(arr.__proto__.__proto__);

// added a new method to the prototype property of the array constructor
// all arrays inherited this method
// avoid use this, because Javascript might add a method with the same name
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir(h1);
console.dir(x => x + 1);

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Challenge #1

console.log("\n");
console.log("---- Challenge #1 ----");

// 1.
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

console.log(bmw, mercedes);

// 2.
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} Km/h`);
};

// 3.
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} Km/h`);
};

// 4.
bmw.accelerate();
mercedes.accelerate();
bmw.brake();
mercedes.brake();

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// ES6 Classes

console.log("\n");
console.log("---- ES6 Classes ----");

// Modern syntax

// class expression
// const PersonCl = class {}

// class declaration

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance Methods
  // Method will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // static Method
  static hey() {
    console.log("Hey there ✌");
  }
}

const jessica = new PersonCl("Jessica Davis", 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.fullName}`);
};

jessica.greet();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizes
// 3. Classes are executed in strict mode

// const walter = new PersonCl("Walter", 1965);

PersonCl.hey();

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Setters and Getters

console.log("\n");
console.log("---- Setters and Getters ----");

// Getters and setters are basically functions that get and set a value
// Can be used in any object
// used too for data validations

const account = {
  owner: "Jonas",
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Static Methods

console.log("\n");
console.log("---- Static Methods ----");

// Methods that are available/attached to the entire constructor (e.g: Array.from() Number.parseFloat()) and not to the prototype property of the constructor (e.g: [1,2,3].from() 12.parseFloat())
console.log(Array.from(document.querySelectorAll("h1")));
console.log(Number.parseFloat(12));

Person.hey = function () {
  console.log("Hey there ✌");
  // console.log(this);
};

Person.hey();
// jonas.hey(); // Not inhereted

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Object create

console.log("\n");
console.log("---- Object create ----");

// Object create creates a new object and the prototype of that object will be the object that we passed in

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
sarah.calcAge();

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Challenge #2

console.log("\n");
console.log("---- Challenge #2 ----");

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} Km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} Km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl("Ford", 120);

console.log(ford);

console.log(ford.speedUS);

ford.speedUS = 50;
console.log(ford);

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Inheritance Between Classes - Constructor Functions

console.log("\n");
console.log("---- Inheritance Between Classes Constructor Functions ----");

const PersonIn = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonIn.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(PersonIn.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof PersonIn);

console.dir(Student.prototype.constructor);
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Challenge #3

console.log("\n");
console.log("---- Challenge #3 ----");

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

const tesla = new EV("Tesla", 120, 23);
console.log(tesla);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

tesla.accelerate();

tesla.chargeBattery(90);
console.log(tesla);

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Inheritance Between Classes - ES6 Classes

console.log("\n");
console.log("---- Inheritance Between Classes - ES6 Classes ----");

class PersonClIn {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log("Hey there ✌");
  }
}

class StudentCl extends PersonClIn {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl("Martha Jones", 2012, "Computer Science");
martha.introduce();
martha.calcAge();

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Inheritance Between Classes - Object.create

console.log("\n");
console.log("---- Inheritance Between Classes - Object.create ----");

const PersonProto2 = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const StudentProto = Object.create(PersonProto2);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto2.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "computer Science");
jay.introduce();
jay.calcAge();

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Another Class Example

console.log("\n");
console.log("---- Another Class Example ----");

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property
    this._pin = pin;
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved`);
    }
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);

// acc1.movements.push(250)
// acc1.movements.push(-140)
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
// acc1.approveLoan(1000);
console.log(acc1);
console.log(acc1.getMovements());

///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Encapsulation - Protected Properties and Methods

console.log("\n");
console.log("---- Encapsulation - Protected Properties and Methods ----");

// Prevent code from outside of a class to accidentally manipulate our data inside the class
// Fake private

// _property (see examples above)
