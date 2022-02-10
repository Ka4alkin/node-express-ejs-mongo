const express = require('express')
const path = require('path')
const app = express()



const PORT = 3000

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`)

app.get('/',(req ,res)=>{
    res.sendFile(createPath('index'))
})

app.get('/contacts',(req,res)=>{
    res.sendFile(createPath('contacts'))
})

app.get('/posts',(req,res)=>{
    res.sendFile(createPath('posts'))
})

app.get('/post:id',(req,res)=>{
    res.sendFile(createPath('post'))
})

app.get('/add-post',(req,res)=>{
    res.sendFile(createPath('add-post'))
})


//redirects
app.get('/about-us',(req,res)=>{
    res.redirect('contacts')
})

//catch error
app.use((req,res)=>{
    res
        .status(404)
        .sendFile(createPath('error'))
})


//================================
app.listen(PORT,(error)=>{
    error ? console.log(error) : console.log(`Server has been started on PORT: ${PORT}`)
})

