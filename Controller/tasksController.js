import { pool } from '../utils/DBConnection.js'

// const TasksQueries  = {
//     getTasksbyId : `select * from tasks where user`
// }

const TasksQueries = {
  getAllTasks: `SELECT * FROM tasks ORDER BY created_at DESC`,
  getTasksbyId: `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
  getTaskById: `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`,
  addTasks: `INSERT INTO tasks (task_name, user_id, planned_date, description, priority, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
  updateTask: `UPDATE tasks SET task_name = $1, planned_date = $2, description = $3, priority = $4, status = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 AND user_id = $7 RETURNING *`,
  deleteTask: `DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *`,
  getTasksByStatus: `SELECT * FROM tasks WHERE user_id = $1 AND status = $2 ORDER BY created_at DESC`,
  getTasksByPriority: `SELECT * FROM tasks WHERE user_id = $1 AND priority = $2 ORDER BY created_at DESC`,
  searchTasks: `SELECT * FROM tasks WHERE user_id = $1 AND (task_name ILIKE $2 OR description ILIKE $2) ORDER BY created_at DESC`,
  getTasksByDateRange: `SELECT * FROM tasks WHERE user_id = $1 AND planned_date BETWEEN $2 AND $3 ORDER BY planned_date ASC`,
  updateTaskStatus: `UPDATE tasks SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING *`,
  getTaskStats: `SELECT 
    COUNT(*) as total_tasks,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_tasks,
    COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_tasks,
    COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority_tasks
    FROM tasks WHERE user_id = $1`,
}

// Get all tasks (admin endpoint)
export const getAllTasks = async (req, res, next) => {
  try {
    const result = await pool.query(TasksQueries.getAllTasks)
    return res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    return next(error)
  }
}

// Get tasks by user ID
export const getTasksbyID = async (req, res, next) => {
  try {
    const uid = req.params.id
    const result = await pool.query(TasksQueries.getTasksbyId, [uid])
    return res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    return next(error)
  }
}

// Get single task by ID
export const getTaskById = async (req, res, next) => {
  try {
    const { id, userId } = req.params
    const result = await pool.query(TasksQueries.getTaskById, [id, userId])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Task retrieved successfully',
      data: result.rows[0],
    })
  } catch (error) {
    return next(error)
  }
}

// Add new task
export const AddTasks = async (req, res, next) => {
  try {
    const uid = req.params.id
    const {
      taskName,
      plannedDate,
      description = '',
      priority = 'medium',
      status = 'pending',
    } = req.body

    if (!taskName || !plannedDate) {
      return res.status(400).json({
        success: false,
        message: 'Task name and planned date are required',
      })
    }

    const result = await pool.query(TasksQueries.addTasks, [
      taskName,
      uid,
      plannedDate,
      description,
      priority,
      status,
    ])

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: result.rows[0],
    })
  } catch (error) {
    return next(error)
  }
}

// Update task
export const updateTask = async (req, res, next) => {
  try {
    const { id, userId } = req.params
    const { taskName, plannedDate, description, priority, status } = req.body

    if (!taskName || !plannedDate) {
      return res.status(400).json({
        success: false,
        message: 'Task name and planned date are required',
      })
    }

    const result = await pool.query(TasksQueries.updateTask, [
      taskName,
      plannedDate,
      description || '',
      priority || 'medium',
      status || 'pending',
      id,
      userId,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: result.rows[0],
    })
  } catch (error) {
    return next(error)
  }
}

// Delete task
export const deleteTask = async (req, res, next) => {
  try {
    const { id, userId } = req.params
    const result = await pool.query(TasksQueries.deleteTask, [id, userId])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: result.rows[0],
    })
  } catch (error) {
    return next(error)
  }
}

// Get tasks by status
export const getTasksByStatus = async (req, res, next) => {
  try {
    const { userId, status } = req.params
    const result = await pool.query(TasksQueries.getTasksByStatus, [
      userId,
      status,
    ])

    return res.status(200).json({
      success: true,
      message: `Tasks with status '${status}' retrieved successfully`,
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    return next(error)
  }
}

// Get tasks by priority
export const getTasksByPriority = async (req, res, next) => {
  try {
    const { userId, priority } = req.params
    const result = await pool.query(TasksQueries.getTasksByPriority, [
      userId,
      priority,
    ])

    return res.status(200).json({
      success: true,
      message: `Tasks with priority '${priority}' retrieved successfully`,
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    return next(error)
  }
}

// Search tasks
export const searchTasks = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { query } = req.query

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      })
    }

    const searchTerm = `%${query}%`
    const result = await pool.query(TasksQueries.searchTasks, [
      userId,
      searchTerm,
    ])

    return res.status(200).json({
      success: true,
      message: 'Search completed successfully',
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    return next(error)
  }
}

// Get tasks by date range
export const getTasksByDateRange = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { startDate, endDate } = req.query

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required',
      })
    }

    const result = await pool.query(TasksQueries.getTasksByDateRange, [
      userId,
      startDate,
      endDate,
    ])

    return res.status(200).json({
      success: true,
      message: 'Tasks in date range retrieved successfully',
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    return next(error)
  }
}

// Update task status only
export const updateTaskStatus = async (req, res, next) => {
  try {
    const { id, userId } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      })
    }

    const result = await pool.query(TasksQueries.updateTaskStatus, [
      status,
      id,
      userId,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Task status updated successfully',
      data: result.rows[0],
    })
  } catch (error) {
    return next(error)
  }
}

// Get task statistics
export const getTaskStats = async (req, res, next) => {
  try {
    const { userId } = req.params
    const result = await pool.query(TasksQueries.getTaskStats, [userId])

    return res.status(200).json({
      success: true,
      message: 'Task statistics retrieved successfully',
      data: result.rows[0],
    })
  } catch (error) {
    return next(error)
  }
}
