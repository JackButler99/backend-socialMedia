const router = require('express').Router()
const Post = require('../models/post')
const mongoose = require('mongoose')

const auth = require('../middleware/auth.js')

//Get Posts
router.get('/', async(req, res)=> {
  const { page } = req.query
  try {
    const LIMIT = 9 
    const startIndex = (Number(page)-1) * LIMIT  //Get the starting index of every page.
    const total = await Post.countDocuments({})

    const posts = await Post.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)
    res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)})
    
  }catch (error){res.status(404).json({message: error.message})}
})

//Get Post
router.get('/:id', async(req,res)=> {
  const { id } = req.params
  try {
    const post = await Post.findById(id) 
    res.status(200).json(post)
  } catch (error){
    res.status(404).json({message: error})
  }
})

//Search Post
router.get('/search', async(req,res)=> {
  const { searchQuery, tags } = req.query
  try {
    const title = new RegExp(searchQuery, 'i')
    const posts = await PostMessage.find({ $or: [{title}, {tags: { $in: tags.split(',')}}] })
    res.json({data: posts})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

//Create Post
router.post('/', auth, async (req, res) => {
  const post = req.body
  const newPost = new Post({ ...post, createdAt: new Date().toISOString()})
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
})

//Update Post
router.patch('/:id', auth, async (req, res)=> {
  const {id: _id} =req.params
  
  const post = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, {new: true})

  res.json(updatedPost)  
})

//Delete Post 
router.delete('/:id', auth, async (req, res) => {
  const { id:_id } = req.params
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
  await PostMessage.findByIdAndRemove(_id)
  res.json({message: 'Post deleted succesfully'})

})

// Like Post 
router.patch('/:id/likePost', auth, async (req, res) => {
  const {id: _id} = req.params
  
  if (!req.userId) return res.json({message: 'Unauthenticated'})
  
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const post  = await PostMessage.findById(_id)
  const index = post.likes.findIndex((_id)=> _id === String(req.userId))
  
  if (index === -1){
    //like the post
    post.likes.push(req.userId)
  } else {
    //dislike the post
    post.likes =post.likes.filter((_id)=> _id !== String(req.userId))
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })  
  res.status(200).json(updatedPost)

})

router.get('/mock', (req, res)=> {
  try{
    res.json({message : 'Hello there'})
  } catch (error) {
    res.send(error)
  }
})

module.exports = router