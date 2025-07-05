# Tasks API Documentation

## Base URL

```
http://localhost:3000/api/tasks
```

## Authentication

All endpoints require user authentication. User ID is passed as a parameter in the URL.

## Endpoints Overview

### 1. API Status

**GET** `/`

- **Description**: Check if the API is running and see all available endpoints
- **Response**: List of all available endpoints

### 2. Get All Tasks (Admin)

**GET** `/all`

- **Description**: Retrieve all tasks from all users (admin only)
- **Response**: Array of all tasks

### 3. Get User Tasks

**GET** `/user/:id`

- **Description**: Get all tasks for a specific user
- **Parameters**:
  - `id` (path): User ID
- **Response**: Array of user's tasks

### 4. Get Single Task

**GET** `/user/:userId/task/:id`

- **Description**: Get a specific task by ID
- **Parameters**:
  - `userId` (path): User ID
  - `id` (path): Task ID
- **Response**: Single task object

### 5. Create New Task

**POST** `/user/:id/add`

- **Description**: Create a new task for a user
- **Parameters**:
  - `id` (path): User ID
- **Body**:
  ```json
  {
    "taskName": "string (required)",
    "plannedDate": "YYYY-MM-DD (required)",
    "description": "string (optional, default: '')",
    "priority": "low|medium|high (optional, default: 'medium')",
    "status": "pending|in_progress|completed (optional, default: 'pending')"
  }
  ```
- **Response**: Created task object

### 6. Update Task

**PUT** `/user/:userId/task/:id`

- **Description**: Update an existing task
- **Parameters**:
  - `userId` (path): User ID
  - `id` (path): Task ID
- **Body**:
  ```json
  {
    "taskName": "string (required)",
    "plannedDate": "YYYY-MM-DD (required)",
    "description": "string (optional)",
    "priority": "low|medium|high (optional)",
    "status": "pending|in_progress|completed (optional)"
  }
  ```
- **Response**: Updated task object

### 7. Delete Task

**DELETE** `/user/:userId/task/:id`

- **Description**: Delete a task
- **Parameters**:
  - `userId` (path): User ID
  - `id` (path): Task ID
- **Response**: Deleted task object

### 8. Get Tasks by Status

**GET** `/user/:userId/status/:status`

- **Description**: Get tasks filtered by status
- **Parameters**:
  - `userId` (path): User ID
  - `status` (path): Task status (pending, in_progress, completed)
- **Response**: Array of tasks with specified status

### 9. Get Tasks by Priority

**GET** `/user/:userId/priority/:priority`

- **Description**: Get tasks filtered by priority
- **Parameters**:
  - `userId` (path): User ID
  - `priority` (path): Task priority (low, medium, high)
- **Response**: Array of tasks with specified priority

### 10. Search Tasks

**GET** `/user/:userId/search?query=searchterm`

- **Description**: Search tasks by name or description
- **Parameters**:
  - `userId` (path): User ID
  - `query` (query): Search term
- **Response**: Array of matching tasks

### 11. Get Tasks by Date Range

**GET** `/user/:userId/date-range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

- **Description**: Get tasks within a date range
- **Parameters**:
  - `userId` (path): User ID
  - `startDate` (query): Start date (YYYY-MM-DD)
  - `endDate` (query): End date (YYYY-MM-DD)
- **Response**: Array of tasks in date range

### 12. Update Task Status

**PATCH** `/user/:userId/task/:id/status`

- **Description**: Update only the status of a task
- **Parameters**:
  - `userId` (path): User ID
  - `id` (path): Task ID
- **Body**:
  ```json
  {
    "status": "pending|in_progress|completed"
  }
  ```
- **Response**: Updated task object

### 13. Get Task Statistics

**GET** `/user/:userId/stats`

- **Description**: Get statistics about user's tasks
- **Parameters**:
  - `userId` (path): User ID
- **Response**: Task statistics object

## Response Format

All endpoints return responses in the following format:

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {...},
  "count": 10
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

## Task Object Structure

```json
{
  "id": 1,
  "task_name": "Complete project documentation",
  "user_id": 123,
  "planned_date": "2024-01-15",
  "description": "Write comprehensive documentation for the API",
  "priority": "high",
  "status": "in_progress",
  "created_at": "2024-01-10T10:30:00Z",
  "updated_at": "2024-01-12T14:45:00Z"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Example Usage

### Create a new task

```bash
curl -X POST http://localhost:3000/api/tasks/user/123/add \
  -H "Content-Type: application/json" \
  -d '{
    "taskName": "Learn Node.js",
    "plannedDate": "2024-01-20",
    "description": "Complete Node.js course",
    "priority": "high",
    "status": "pending"
  }'
```

### Get user's tasks

```bash
curl http://localhost:3000/api/tasks/user/123
```

### Update task status

```bash
curl -X PATCH http://localhost:3000/api/tasks/user/123/task/456/status \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

### Search tasks

```bash
curl "http://localhost:3000/api/tasks/user/123/search?query=documentation"
```

## Database Schema

The tasks table should have the following structure:

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  task_name VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL,
  planned_date DATE NOT NULL,
  description TEXT DEFAULT '',
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
