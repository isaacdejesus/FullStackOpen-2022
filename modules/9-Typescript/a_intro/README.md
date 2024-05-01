## Typescript
- Typescript is a typed superset of javascript which is compiled into plain javascript. 
- Since TS is a superset of JS, means it includes all deatures of JS .:. all JS code
  is valid TS code
- TS consists of 3 parts:
    - Language: Is syntax, keywords and type annotations
    - Compiler: Transpiles TS code into JS. Compiler also performs static code analysis and emits 
      warnings or errors if found.  
    - Language service: Collects type info from source code. Type info is used to provide
      intellisence, type hints and refactoring alternatives
## Typescript Key language features
- Type annotations: 
    ```typescript
        const birthdayGreeter = (name: string, age: number): string => {
        return `Happy birthday ${name}, you are now ${age} years old!`;
        };
        const birthdayHero = "Jane User";
        const age = 22;
        console.log(birthdayGreeter(birthdayHero, age));
    ```
    - Above function takes 2 arguments. A string and a number, and it returns a string
- Type inference:
    - TS compiler attempts to infer type info if no types specified. 
    - Type is inferred based on assigned value during initialization and their usage.
    ```javascript
        const add = (a: number, b: number) => {
        return a + b;  //return type is inferred from return value
    ```
    - Since return value is a number + number, return type is inferred to be a number
- Type Erasure:
    - TS removes all type system constructgs during compilation
    ```javascript
        let x: sometype;
    ```
    - Output:
    ```javascript
        let x;
    ```
    - Meaning no type info remains at runtime
## Incomplete, invalid or missing types for external libraries
- External libraries might require installation of types that match library
- Sometimes need to use type assertions and type guards to help compiler narrow down the type


