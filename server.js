const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const Post = require('./models/post')

app.set('view engine', 'ejs')

const PORT = 3000

//db
const db = 'mongodb+srv://ka4alkin:cegthnfyr@cluster0.uwzsc.mongodb.net/node-blog-test?retryWrites=true&w=majority'


mongoose
    // .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error))
//---
const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

app.use(express.static('styles'))

//add-post-form
app.use(express.urlencoded({extended: false}))


//GET
app.get('/', (req, res) => {
    res.render(createPath('index'))
})

app.get('/contacts', (req, res) => {
    const contacts = [
        {name: 'youtube'},
        {name: 'twitter'}
    ]
    res.render(createPath('contacts'), {contacts})
})

app.get('/posts', (req, res) => {
    const posts = [
        {
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
            data: '29.02.2020',
            author: 'Nazar'
        },
        {
            id: 2,
            title: 'sunt aut face turi optio reprehenderit',
            text: 'quia et nostrum rerum est autem sunt rem eveniet architecto',
            data: '19.12.2320',
            author: 'Taras'
        }
    ]
    res.render(createPath('posts'), {posts})
})

app.get('/post:id', (req, res) => {
    const post = {
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        text: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        data: '29.02.2020',
        author: 'Nazar'
    }
    res.render(createPath('post'), {post})
})

app.get('/add-post', (req, res) => {
    res.render(createPath('add-post'))
})

//POSTS

app.post('/add-post', (req, res) => {
    const {title, author, text} = req.body
    const post = new Post({title, author, text})
    post
        .save()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })

    // res.render(createPath('post'), {post})
})


//redirects
app.get('/about-us', (req, res) => {
    res.redirect('contacts')
})

//catch error
app.use((req, res) => {
    res
        .status(404)
        .render(createPath('error'))
})


//================================
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Server has been started on PORT: ${PORT}`)
})

