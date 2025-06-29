import { pool } from "../utils/DBConnection.js";


// const TasksQueries  = {
//     getTasksbyId : `select * from tasks where user`
// }

const TasksQueries = {
  getTasksbyId: `SELECT * FROM TASKS WHERE user_id= $1`,
  addTasks:
    "INSERT INTO tasks (task_name,user_id,planned_date) VALUES($1,$2,$3) RETURNING *",
};


export const getTasksbyID = async (req, res, next) => {
  const uid = req.params[id];
  const result = pool().query(TasksQueries.getTasksbyId, [uid]);
  const rows = result.rows;
  return res.status(200).send({ message: "successfull", data: rows });
};

export const AddTasks = async (req, res, next) => {
  const uid = req.params["id"];
  const { taskName, plannedDate } = req.body;
  //   const taskName = req.body.taskName;
  console.log(req.body, uid);
  const result = await pool.query(TasksQueries.addTasks, [
    taskName,
    uid,
    plannedDate,
  ]);
  const row = result.rows[0];
  return res.status(201).send({ task: row, message: "success" });
};
