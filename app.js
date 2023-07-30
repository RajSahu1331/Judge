const http = require('http')
const fs = require('fs')

const localServer = http.createServer((req, res) => {
    console.log("Server is initialised");
    res.end("Hello from Server");
})

const port = 8000

localServer.listen(port, (req, res) => {
    console.log("Server Started !")
})