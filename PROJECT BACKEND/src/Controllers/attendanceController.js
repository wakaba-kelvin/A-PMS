import { addAttendanceService, getAllAttendanceService } from '../Service/attendanceService.js';
import { sendServerError, sendCreated } from '../Helper/helper.js';

export const addAttendance = async (req, res) => {
    const attendanceData = req.body;

    try {
        const response = await addAttendanceService(attendanceData);
        if (response instanceof Error) {
            return sendServerError(res, response.message);
        } else {
            return sendCreated(res, 'Attendance added successfully');
        }
    } catch (error) {
        return sendServerError(res, error.message);
    }
};

export const getAllAttendance = async (req, res) => {
    try {
        const attendance = await getAllAttendanceService();
        res.status(200).json(attendance);
    } catch (error) {
        console.error("Error fetching all attendance:", error);
        res.status(500).json("Internal server error");
    }
};

export const getAttendanceByEmployeeID = async (req, res) => {
    const { employeeID } = req.params;

    try {
        const attendance = await getAttendanceByEmployeeIDService(employeeID);
        res.status(200).json(attendance);
    } catch (error) {
        console.error("Error fetching attendance by EmployeeID:", error);
        res.status(500).json("Internal server error");
    }
};

