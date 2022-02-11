const createPath = require('../helpers/create-path')
const Post = require("../models/post");

const handleError = ((res, error) => {
    console.log(error)
    res.render(createPath('error'), {title: 'Error'})
})

const getPosts = ((req, res) => {
    Post
        .find()
        .sort({createdAt: -1})
        .then((posts) => res.render(createPath('posts'), {posts}))
        .catch((error) => handleError(res, error))

})

const getPost = ((req, res) => {
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('post'), {post}))
        .catch((error) => handleError(res, error))
})

const getEditPost = ((req, res) => {
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('edit-post'), {post}))
        .catch((error) => handleError(res, error))
})


const getAddPost = ((req, res) => {
    res.render(createPath('add-post'))
})

const addPost = ((req, res) => {
    const {title, author, text} = req.body
    const post = new Post({title, author, text})
    post
        .save()
        // .then((result) => res.send(result))
        .then((result) => res.redirect('/posts'))
        .catch((error) => handleError(res, error))

    // res.render(createPath('post'), {post})
})

const deletePost = ((req, res) => {
    Post
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => handleError(res, error))
})

const editPost = ((req, res) => {
    const {title, author, text} = req.body

    Post
        .findByIdAndUpdate(req.params.id, {title, author, text})
        .then((result) => res.redirect(`/post/${req.params.id}`))
        .catch((error) => handleError(res, error))
})

module.exports = {
    getPosts,
    getPost,
    getEditPost,
    getAddPost,
    addPost,
    deletePost,
    editPost
}