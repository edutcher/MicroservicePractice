const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

app.post('/events', async (req,res) => {
    console.log(req.body)

    const {type, data} = req.body

    if(type == 'CreateComment') {
        let status = data.content.includes('orange') ? 'rejected' : 'approved'

        const {id, postId, content} = data

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id,
                postId,
                content,
                status
            }
        }) 
    }

    return res.send({})
})

app.listen(4003, () => {
    console.log('Listening on port 4003')
})