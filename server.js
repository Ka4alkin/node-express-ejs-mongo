const express = require('express')
const path = require('path')
const app = express()

app.set('view engine','ejs')

const PORT = 3000

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

app.get('/',(req ,res)=>{
    res.render(createPath('index'))
})

app.get('/contacts',(req,res)=>{
    res.render(createPath('contacts'))
})

app.get('/posts',(req,res)=>{
    res.render(createPath('posts'))
})

app.get('/post:id',(req,res)=>{
    res.render(createPath('post'))
})

app.get('/add-post',(req,res)=>{
    res.render(createPath('add-post'))
})


//redirects
app.get('/about-us',(req,res)=>{
    res.redirect('contacts')
})

//catch error
app.use((req,res)=>{
    res
        .status(404)
        .render(createPath('error'))
})


//================================
app.listen(PORT,(error)=>{
    error ? console.log(error) : console.log(`Server has been started on PORT: ${PORT}`)
})

