## Create react app with ts using vite
```javascript
npm create vite@latest NAME -- --template react-ts
```
## The main.tsx file
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```
- NOTE: statement `document.getElementById('root')!`
- The ! tells compiler that value is not null. Bc we know there is an element with id "root" in 
  the index.html file. 

## Props and typing return type of component
```typescript
const Welcome = ({name}: {name: string}): JSX.Element => {
    return(
        <h1> Hello, {name}</h1>
    )
}
const App = () => {
    return (
        <div>
            <Welcome name="Joey" />
        </div>
    )
}
export default App
```
- Return type of component can be typed as `JSX.Element` as shown in Welcome component but it isn't
  necessary as compiler can determine return type. 
# Rest of the section is in the course exercise readme
