## Set up
- TS code is not executable by itself, it must first be transpiled into executable JS. When
  TS is transpiled into JS, code becomes subject to type erasure. Meaning type annotations, interfaces 
  and type aliases are removed resulting in pure ready to run JS
- In Production env, there must be a build step. During build step TS code is compiled into JS in a 
  separate folder and production env runs code from that folder.

- In dev env, it is easier to use real time compilation and auto reloading so view results quicker.
- ts-node compiles and executes ts file immediatedly
- Install both ts-node and typescript globally:
    - npm install --location=global ts-node typescript
- Install both ts-node and typescript locally for current project
    - Create project dir
    - Set up project: npm init
    - Install ts-node and ts as project dependencies: npm install --save0dev ts-node typescript
    - Set up script in package.json: "ts-node": "ts-node"
        ```javascript
        {
            // ..
            "scripts": {
                "ts-node": "ts-node"
            },
            // ..
        } 
        ```
    - Now project can be run: npm run ts-node 
    - Note: If using ts-node via package.json CLI arguments must be prefixed with --
    ```javascripts
        npm run ts-node file.ts -- -s --someoption
    ```
- https://www.typescriptlang.org/play/
- Add tsconfig.json file wtih following content:
```javascript
{
  "compilerOptions":{
    "noImplicitAny": false
  }
}
```
- tsconfig.json defines how TS compiler should interpret the code, how strictly the compiler should be
  which files to watch/ignore and more.
    - Currently only setting the compiler option noImplicitAny to false which means not all variables
- Simple multiplier function: Create multiplier.ts, 
```javascript
const multiplicator = (a, b, printText) => {
  console.log(printText,  a * b);
}

multiplicator(2, 4, 'Multiplied numbers 2 and 4, the result is:');
```
- Compile: npm run ts-node -- multiplier.ts
- Code above is js and will compile just fine.
- However, if we pass the wrong inputs there will be errors since there is no type checking
```javascripts
const multiplicator = (a, b, printText) => {
  console.log(printText,  a * b);
}
multiplicator('how about a string?', 4, 'Multiplied a string and 4, the result is:');
```
- Above results in trying to multiply a string with a number. While expected args are number X number
  Above results in NaN
- Function can be typed as follows to make sure expected inputs are passed.
```javascripts
const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText,  a * b);
}
multiplicator('how about a string?', 4, 'Multiplied a string and 4, the result is:');
```
- Now function expects 2 numbers and a string. Code won't compile bc the wrong parameters are being
  passed.
- Note: function types are primitives. number and string type
## Creating own types
- Expand multiplicator into a calculator that supports addition and division. 
- Now function accepts 3 arguments: 2 numbers and the operation(multiply, add or divide) to be performed
- Create own type which describes our desired operation:
    ```typescript
        type Operation = 'multiply' | 'add' | 'divide';
    ```
- Now Operation type accepts three values: multiply, add or divide
- Union type: Using or operator |, we can define variable that can accept multiple values. 
- Union type can also be used to create a type that takes string | number
- type keyword defines a new name ofr a type/a type alias.
- Updated calculator code
```typescript
type Operation = 'multiply' | 'add' | 'divide';
const calculator = (a: number, b: number, op: Operation) : number => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':

      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    case 'add':
      return a + b;
    default:

      throw new Error('Operation is not multiply, add or divide!');
  }
}

try {
  console.log(calculator(1, 5 , 'divide'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
```
- Now calc function has a return type of number. If attempt to divide by 0 or invalid
  operation is given, it throws an error.
## Type Narrowing
- The default type of catch block error is unknown. Meaning, need to narrow down the type in order
  to access content of error. Above, in the try catch, the type of error is narrowed using a type guard.
    ```typescript
        if (error instanceof Error) {
            errorMessage += error.message;
        }
    ```

