const express = require('express')
const router = express.Router()
const {
    getPosts,
    getPost,
    getEditPost,
    getAddPost,
    addPost,
    deletePost,
    editPost
} = require('../controllers/post-controller')

router.get('/posts', getPosts)
router.get('/post/:id', getPost)
router.get('/edit/:id', getEditPost)
router.get('/add-post', getAddPost)
//POSTS
router.post('/add-post', addPost)
//DELETE
router.delete('/post/:id', deletePost)
//PUT
router.put('/edit/:id', editPost)


module.exports = router