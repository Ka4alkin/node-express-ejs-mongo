const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postsRoutes = require('./routes/post-routes')
const contactRoutes = require('./routes/contact-routes')
const createPath = require('./helpers/create-path')
const postApiRoutes = require('./routes/api-post-routes')
const app = express()
app.set('view engine', 'ejs')

const PORT = 3000

//db

mongoose
    // .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    // .connect(db)
    .connect(process.env.MONGO_URL)
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

