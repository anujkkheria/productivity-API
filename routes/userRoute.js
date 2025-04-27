import express from 'express'

const app = express()

const router = app.router

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'you have successfully reached users',
  })
})

router.get('/getall', (req, res) => {
  return res.status(200).send({
    message: 'success',
  })
})

export default router
