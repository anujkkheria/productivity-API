# Productivity API

A comprehensive REST API for managing tasks, subtasks, and users with full CRUD operations and advanced filtering capabilities.

## 🚀 Features

### ✅ Core Features

- [x] **User Management**

  - [x] User registration and authentication
  - [x] Login and signup functionality

- [x] **Tasks Management**

  - [x] Create, read, update, delete tasks
  - [x] Get tasks by user ID
  - [x] Filter tasks by status (`open`, `inprogress`, `pending`, `completed`)
  - [x] Search tasks by name
  - [x] Get tasks by date range
  - [x] Update task status with automatic completion timestamps
  - [x] Get task statistics

- [x] **Subtasks Management**

  - [x] Create, read, update, delete subtasks
  - [x] Get subtasks by task ID or user ID
  - [x] Filter subtasks by status (`pending`, `in_progress`, `completed`)
  - [x] Search subtasks by name or comments
  - [x] Get subtasks by date range
  - [x] Update subtask status with automatic completion timestamps
  - [x] Get subtask statistics
  - [x] Sequence ordering support

- [x] **Advanced Features**
  - [x] Automatic timestamp management
  - [x] Comprehensive error handling
  - [x] Input validation
  - [x] RESTful API design
  - [x] Separate endpoints for tasks and subtasks

## 📋 API Endpoints

### Tasks API (`/tasks`)

- `GET /` - API status
- `GET /all` - Get all tasks (admin)
- `GET /user/:id` - Get user tasks
- `GET /user/:userId/task/:id` - Get single task
- `POST /user/:id/add` - Create task
- `PUT /user/:userId/task/:id` - Update task
- `DELETE /user/:userId/task/:id` - Delete task
- `GET /user/:userId/status/:status` - Get tasks by status
- `GET /user/:userId/search` - Search tasks
- `GET /user/:userId/date-range` - Get tasks by date range
- `PATCH /user/:userId/task/:id/status` - Update task status
- `GET /user/:userId/stats` - Get task statistics

### Subtasks API (`/subtasks`)

- `GET /` - API status
- `GET /all` - Get all subtasks (admin)
- `GET /user/:userId` - Get user subtasks
- `GET /task/:taskId` - Get task subtasks
- `GET /task/:taskId/subtask/:id` - Get single subtask
- `POST /task/:taskId` - Create subtask
- `PUT /task/:taskId/subtask/:id` - Update subtask
- `DELETE /task/:taskId/subtask/:id` - Delete subtask
- `PATCH /task/:taskId/subtask/:id/status` - Update subtask status
- `GET /task/:taskId/stats` - Get subtask statistics
- `GET /status/:status` - Get subtasks by status
- `GET /search` - Search subtasks
- `GET /date-range` - Get subtasks by date range

### Users API (`/users`)

- `GET /` - API status
- `POST /login` - User login
- `POST /Signup` - User registration

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Native PostgreSQL queries
- **Authentication**: Basic authentication
- **Documentation**: Markdown + Postman Collection

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd productivity-API
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with the following variables:

   ```env
   host=localhost
   DB_port=5432
   DB_User=your_username
   DB_Password=your_password
   database=your_database_name
   ```

4. **Database Setup**

   - Create a PostgreSQL database
   - Run the SQL schema from `productivity.sql`

5. **Start the server**
   ```bash
   npm start
   ```

The API will be available at `http://localhost:3000`

## 📚 Documentation

- **API Documentation**: `API_DOCUMENTATION.md`
- **Postman Collection**: `Productivity_API_Postman_Collection.json`
- **Database Schema**: `productivity.sql`

## 🧪 Testing

Import the Postman collection to test all endpoints with sample data.

## 📊 Database Schema

### Tasks Table

```sql
CREATE TABLE tasks (
    id integer NOT NULL,
    task_name character varying(255) NOT NULL,
    user_id integer NOT NULL,
    status character varying(50) DEFAULT 'open' NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    completed_on timestamp,
    planned_date timestamp
);
```

### Subtasks Table

```sql
CREATE TABLE subtasks (
    id integer NOT NULL,
    parent_task_id integer NOT NULL,
    subtask_name character varying(255) NOT NULL,
    sequence_num integer,
    status character varying(50) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    completed_on timestamp,
    planned_date timestamp,
    comments text
);
```

## 🔄 Status Values

### Task Status

- `open` - Default status for new tasks
- `inprogress` - Task is currently being worked on
- `pending` - Task is waiting to be started
- `completed` - Task has been finished

### Subtask Status

- `pending` - Default status for new subtasks
- `in_progress` - Subtask is currently being worked on
- `completed` - Subtask has been finished

## 🚀 Deployment

### Prerequisites

- [ ] Move PostgreSQL to cloud service (NeonDB, etc.)
- [ ] Set up environment variables
- [ ] Configure CORS if needed

### Deployment Options

- [ ] Render.com
- [ ] Heroku
- [ ] Railway
- [ ] DigitalOcean

## 📝 TODO

### 🔧 Future Enhancements

- [ ] JWT authentication with refresh tokens
- [ ] Password reset functionality
- [ ] Email notifications
- [ ] Task categories/tags
- [ ] Task priorities
- [ ] File attachments
- [ ] Task comments
- [ ] User roles and permissions
- [ ] API rate limiting
- [ ] Caching layer

### 🧪 Testing

- [ ] Unit tests
- [ ] Integration tests
- [ ] API tests
- [ ] Performance tests

### 📊 Monitoring

- [ ] Logging system
- [ ] Error tracking
- [ ] Performance monitoring
- [ ] Health checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
