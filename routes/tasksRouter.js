import express from 'express'
import {
  getAllTasks,
  getTasksbyID,
  getTaskById,
  AddTasks,
  updateTask,
  deleteTask,
  getTasksByStatus,
  getTasksByPriority,
  searchTasks,
  getTasksByDateRange,
  updateTaskStatus,
  getTaskStats,
} from '../Controller/tasksController.js'

const router = express.Router()

// Base route
router.get('/', (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: 'Tasks API is running',
    endpoints: {
      'GET /': 'API status',
      'GET /all': 'Get all tasks (admin)',
      'GET /user/:id': 'Get tasks by user ID',
      'GET /user/:userId/task/:id': 'Get single task by ID',
      'POST /user/:id/add': 'Add new task',
      'PUT /user/:userId/task/:id': 'Update task',
      'DELETE /user/:userId/task/:id': 'Delete task',
      'GET /user/:userId/status/:status': 'Get tasks by status',
      'GET /user/:userId/priority/:priority': 'Get tasks by priority',
      'GET /user/:userId/search': 'Search tasks',
      'GET /user/:userId/date-range': 'Get tasks by date range',
      'PATCH /user/:userId/task/:id/status': 'Update task status',
      'GET /user/:userId/stats': 'Get task statistics',
    },
  })
})

// Admin endpoint - Get all tasks
router.get('/all', getAllTasks)

// User-specific endpoints
router.get('/user/:id', getTasksbyID)
router.get('/user/:userId/task/:id', getTaskById)
router.post('/user/:id/add', AddTasks)
router.put('/user/:userId/task/:id', updateTask)
router.delete('/user/:userId/task/:id', deleteTask)

// Filtering and search endpoints
router.get('/user/:userId/status/:status', getTasksByStatus)
router.get('/user/:userId/priority/:priority', getTasksByPriority)
router.get('/user/:userId/search', searchTasks)
router.get('/user/:userId/date-range', getTasksByDateRange)

// Status update endpoint
router.patch('/user/:userId/task/:id/status', updateTaskStatus)

// Statistics endpoint
router.get('/user/:userId/stats', getTaskStats)

export default router
