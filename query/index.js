const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const queryObj = {}

app.post('/events', (req,res) => {
    console.log(req.body)
    const {type, data} = req.body

    if(type == 'CreatePost') {
        const {id, title} = data
        queryObj[id] = {
            id,
            title,
            comments: []
        }
    }

    if(type == 'CreateComment') {
        const {id, content, postId} = data
        queryObj[postId].comments.push({id, content})
    }

    return res.send({})
})

app.get('/posts', (req,res) => {
    return res.send(queryObj)
})

app.listen(4002, () => {
    console.log('listening on 4002')
})