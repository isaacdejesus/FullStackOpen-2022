

## Set Up project
-   ```typescript
        npm init
    ```
-   ```typescript
        npm install typescript --save-dev
    ```
- tsc is typescript's compiler. tsc can be used to initialize tsconfig.json file.
- Add tsc to scrips:
    ```typescript
        {
            // ..
            "scripts": {
                "tsc": "tsc"
            },
            // ..
        }
    ```
- Intialize project:
    ```typescript
        npm run tsc -- -- init
    ```
- Activate the following options in tsconfig.json
    ```typescript
    {
        "compilerOptions": {
            "target": "ES6",
            "outDir": "./build/",
            "module": "commonjs",
            "strict": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "noImplicitReturns": true,
            "noFallthroughCasesInSwitch": true,
            "esModuleInterop": true
        }
    }
    ```
- target: Tells compiler which ECMAScript version to use when generating javascript. ES6 is widely supported
- outDir: Tells where compiled code should be placed
- module: Tells want to use CommonJS modules in compiled code. Allows use require syntax instead of import 
  which is not supported bu older versions of node
- strict: is shorthand for:
    - noImplicitAny
    - noImplicitThis
    - alwaysStrict,
    - strictBindCallApply
    - strictNullChecks
    - strictFunctionTypes
    - strictPropertyInitialization
- noUnusedLocals: Prevents unused local variables
- noUnusedParameters:  Throw error if function has unused paremeters
- noImplicitReturns: Checks that all code paths return a value
- noFallthroughCasesInSwitch: Ensures all cases in switch end with return or break statement
- esModuleInterop: Allows interoperabilty between CommonJS and ES Modules
- Install express, types for express and eslint
    ```javascript
        npm install express
        npm install --save-dev eslint @types/express @typescript-eslint/eslint-plugin @typescript-eslint/parser
    ```
- created .eslintrc file
    ```javascript
        {
            "extends": [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking"
            ],
            "plugins": ["@typescript-eslint"],
            "env": {
                "browser": true,
                "es6": true,
                "node": true
            },
            "rules": {
                "@typescript-eslint/semi": ["error"],
                "@typescript-eslint/explicit-function-return-type": "off",
                "@typescript-eslint/explicit-module-boundary-types": "off",
                "@typescript-eslint/restrict-template-expressions": "off",
                "@typescript-eslint/restrict-plus-operands": "off",
                "@typescript-eslint/no-unsafe-member-access": "off",
                "@typescript-eslint/no-unused-vars": [
                    "error",
                    { "argsIgnorePattern": "^_" }
                ],
                "no-case-declarations": "off"
            },
            "parser": "@typescript-eslint/parser",
            "parserOptions": {
                "project": "./tsconfig.json"
            }
        }
    ```
- Install ts-node-dev for hot reloading
    ```javascript
        npm install --save-dev ts-node-dev
    ```
- Add script to package.json
    ```javascripts
    {
        // ...
        "scripts": {
            "tsc": "tsc",
            "dev": "ts-node-dev index.ts",
            "lint": "eslint --ext .ts ."
    },
    // ...
    }
    ```
- Create index.ts
    ```javascript
        import express from 'express';
        const app = express();
        app.use(express.json());
        const PORT = 3000;
        app.get('/ping', (_req, res) => {
            console.log('someone pinged here');
            res.send('pong');
        });
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    ```
