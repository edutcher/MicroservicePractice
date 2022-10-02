const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const queryObj = {}

const handleEvent = ((type,data) => {

    if(type == 'CreatePost') {
        const {id, title} = data
        queryObj[id] = {
            id,
            title,
            comments: []
        }
    }

    if(type == 'CreateComment') {
        const {id, content, postId, status} = data
        queryObj[postId].comments.push({id, content, status})
    }

    if(type == 'UpdateComment') {
        const {id, content, postId, status} = data

        const comment = queryObj[postId].comments.find(comment => {
            return comment.id === id
        })

        comment.status = status
        comment.content = content
    }
})

app.post('/events', (req,res) => {
    console.log(req.body)
    const {type, data} = req.body

    handleEvent(type,data)

    return res.send({})
})

app.get('/posts', (req,res) => {
    return res.send(queryObj)
})

app.listen(4002, async () => {
    console.log('listening on 4002')

    try {
        const events = await axios.get('http://event-bus-srv:4005/events')

        for(const event of events) {
            handleEvent(event.type, event.data)
        }
    } catch (err) {

    }
})