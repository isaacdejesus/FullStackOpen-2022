## Building a simple web server using node.js
- Recall: Node.js is Javascript runtime based on Google's Chrome V8 Javascript engine
- Browser doesn't support newest feats of javascript which is why code running in browser must be transpiled
- Node.js on the backend does support latest features of javascript .:. there is no need to transpile code
- Create dir for backend
- npm init
- init will create the package.json file
- NOTE: be sure to switch app entry point from index.js to index.ts
- App can be run with: node index.ts
- But it's best to add a script to package.json to run the app with npm
```javascript
{
  // ...
  "scripts": {

    "start": "node index.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
``` 
- Now app can be run with: npm start
- NOTE: Need to install node types
    - npm i --save-dev @types/node
- Code for index.ts
```javascript
const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```
- Now run app with: npm start 
- Check localhost:3001
