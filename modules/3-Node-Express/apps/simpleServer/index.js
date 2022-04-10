const http = require('http')
let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-04-322332",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute javascript only",
        date: "2022-03-434343",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important of HTTP protocol",
        date: "2022-332-323",
        important: true
    }
]
    
const app = http.createServer((request, response) =>{
    response.writeHead(200, { 'Content-Type': 'application/json' })  //defines type of object to be returned
    response.end(JSON.stringify(notes)) //turns notes into json object
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
