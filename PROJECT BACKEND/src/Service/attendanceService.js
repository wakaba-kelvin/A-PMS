import { poolRequest, sql } from '../Utils/dbConnect.js';

export const addAttendanceService = async (attendance) => {
    try {
        const {
            AttendanceID,
            EmployeeID,
            ClockInTime,
            ClockOutTime
        } = attendance;

        const hoursWorked = calculateHoursWorked(ClockInTime, ClockOutTime);

        const result = await poolRequest()
            .input('AttendanceID', sql.VarChar(100), AttendanceID)
            .input('EmployeeID', sql.VarChar(100), EmployeeID)
            .input('ClockInTime', sql.Time, ClockInTime)
            .input('ClockOutTime', sql.Time, ClockOutTime)
            .input('HoursWorked', sql.Decimal(10, 2), hoursWorked)
            .query(`
                INSERT INTO Attendance (AttendanceID, EmployeeID, ClockInTime, ClockOutTime, HoursWorked)
                VALUES (@AttendanceID, @EmployeeID, @ClockInTime, @ClockOutTime, @HoursWorked);
        `);

        return result.recordset;
    } catch (error) {
        console.error("Error adding attendance:", error);
        throw error;
    }
};

export const getAttendanceByEmployeeIDService = async (employeeID) => {
    try {
        const result = await poolRequest()
            .input('EmployeeID', sql.VarChar(100), employeeID)
            .query("SELECT * FROM Attendance WHERE EmployeeID = @EmployeeID");

        return result.recordset;
    } catch (error) {
        console.error("Error fetching attendance by EmployeeID:", error);
        throw error;
    }
};


export const getAllAttendanceService = async () => {
    try {
        const results = await poolRequest().query(`SELECT * FROM Attendance`)
        return results.recordset;
    } catch (error) {
        console.error("Error fetching all attendance:", error);
        throw error;
    }
};

// Calculate hours worked function
const calculateHoursWorked = (clockInTime, clockOutTime) => {
    const diffInMilliseconds = new Date(clockOutTime) - new Date(clockInTime);
    return diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
};
