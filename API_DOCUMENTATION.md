# Productivity API Documentation

## Base URLs

```
http://localhost:3000/tasks     # Tasks endpoints
http://localhost:3000/subtasks  # Subtasks endpoints
http://localhost:3000/users     # User endpoints
```

## Authentication

All endpoints require user authentication. User ID is passed as a parameter in the URL.

---

# Tasks API

## Endpoints Overview

### 1. API Status

**GET** `/tasks/`

- **Description**: Check if the Tasks API is running and see all available endpoints
- **Response**: List of all available task endpoints

### 2. Get All Tasks (Admin)

**GET** `/tasks/all`

- **Description**: Retrieve all tasks from all users (admin only)
- **Response**: Array of all tasks

### 3. Get User Tasks

**GET** `/tasks/user/:id`

- **Description**: Get all tasks for a specific user
- **Parameters**:
  - `id` (path): User ID
- **Response**: Array of user's tasks

### 4. Get Single Task

**GET** `/tasks/user/:userId/task/:id`

- **Description**: Get a specific task by ID
- **Parameters**:
  - `userId` (path): User ID
  - `id` (path): Task ID
- **Response**: Single task object

### 5. Create New Task

**POST** `/tasks/user/:id/add`

- **Description**: Create a new task for a user
- **Parameters**:
  - `id` (path): User ID
- **Body**:
  ```json
  {
    "taskName": "Complete project documentation",
    "plannedDate": "2024-01-15",
    "status": "open"
  }
  ```
- **Required Fields**: `taskName`
- **Optional Fields**: `plannedDate`, `status`
- **Valid Status Values**: `open` (default), `inprogress`, `pending`, `completed`
- **Response**: Created task object

### 6. Update Task

**PUT** `/tasks/user/:userId/task/:id`

- **Description**: Update an existing task
- **Parameters**:
  - `userId` (path): User ID
  - `id` (path): Task ID
- **Body**:
  ```json
  {
    "taskName": "Updated task name",
    "plannedDate": "2024-01-20",
    "status": "inprogress"
  }
  ```
- **Required Fields**: `taskName`
- **Response**: Updated task object

### 7. Delete Task

**DELETE** `/tasks/user/:userId/task/:id`

- **Description**: Delete a task
- **Parameters**:
  - `userId` (path): User ID
  - `id` (path): Task ID
- **Response**: Deleted task object

### 8. Get Tasks by Status

**GET** `/tasks/user/:userId/status/:status`

- **Description**: Get tasks filtered by status
- **Parameters**:
  - `userId` (path): User ID
  - `status` (path): Task status (`open`, `inprogress`, `pending`, `completed`)
- **Response**: Array of tasks with specified status

### 9. Search Tasks

**GET** `/tasks/user/:userId/search?query=searchterm`

- **Description**: Search tasks by task name
- **Parameters**:
  - `userId` (path): User ID
  - `query` (query): Search term
- **Response**: Array of matching tasks

### 10. Get Tasks by Date Range

**GET** `/tasks/user/:userId/date-range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

- **Description**: Get tasks within a date range
- **Parameters**:
  - `userId` (path): User ID
  - `startDate` (query): Start date (YYYY-MM-DD)
  - `endDate` (query): End date (YYYY-MM-DD)
- **Response**: Array of tasks in date range

### 11. Update Task Status

**PATCH** `/tasks/user/:userId/task/:id/status`

- **Description**: Update only the status of a task
- **Parameters**:
  - `userId` (path): User ID
  - `id` (path): Task ID
- **Body**:
  ```json
  {
    "status": "completed"
  }
  ```
- **Note**: When status is set to `completed`, `completed_on` timestamp is automatically set
- **Response**: Updated task object

### 12. Get Task Statistics

**GET** `/tasks/user/:userId/stats`

- **Description**: Get statistics about user's tasks
- **Parameters**:
  - `userId` (path): User ID
- **Response**: Task statistics object

---

# Subtasks API

## Endpoints Overview

### 1. API Status

**GET** `/subtasks/`

- **Description**: Check if the Subtasks API is running and see all available endpoints
- **Response**: List of all available subtask endpoints

### 2. Get All Subtasks (Admin)

**GET** `/subtasks/all`

- **Description**: Retrieve all subtasks from all tasks (admin only)
- **Response**: Array of all subtasks with parent task information

### 3. Get Subtasks by User

**GET** `/subtasks/user/:userId`

- **Description**: Get all subtasks for a specific user
- **Parameters**:
  - `userId` (path): User ID
- **Response**: Array of user's subtasks with parent task information

### 4. Get Subtasks by Task

**GET** `/subtasks/task/:taskId`

- **Description**: Get all subtasks for a specific task
- **Parameters**:
  - `taskId` (path): Task ID
- **Response**: Array of subtasks for the task

### 5. Get Single Subtask

**GET** `/subtasks/task/:taskId/subtask/:id`

- **Description**: Get a specific subtask by ID
- **Parameters**:
  - `taskId` (path): Task ID
  - `id` (path): Subtask ID
- **Response**: Single subtask object

### 6. Create New Subtask

**POST** `/subtasks/task/:taskId`

- **Description**: Create a new subtask for a task
- **Parameters**:
  - `taskId` (path): Task ID
- **Body**:
  ```json
  {
    "subtaskName": "Research competitors",
    "sequenceNum": 1,
    "status": "pending",
    "plannedDate": "2024-01-15",
    "comments": "Focus on top 5 competitors"
  }
  ```
- **Required Fields**: `subtaskName`
- **Optional Fields**: `sequenceNum`, `status`, `plannedDate`, `comments`
- **Valid Status Values**: `pending` (default), `in_progress`, `completed`
- **Response**: Created subtask object

### 7. Update Subtask

**PUT** `/subtasks/task/:taskId/subtask/:id`

- **Description**: Update an existing subtask
- **Parameters**:
  - `taskId` (path): Task ID
  - `id` (path): Subtask ID
- **Body**:
  ```json
  {
    "subtaskName": "Updated subtask name",
    "sequenceNum": 2,
    "status": "in_progress",
    "plannedDate": "2024-01-20",
    "comments": "Updated comments"
  }
  ```
- **Required Fields**: `subtaskName`
- **Response**: Updated subtask object

### 8. Delete Subtask

**DELETE** `/subtasks/task/:taskId/subtask/:id`

- **Description**: Delete a subtask
- **Parameters**:
  - `taskId` (path): Task ID
  - `id` (path): Subtask ID
- **Response**: Deleted subtask object

### 9. Update Subtask Status

**PATCH** `/subtasks/task/:taskId/subtask/:id/status`

- **Description**: Update only the status of a subtask
- **Parameters**:
  - `taskId` (path): Task ID
  - `id` (path): Subtask ID
- **Body**:
  ```json
  {
    "status": "completed"
  }
  ```
- **Note**: When status is set to `completed`, `completed_on` timestamp is automatically set
- **Response**: Updated subtask object

### 10. Get Subtask Statistics

**GET** `/subtasks/task/:taskId/stats`

- **Description**: Get statistics about subtasks for a specific task
- **Parameters**:
  - `taskId` (path): Task ID
- **Response**: Subtask statistics object

### 11. Get Subtasks by Status

**GET** `/subtasks/status/:status`

- **Description**: Get subtasks filtered by status
- **Parameters**:
  - `status` (path): Subtask status (`pending`, `in_progress`, `completed`)
- **Response**: Array of subtasks with specified status

### 12. Search Subtasks

**GET** `/subtasks/search?query=searchterm`

- **Description**: Search subtasks by name or comments
- **Parameters**:
  - `query` (query): Search term
- **Response**: Array of matching subtasks

### 13. Get Subtasks by Date Range

**GET** `/subtasks/date-range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

- **Description**: Get subtasks within a date range
- **Parameters**:
  - `startDate` (query): Start date (YYYY-MM-DD)
  - `endDate` (query): End date (YYYY-MM-DD)
- **Response**: Array of subtasks in date range

---

# Users API

## Endpoints Overview

### 1. API Status

**GET** `/users/`

- **Description**: Check if the Users API is running
- **Response**: API status message

### 2. User Login

**POST** `/users/login`

- **Description**: Authenticate user login
- **Body**: User credentials
- **Response**: Authentication result

### 3. User Signup

**POST** `/users/Signup`

- **Description**: Register a new user
- **Body**: User registration data
- **Response**: Registration result

---

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

## Data Structures

### Task Object

```json
{
  "id": 1,
  "task_name": "Complete project documentation",
  "user_id": 123,
  "status": "inprogress",
  "created_at": "2024-01-10T10:30:00Z",
  "updated_at": "2024-01-12T14:45:00Z",
  "completed_on": null,
  "planned_date": "2024-01-15T00:00:00Z"
}
```

### Subtask Object

```json
{
  "id": 1,
  "parent_task_id": 1,
  "subtask_name": "Research competitors",
  "sequence_num": 1,
  "status": "pending",
  "created_at": "2024-01-10T10:30:00Z",
  "updated_at": "2024-01-12T14:45:00Z",
  "completed_on": null,
  "planned_date": "2024-01-15T00:00:00Z",
  "comments": "Focus on top 5 competitors"
}
```

### Subtask with Parent Task Info

```json
{
  "id": 1,
  "parent_task_id": 1,
  "subtask_name": "Research competitors",
  "sequence_num": 1,
  "status": "pending",
  "created_at": "2024-01-10T10:30:00Z",
  "updated_at": "2024-01-12T14:45:00Z",
  "completed_on": null,
  "planned_date": "2024-01-15T00:00:00Z",
  "comments": "Focus on top 5 competitors",
  "parent_task_name": "Complete project documentation",
  "user_id": 123
}
```

### Task Statistics

```json
{
  "total_tasks": 10,
  "completed_tasks": 3,
  "pending_tasks": 4,
  "inprogress_tasks": 2,
  "open_tasks": 1
}
```

### Subtask Statistics

```json
{
  "total_subtasks": 15,
  "completed_subtasks": 8,
  "pending_subtasks": 5,
  "in_progress_subtasks": 2
}
```

## Status Values

### Task Status

- `open` - Default status for new tasks
- `inprogress` - Task is currently being worked on
- `pending` - Task is waiting to be started
- `completed` - Task has been finished

### Subtask Status

- `pending` - Default status for new subtasks
- `in_progress` - Subtask is currently being worked on
- `completed` - Subtask has been finished

## Sample Data

### Sample Task Creation

```bash
POST /tasks/user/123/add
Content-Type: application/json

{
  "taskName": "Build E-commerce Website",
  "plannedDate": "2024-02-15",
  "status": "open"
}
```

### Sample Subtask Creation

```bash
POST /subtasks/task/1
Content-Type: application/json

{
  "subtaskName": "Design homepage",
  "sequenceNum": 1,
  "status": "pending",
  "plannedDate": "2024-01-20",
  "comments": "Create responsive design with modern UI"
}
```

### Sample Status Update

```bash
PATCH /tasks/user/123/task/1/status
Content-Type: application/json

{
  "status": "inprogress"
}
```
