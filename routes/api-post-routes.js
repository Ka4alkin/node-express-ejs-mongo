const express = require('express')
const router = express.Router()
const {
    getPosts,
    getPost,
    editPost,
    addPost,
    deletePost,
} = require('../controllers/api-post-controller')

router.get('/api/posts', getPosts)
router.get('/api/post/:id', getPost)
router.post('/api/post', addPost)
router.delete('/api/post/:id', deletePost)
router.put('/api/post/:id', editPost)


module.exports = router