import express from 'express'
import {
  getAllSubtasks,
  getSubtasksByUser,
  getSubtasksByTaskId,
  getSubtaskById,
  addSubtask,
  updateSubtask,
  deleteSubtask,
  updateSubtaskStatus,
  getSubtaskStats,
  getSubtasksByStatus,
  searchSubtasks,
  getSubtasksByDateRange,
} from '../Controller/subtaskController.js'

const router = express.Router()

// Base route
router.get('/', (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: 'Subtasks API is running',
    endpoints: {
      'GET /': 'API status',
      'GET /all': 'Get all subtasks (admin)',
      'GET /user/:userId': 'Get subtasks by user ID',
      'GET /task/:taskId': 'Get subtasks by task ID',
      'GET /task/:taskId/subtask/:id': 'Get single subtask by ID',
      'POST /task/:taskId': 'Add new subtask',
      'PUT /task/:taskId/subtask/:id': 'Update subtask',
      'DELETE /task/:taskId/subtask/:id': 'Delete subtask',
      'PATCH /task/:taskId/subtask/:id/status': 'Update subtask status',
      'GET /task/:taskId/stats': 'Get subtask statistics',
      'GET /status/:status': 'Get subtasks by status',
      'GET /search': 'Search subtasks',
      'GET /date-range': 'Get subtasks by date range',
    },
  })
})

// Admin endpoint - Get all subtasks
router.get('/all', getAllSubtasks)

// User-specific endpoints
router.get('/user/:userId', getSubtasksByUser)

// Task-specific endpoints
router.get('/task/:taskId', getSubtasksByTaskId)
router.get('/task/:taskId/subtask/:id', getSubtaskById)
router.post('/task/:taskId', addSubtask)
router.put('/task/:taskId/subtask/:id', updateSubtask)
router.delete('/task/:taskId/subtask/:id', deleteSubtask)
router.patch('/task/:taskId/subtask/:id/status', updateSubtaskStatus)
router.get('/task/:taskId/stats', getSubtaskStats)

// Filtering and search endpoints
router.get('/status/:status', getSubtasksByStatus)
router.get('/search', searchSubtasks)
router.get('/date-range', getSubtasksByDateRange)

export default router
