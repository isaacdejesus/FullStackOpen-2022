- Format of data changes from:
```typescript
  const course_parts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
```
- New data format is:
```typescript
    const course_parts = [
    {
        name: "Fundamentals",
        exerciseCount: 10,
        description: "This is an awesome course part"
    },
    {
        name: "Using props to pass data",
        exerciseCount: 7,
        groupProjectCount: 3
    },
    {
        name: "Basics of type Narrowing",
        exerciseCount: 7,
        description: "How to go from unknown to string"
    },
    {
        name: "Deeper type usage",
        exerciseCount: 14,
        description: "Confusing description",
        backgroundMaterial: "https://type-level-typescript.com/template-literal-types"
    },
    ];
```
- !!! Note each entry contains some shared attributes but also contain diff attributes
## We can define a type for each kind of entry:
```typescript
interface course_part_basic {
  name: string;
  exerciseCount: number;
  description: string;
  kind: "basic"
}

interface course_part_group {
  name: string;
  exerciseCount: number;
  groupProjectCount: number;
  kind: "group"
}

interface course_part_background {
  name: string;
  exerciseCount: number;
  description: string;
  backgroundMaterial: string;
  kind: "background"
}
```
- Next an union type can be created which accepts any of the above defined types
```typescript
type course_part = course_part_basic | course_part_group | course_part_background;
```
- Now the data array can be typed to be an array of type course_part
```typescript
    const course_parts: course_part[] = [
    {
        name: "Fundamentals",
        exerciseCount: 10,
        description: "This is an awesome course part",
        kind: "basic"
    },
    {
        name: "Using props to pass data",
        exerciseCount: 7,
        groupProjectCount: 3,
        kind: "group"
    },
    {
        name: "Basics of type Narrowing",
        exerciseCount: 7,
        description: "How to go from unknown to string",
        kind: "basic"
    },
    {
        name: "Deeper type usage",
        exerciseCount: 14,
        description: "Confusing description",
        backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
        kind: "background"
    },
    ];
```
- Notice a new attribute "kind" has been added to each entry. This allows compiler to throw err
  if attributes don't match type. .:. "kind" is used to narrow type of an entry to a more 
  specific type. 
## Removing duplicate code in types
- Since some attributes overlap it is best to create a base type and extend base type with 
  needed attributes. types.ts becomes:
```typescript
interface course_part_base {
  name: string;
  exerciseCount: number;
}

interface course_part_basic extends course_part_base {
  description: string;
  kind: "basic"
}

interface course_part_group extends course_part_base {
  groupProjectCount: number;
  kind: "group"
}

interface course_part_background extends course_part_base  {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

 export type course_part = course_part_basic | course_part_group | course_part_background;
```

## More type narrowing
- Currently it is only possible to access attributes that are common to all types in union bc ts only 
  allows access to attributes shared/valid for every object in the union. .:. attributes unique to ea
  types can't be accesses unless type is narrowed even further.
- Type can be narrowed by using a switch case and using "kind" attribute as unique identifier for each 
  object type. 
