const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/omnistak', {
    useNewUrlParser: true
})

const app = express()

app.user(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})

app.use((req, res, next) => {
    req.io = io

    return next()
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')))

app.use(require('./routes'))

server.listen(3000)