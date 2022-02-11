const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postsRoutes = require('./routes/post-routes')
const contactRoutes = require('./routes/contact-routes')
const createPath = require('./helpers/create-path')
const postApiRoutes = require('./routes/api-post-routes')

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

app.use(postsRoutes)
app.use(contactRoutes)
app.use(postApiRoutes)


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

