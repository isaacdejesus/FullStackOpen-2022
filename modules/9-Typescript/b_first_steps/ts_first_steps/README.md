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
  to access content of error. Above, in the try catch, the type of error is narrowed using 
  instanceof  type guard.
    ```typescript
        if (error instanceof Error) {
            errorMessage += error.message;
        }
    ```
## @types/{npm_package}
- TS expects all code to be typed. However, TS library only has typings for code of the TS package.
- npm packages must also be typed. Can create own types but types are usually available on npm
- types for existing packages can be found from @types organization within npm. Types can be added
  to project by installing npm package with name of package: @types/ prefix
  ```typescript
        npm install --save-dev @types/react @types/express @types/lodash @types/jest @types/mongoose
  ```
- Sometimes npm package includes types .:. there is no need to separately install types
## Accessing CLI args
- Installing node type
    ```typescript
        npm install --save-dev @types/node
    ```
## Adding scripts to package.json to run programs
    ```typescript
        {
            "name": "fs-open",
            "version" : "1.0.0",
            "description": "",
            "main": "index.ts",
            "scripts": {
                "ts-node": "ts-node",
                "multiply": "ts-node multiplier.ts",
                "calculate": "ts-node calculator.ts"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {
                "ts-node": "^10.5.0",
                "typescript": "^4.5.5"
            }
        }
    ```
- Updated code for multiplier:
    ```typescript
        interface MultiplyValues {
            value1: number;
            value2: number;
        }

        const parseArguments = (args: string[]): MultiplyValues => {
            if (args.length < 4) throw new Error('Not enough arguments');
            if (args.length > 4) throw new Error('Too many arguments');

        if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
            return {
                value1: Number(args[2]),
                value2: Number(args[3])
            }
        } else {
            throw new Error('Provided values were not numbers!');
            }
        }

        const multiplicator = (a: number, b: number, printText: string) => {
        console.log(printText,  a * b);
        }

        try {
            const { value1, value2 } = parseArguments(process.argv);
            multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
        } catch (error: unknown) {
            let errorMessage = 'Something bad happened.'
            if (error instanceof Error) {
                errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
    ```
- Multiplier can now be run: npm run multiply arg0 arg 1
- Note: parseArg function returns an object containing 2 numbers
## Array syntax
```typescript
    let values: number[];
    let values: Array<number>;
```
## tsconfig continued
- tsconfig contains config on how TS should work in project
- update tsconfig to following:
    ```typescript
        {
        "compilerOptions": {
        "target": "ES2022",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "noImplicitAny": true,
        "esModuleInterop": true,
        "moduleResolution": "node"
            }
        }
    ```
- Finding info about config options
    - https://www.typescriptlang.org/tsconfig/
    - http://json.schemastore.org/tsconfig
## Adding express
    ```typescript
        npm i express
    ```
- add start script for express to package.json
    ```typescript
        {
            // ..
            "scripts": {
                "ts-node": "ts-node",
                "multiply": "ts-node multiplier.ts",
                "calculate": "ts-node calculator.ts",
                "start": "ts-node index.ts"
             },
            // ..
        }
     ```
- Create index.ts 
```typescript
import express from 'express'
const app = express();

app.get('/ping', (req, res) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
- Above results in: "Could not find declaration file for module: express". Means need to install types for express
    ```typescript
        npm install --save-dev @types/express
    ```   
- 2 ways to import modules:
    - const express = require('express')
    - import express from 'express'
- Trial and error? Kinda have to test which of the above methods works? Sometimes need to use a mix
    - import ... = require('...')
- 'noUnusedParameters': true. This rule raises errors when variables are defined but never used. Can be 
  fixed by prefixing variable with _
     ```typescript
        import express from 'express'
        const app = express();
        app.get('/ping', (_req, res) => {
            res.send('pong');
        });
        const PORT = 3003;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    ```
- Now there won't be any errors bc _req goes unused
- install ts-node-dev for hot reloading of app
    ```javascript
        npm install --save-dev ts-node-dev
    ```
- Add script to package.json
    ```typescript
        {
            // ...
            "scripts": {
                // ...
                "dev": "ts-node-dev index.ts",
            },
            // ...
        }
    ```
- Run app: npm run dev
- localhost:3003/ping 
