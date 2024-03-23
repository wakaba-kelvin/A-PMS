import { Router } from 'express';
import { addAttendance, getAllAttendance, getAttendanceByEmployeeID  } from '../Controllers/attendanceController.js';

const attendanceRouter = Router();

attendanceRouter.post('/attendance', addAttendance);
attendanceRouter.get('/attendance', getAllAttendance);
attendanceRouter.get('/attendance/:employeeID', getAttendanceByEmployeeID);

// Add other routes as needed

export default attendanceRouter;
