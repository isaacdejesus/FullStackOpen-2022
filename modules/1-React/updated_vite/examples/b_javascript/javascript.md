## Variables
```javascript
const value = "my value can't be changed";
let variable = "My value can be reassigned";
```
## arrays
```javascript
const arr = [1, 3, 6, 9];
console.log(arr.length);
console.log(arr[0]);
```
- looping array
    ```javascript
    arr.forEach(value => { //for each takes a function defined using arrow notation a parameter
        console.log(value * value)  //for each call the function for each value in the array
                        //in this case the function logs the square of each value
    })
    ```
## Adding values to an array
- When using react, the prefered method for interacting with components are immutable data structures/functional programming.
  In this case we use concat, which creates a new array and adds the new value at the end
    ```javascript
    const arr2 = arr.concat(0); //concat 5 at the end of the new array
    console.log(arr2)
    ```
## map()
- map() takes a function as parameter and maps each value in array into function returning a new array containing results
    ```javascript
    const mappedResults = arr2.map(value => value * value);  //squares each value
    console.log(mappedResults);
    ```
## Destructuring assignment
```javascript
    const numbers = [ 1, 2, 3, 4, 5 ];
    const [first, second, ...rest] = numbers; //assigns 1 for first, 2 to second and the remaining 
    //values are stores in a new array called rest.
    console.log(first, second); //prints 1 and 2
    console.log(rest); //prints 3, 4, 5
```
## Object literals
```javascript
const object1 = {
    name: 'Isaac R',
    age: 35,
    education: 'N/A',
}

const object2 = {
    name: {
        first: 'Joe',
        last: "Nosee" ,
    },
    grades: [10, 3, 6, 8],
    department: 'Computer Science',
}
```

- Object values can be accessed using dot notation or []
    ```javascript
    console.log(object2.name);
    console.log(object2["grades"]);
    ```
- Adding properties to objects
    ```javascript
    object1.address = "Some random location"
    object1["secret password"] = "3h3k3k"; //[] allows us to add attributes with spaces
    console.log(object1["secret password"]);
    ```

- Functions
    ```javascript
    const sum = (p1, p2) => {
        return p1 + p2;
    }
    //If a single parameter we can ommit ()
    const square = p => {
        return p * p;
    }
    //if single expression can ommit {}
    const smallerSquare = p => p * p; //shorter version of square function defined above
    ```
- Objects and this: We can assign methods to an object that are functions
    ```javascript
    const person = {
        name: "Isaac Reyes",
        age: 33,
        education: "N/A",
        greet: function() {
            console.log("Hello, my namee is " + this.name)
        },
    }
    person.greet();  //prints hello, my namee is Isaac Reyes
    ```
- Methods can also be assigned after object creation
    ```javascript
    person.growOlder = function() {
        this.age +=1;
    }
    console.log(person.age);
    person.growOlder();
    console.log(person.age);
    ```
## classes
```javascript
    class Person {
        constructor(name, age){
            this.name = name;
            this.age = age;
        }
        greet() {
            console.log("Hello, my name is " + this.name);
        }
    }
    
    //create instances of Person
    const joe = new Person("Joe", 33);
    joe.greet();
```
