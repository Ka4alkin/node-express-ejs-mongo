const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const Post = require('./models/post')
const Contact = require('./models/contacts')
const methodOverride = require('method-override')

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
app.use(express.static('scripts'))

//methodOverride
app.use(methodOverride('_method'))

//add-post-form
app.use(express.urlencoded({extended: false}))


//GET
app.get('/', (req, res) => {
    res.render(createPath('index'))
})

app.get('/contacts', (req, res) => {
    Contact
        .find()
        .then((contacts) => res.render(createPath('contacts'), {contacts}))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })

})

app.get('/posts', (req, res) => {
    Post
        .find()
        .sort({createdAt: -1})
        .then((posts) => res.render(createPath('posts'), {posts}))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })

})

app.get('/posts/:id', (req, res) => {
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('post'), {post}))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })
})

app.get('/edit/:id', (req, res) => {
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('edit-post'), {post}))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })
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
        // .then((result) => res.send(result))
        .then((result) => res.redirect('/posts'))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })

    // res.render(createPath('post'), {post})
})


//DELETE

app.delete('/posts/:id', (req, res) => {
    Post
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })
})

//PUT
app.put('/edit/:id', (req, res) => {
    const {title, author, text} = req.body

    Post
        .findByIdAndUpdate(req.params.id, {title, author, text})
        .then((result) => res.redirect(`/posts/${req.params.id}`))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })
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

