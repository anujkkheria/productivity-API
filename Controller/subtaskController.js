import { pool } from '../utils/DBConnection.js'

const SubtaskQueries = {
  getSubtasksByTaskId: `SELECT * FROM subtasks WHERE parent_task_id = $1 ORDER BY sequence_num ASC, created_at ASC`,
  getSubtaskById: `SELECT * FROM subtasks WHERE id = $1 AND parent_task_id = $2`,
  addSubtask: `INSERT INTO subtasks (parent_task_id, subtask_name, sequence_num, status, planned_date, comments) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
  updateSubtask: `UPDATE subtasks SET subtask_name = $1, sequence_num = $2, status = $3, planned_date = $4, comments = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 AND parent_task_id = $7 RETURNING *`,
  deleteSubtask: `DELETE FROM subtasks WHERE id = $1 AND parent_task_id = $2 RETURNING *`,
  updateSubtaskStatus: `UPDATE subtasks SET status = $1, updated_at = CURRENT_TIMESTAMP, completed_on = CASE WHEN $1 = 'completed' THEN CURRENT_TIMESTAMP ELSE NULL END WHERE id = $2 AND parent_task_id = $3 RETURNING *`,
  getSubtaskStats: `SELECT 
    COUNT(*) as total_subtasks,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_subtasks,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_subtasks,
    COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_subtasks
    FROM subtasks WHERE parent_task_id = $1`,
  getAllSubtasks: `SELECT s.*, t.task_name as parent_task_name, t.user_id 
    FROM subtasks s 
    JOIN tasks t ON s.parent_task_id = t.id 
    ORDER BY s.created_at DESC`,
  getSubtasksByUser: `SELECT s.*, t.task_name as parent_task_name 
    FROM subtasks s 
    JOIN tasks t ON s.parent_task_id = t.id 
    WHERE t.user_id = $1 
    ORDER BY s.created_at DESC`,
  getSubtasksByStatus: `SELECT s.*, t.task_name as parent_task_name, t.user_id 
    FROM subtasks s 
    JOIN tasks t ON s.parent_task_id = t.id 
    WHERE s.status = $1 
    ORDER BY s.created_at DESC`,
  searchSubtasks: `SELECT s.*, t.task_name as parent_task_name, t.user_id 
    FROM subtasks s 
    JOIN tasks t ON s.parent_task_id = t.id 
    WHERE (s.subtask_name ILIKE $1 OR s.comments ILIKE $1) 
    ORDER BY s.created_at DESC`,
  getSubtasksByDateRange: `SELECT s.*, t.task_name as parent_task_name, t.user_id 
    FROM subtasks s 
    JOIN tasks t ON s.parent_task_id = t.id 
    WHERE s.planned_date BETWEEN $1 AND $2 
    ORDER BY s.planned_date ASC`,
}

// Get all subtasks (admin endpoint)
export const getAllSubtasks = async (req, res, next) => {
  try {
    const result = await pool.query(SubtaskQueries.getAllSubtasks)
    return res.status(200).json({
      success: true,
      message: 'Subtasks retrieved successfully',
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    return next(error)
  }
}

// Get subtasks by user ID
export const getSubtasksByUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const result = await pool.query(SubtaskQueries.getSubtasksByUser, [userId])
    return res.status(200).json({
      success: true,
      message: 'Subtasks retrieved successfully',
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    return next(error)
  }
}

// Get subtasks by task ID
export const getSubtasksByTaskId = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const result = await pool.query(SubtaskQueries.getSubtasksByTaskId, [
      taskId,
    ])

    return res.status(200).json({
      success: true,
      message: 'Subtasks retrieved successfully',
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    return next(error)
  }
}

// Get single subtask by ID
export const getSubtaskById = async (req, res, next) => {
  try {
    const { id, taskId } = req.params
    const result = await pool.query(SubtaskQueries.getSubtaskById, [id, taskId])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subtask not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Subtask retrieved successfully',
      data: result.rows[0],
    })
  } catch (error) {
    return next(error)
  }
}

// Add new subtask
export const addSubtask = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const {
      subtaskName,
      sequenceNum = null,
      status = 'pending',
      plannedDate = null,
      comments = null,
    } = req.body

    if (!subtaskName) {
      return res.status(400).json({
        success: false,
        message: 'Subtask name is required',
      })
    }

    const result = await pool.query(SubtaskQueries.addSubtask, [
      taskId,
      subtaskName,
      sequenceNum,
      status,
      plannedDate,
      comments,
    ])

    return res.status(201).json({
      success: true,
      message: 'Subtask created successfully',
      data: result.rows[0],
    })
  } catch (error) {
    return next(error)
  }
}

// Update subtask
export const updateSubtask = async (req, res, next) => {
  try {
    const { id, taskId } = req.params
    const { subtaskName, sequenceNum, status, plannedDate, comments } = req.body

    if (!subtaskName) {
      return res.status(400).json({
        success: false,
        message: 'Subtask name is required',
      })
    }

    const result = await pool.query(SubtaskQueries.updateSubtask, [
      subtaskName,
      sequenceNum,
      status || 'pending',
      plannedDate,
      comments,
      id,
      taskId,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subtask not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Subtask updated successfully',
      data: result.rows[0],
    })
  } catch (error) {
    return next(error)
  }
}

// Delete subtask
export const deleteSubtask = async (req, res, next) => {
  try {
    const { id, taskId } = req.params
    const result = await pool.query(SubtaskQueries.deleteSubtask, [id, taskId])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subtask not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Subtask deleted successfully',
      data: result.rows[0],
    })
  } catch (error) {
    return next(error)
  }
}

// Update subtask status only
export const updateSubtaskStatus = async (req, res, next) => {
  try {
    const { id, taskId } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      })
    }

    const result = await pool.query(SubtaskQueries.updateSubtaskStatus, [
      status,
      id,
      taskId,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subtask not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Subtask status updated successfully',
      data: result.rows[0],
    })
  } catch (error) {
    return next(error)
  }
}

// Get subtask statistics for a task
export const getSubtaskStats = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const result = await pool.query(SubtaskQueries.getSubtaskStats, [taskId])

    return res.status(200).json({
      success: true,
      message: 'Subtask statistics retrieved successfully',
      data: result.rows[0],
    })
  } catch (error) {
    return next(error)
  }
}

// Get subtasks by status
export const getSubtasksByStatus = async (req, res, next) => {
  try {
    const { status } = req.params
    const result = await pool.query(SubtaskQueries.getSubtasksByStatus, [
      status,
    ])

    return res.status(200).json({
      success: true,
      message: `Subtasks with status '${status}' retrieved successfully`,
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    return next(error)
  }
}

// Search subtasks
export const searchSubtasks = async (req, res, next) => {
  try {
    const { query } = req.query

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      })
    }

    const searchTerm = `%${query}%`
    const result = await pool.query(SubtaskQueries.searchSubtasks, [searchTerm])

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

// Get subtasks by date range
export const getSubtasksByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required',
      })
    }

    const result = await pool.query(SubtaskQueries.getSubtasksByDateRange, [
      startDate,
      endDate,
    ])

    return res.status(200).json({
      success: true,
      message: 'Subtasks in date range retrieved successfully',
      data: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    return next(error)
  }
}
