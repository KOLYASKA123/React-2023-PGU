import express from 'express'
import Post from '../db/schemas/postSchema.js'

const router = express.Router()

router.get('/posts', async (req, res) => {
  const response = {
    ok: false,
    errMsg: 'Ошибка получения постов'
  }

  try {
    const posts = await Post.find({})

    response.ok = true
    response.errMsg = ''
    response.posts = posts || []

    res.status(200).json(response)
  } catch (error) {
    res.status(400).json(response)
  }
})

router.get('/post/:id', async (req, res) => {
  const response = {
    ok: false,
    errMsg: 'Ошибка получения поста'
  }

  const { id } = req.params

  try {
    const post = await Post.findOne({ '_id': id })

    response.ok = true
    response.errMsg = ''
    response.post = post || []

    res.status(200).json(response)
  } catch (error) {
    res.status(400).json(response)
  }
})

router.post('/post/add', async (req, res) => {
  const response = {
    ok: false,
    errMsg: 'Ошибка при добавлении поста'
  }

  const { body } = req
  try {
    const post = new Post({
      title: body.title,
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription,
      create_date: new Date()
    })

    await post.save()

    response.ok = true
    response.errMsg = ''
    response.postId = post._id.toString() // post.get('_id')
    res.status(200).json(response)

  } catch (error) {
    res.status(400).json(response)
  }
})

router.post('/post/:id/update', async (req, res) => {
  const response = {
    ok: false,
    errMsg: 'Ошибка обления поста'
  }

  const { id } = req.params
  const { body } = req

  console.log('body', body)

  try {
    const post = await Post.findOne({ '_id': id })

    post.title = body.title
    post.shortDescription = body.shortDescription
    post.fullDescription = body.fullDescription

    await post.save()
    
    response.ok = true
    response.errMsg = ''
    response.post = post || []

    res.status(200).json(response)
  } catch (error) {
    res.status(400).json(response)
  }
})

export default router