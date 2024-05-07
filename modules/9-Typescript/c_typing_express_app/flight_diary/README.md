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
- !!!: Want to separate source code from config files. .:. create a src folder and put index.ts in it
- Create src/index.ts
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
- Run app in dev mode: npm run dev
# Creating production build 
- Recall that outdir option was set to build in tsconfig
- Running the tsc compiler will create production ready js and place it inside build folder
- npm run tsc
## Create `.eslintignore` file for build dir files
- Add .eslintignore to root dir
- Add content to be ignore just like on .gitignore

## Add script to run app in production mode
- !!!: UPDATED script paths
```typescript
{
  // ...
  "scripts": {
    "tsc": "tsc",
    "dev": "ts-node-dev src/index.ts",
    "lint": "eslint --ext .ts .",
    "start": "node build/index.js"
  },
  // ...
}
```
- Check that production build works: npm run start
# Routing
- Create src/routes folder and create diaries.ts in it
```typescript
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Fetching all diaries!');
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});
export default router;
```
- Update index.ts
```typescript
import express from 'express';
import diaryRouter from './routes/diaries';
const app = express();
app.use(express.json());
const PORT = 3000;
app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.use('/api/diaries', diaryRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```
# Seed data
- create data folder and create entries.json in it
```
[
    {
        "id": 1,
        "date": "2017-01-01",
        "weather": "rainy",
        "visibility": "poor",
        "comment": "Pretty scary flight, I'm glad I'm alive"
    },
    {
        "id": 2,
        "date": "2017-04-01",
        "weather": "sunny",
        "visibility": "good",
        "comment": "Everything went better than expected, I'm learning much"
    },
    {
        "id": 3,
        "date": "2017-04-15",
        "weather": "windy",
        "visibility": "good",
        "comment": "I'm getting pretty confident although I hit a flock of birds"
    },
    {
        "id": 4,
        "date": "2017-05-11",
        "weather": "cloudy",
        "visibility": "good",
        "comment": "I almost failed the landing but I survived"
    }
]
```
# Services 
- Good practice to separate business logic from router code into modules called services
- Services will take care of data manipulation
- Create src/services folder and create diary_service.ts in it
```typescript
import diaryData from '../../data/entries.json';

const getEntries = () => {
  return diaryData;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};
```
- Since data is in json need to activate "resolveJsonModule" in tsconfig
## Create types.ts 
```typescript
export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
export type Visibility = 'great' | 'good' | 'ok' | 'poor';
export interface Diary_Entry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}
```
- comment? means that comment is optional .:. entry can ommit comment field
- weather and visibility are union type of allowed strings. Meaning on values stated
  there are valid string inputs
 ## Typing seed data
 - Convert src/data/entries.json to src/data/entries.ts
 - ts file means we can type the data using types created above
 - data is typed as follows
 ```typescript
import {Diary_Entry} from '../src/types'
const diary_entries: Diary_Entry[] = 
[
    {
        "id": 1,
        "date": "2017-01-01",
        "weather": "rainy",
        "visibility": "poor",
        "comment": "Pretty scary flight, I'm glad I'm alive"
    },
    {
        "id": 2,
        "date": "2017-04-01",
        "weather": "sunny",
        "visibility": "good",
        "comment": "Everything went better than expected, I'm learning much"
    },
    {
        "id": 3,
        "date": "2017-04-15",
        "weather": "windy",
        "visibility": "good",
        "comment": "I'm getting pretty confident although I hit a flock of birds"
    },
    {
        "id": 4,
        "date": "2017-05-11",
        "weather": "cloudy",
        "visibility": "good",
        "comment": "I almost failed the landing but I survived"
    }
];

export default diary_entries;
 ```
 - !!! data is assigned to a variable and can now be exported and imported into other modules
## Typing /src/services/diary_service.ts
```typescript
import diary_data  from '../../data/diaries';
import {Diary_Entry, Weather, Visibility} from '../types'
const diaries: Diary_Entry[] = diary_data as Diary_Entry[];

const getEntries = (): Diary_Entry[] => {
  return diaries;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};
```
- !!!: 3rd line, type assertion must be used bc compiler expects weather and visibility to be strings. However,
  we are setting weather to be a type that accepts either sunny, rainy, cloudy, windy or stormy. Same for visi
  bility, compiler expects a string but we are using a type that accepts great, good, ok or poor. 
  .:. type assertion must be used to silence warning
## resolveJsonModule
- file precedence: js, json, node, ts, tsx
- resolveJsonModule causes .json files to take precedence over .ts
- Meaning if have 2 files with same name but diff extension and try to import, the one with highest precedence will
  be imported. .:. it is suggested all files have unique names
## Utility types
- Needed to create a "censored" version of an existing type. Suppose have data which contains sensitive and non-sen
  sitive data. Want to make sure non-sensitive data isn't used or displayed. 
- pick: utility type can be used to select which fields of existing type want to use
    - Ex. to create a censored version of diary_entry data using pick
        ```typescript
        const getNonSensitiveEntries =
            (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
                // ...
            }
        ```
    - Above select all fields except "comment" field
- Omit: utility type to declare which fields to exclude
    - Ex. to create a censored version of diary_entry data using omit
        ```typescript
        const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] => {
            // ...
            }
        ```
    - Tells it to omit the "comment" field
- Creating a type alias to be able to export modified type
```typescript
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
```
- types.ts becomes
```typescript
export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface Diary_Entry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}
export type Non_Sensitive_Diary_Entry = Omit<Diary_Entry, 'comment'>;
```
- src/services/diary_service.ts becomes
```typescript
import diary_data  from '../../data/diaries';
import {Diary_Entry, Non_Sensitive_Diary_Entry} from '../types'
const diaries: Diary_Entry[] = diary_data as Diary_Entry[];

const getEntries = (): Diary_Entry[] => {
  return diaries;
};

const get_non_sensitive_diary_entries = (): Non_Sensitive_Diary_Entry[] => {
    return diaries;
};

const addDiary = () => {
  return null;
};

export default {
    getEntries,
    addDiary,
    get_non_sensitive_diary_entries
};
```
- Note, newly created get_non_sensitive_diary_entries is returning the entire diary entry including the 
  "comment" field. No error is given bc ts only checks to make sure all required fields are included but
  doesn't check for excess fields. .:. we must modify data to exclude fields ourselves. 
- src/services/diary_service becomes
```typescript
import diaries from '../../data/entries.ts'
import { NonSensitiveDiaryEntry, DiaryEntry } from '../types'
const getEntries = () : DiaryEntry[] => {
  return diaries
}
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};
const addDiary = () => {
  return null;
}
export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary
}
```
- Updated function will raise error if trying to type it with Diary_Entry type since
  updated function doesn't return "comments" field

- src/routes/diaries.ts  can be updated to
```typescript
import express from 'express';
import diary_service from '../services/diary_service'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diary_service.get_non_sensitive_diary_entries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
```
- index.ts is main file which assign API routes avaialble
- src/routes/route.ts defines the HTTP operations available to that route: GET, POST, ETC
- src/services/service.ts contains functions with logic that handles data. These functions
  are used by route to implement GET, POST, ETC funtionalities
## GET single resource and undefined
- Create a new HTTP GET request to route api/diaries/:id 
- src/services/diary_service.ts becomes
```typescript
import diary_data  from '../../data/diaries';
import {Diary_Entry, Non_Sensitive_Diary_Entry} from '../types'
const diaries: Diary_Entry[] = diary_data as Diary_Entry[];
const getEntries = (): Diary_Entry[] => {
  return diaries;
};
const get_non_sensitive_diary_entries = (): Non_Sensitive_Diary_Entry[] => {
    return diaries.map(({id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
const find_by_id = (id: number): Diary_Entry | undefined => {
    const entry = diaries.find(d => d.id === id)
    return entry;
}
const addDiary = () => {
  return null;
};
export default {
    getEntries,
    addDiary,
    get_non_sensitive_diary_entries,
    find_by_id,
};
```
- !!!: Since entry can be undefined, the return type needs to be Diary_Entry | undefined
- Meaning, it is okay for entry to be undefined bc we expect items returned to be either
  an entry or undefined bc it doesn't exist
- Existance of entry is checked in router
- src/routes/diaries.ts becomes
```typescript
import express from 'express';
import diary_service from '../services/diary_service'
const router = express.Router();
router.get('/', (_req, res) => {
  res.send(diary_service.get_non_sensitive_diary_entries());
});
router.get('/:id', (req, res) =>{
    const diary = diary_service.find_by_id(Number(req.params.id));
    if(diary)
        res.send(diary);
    else
        res.sendStatus(404);
});
router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});
export default router;
```
- Grab the parameterized id, cast to number then use the find_by_id function to search for the entry
  with that given id. Next, since expect entry to either exist or be undefined, check, if it exists
  entry is returned else 404 is returned

## Adding new diary/ HTTP POST
- src/routes/diaries.ts becomes
```typescript
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import diary_service from '../services/diary_service'
const router = express.Router();
router.get('/', (_req, res) => {
  res.send(diary_service.get_non_sensitive_diary_entries());
});
router.get('/:id', (req, res) =>{
    const diary = diary_service.find_by_id(Number(req.params.id));
    if(diary)
        res.send(diary);
    else
        res.sendStatus(404);
});
router.post('/', (req, res) => {
    const { date, weather, visibility, comment } = req.body;
    const new_entry = diary_service.add_diary({
        date, 
        weather,
        visibility,
        comment,
    });
    res.json(new_entry);
});
export default router;
```
- req.body contains an object with: date, weather, visibility and comment. Data sent by user on req.body
  is used to create a new object/entry using the add_diary function. Newly created entry is returned to
  user in json format
- First line is added to disable no unsafe assignment which prevents us from assigning fields of req.body
  to variables.
- src/services/diary_service.ts becomes
```typescripts
import diary_data  from '../../data/diaries';
import {Diary_Entry, Non_Sensitive_Diary_Entry, New_Diary_Entry} from '../types'
const diaries: Diary_Entry[] = diary_data as Diary_Entry[];
const getEntries = (): Diary_Entry[] => {
  return diaries;
};
const get_non_sensitive_diary_entries = (): Non_Sensitive_Diary_Entry[] => {
    return diaries.map(({id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
const find_by_id = (id: number): Diary_Entry | undefined => {
    const entry = diaries.find(d => d.id === id)
    return entry;
}
const add_diary = (entry: New_Diary_Entry): Diary_Entry => {
        const new_diary_entry = {
            id: Math.max(...diaries.map(d => d.id)) + 1,
            ...entry
        };
        diaries.push(new_diary_entry);
        return new_diary_entry;
};
export default {
    getEntries,
    add_diary,
    get_non_sensitive_diary_entries,
    find_by_id,
};
```
- Since the new diary object from user doesn't include id, a new type New_Diary_Entry is created which
  only contains: date, weather, visibility and comment fields. The Omit utility type is used to create 
  a modified alias type with above fields from existing type Diary_Entry type.
- Also, since data is being stored in a file, logic is added to the function to create and assign id to
  new entries. 
- Finally, a new entry is created by creating a new object with data provided by user + id and new object 
  is added to array containing diaries data. add_diary returns the newly created entry which is returned 
  in POST request to front end.
