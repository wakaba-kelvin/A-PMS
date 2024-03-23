import React, { useState, useEffect } from 'react';
import './MainContent.scss';
import Clock from '../../Components/Clock/Clock';
import profile from "../../assets/profileimg.jpg";
import { useCreateTimeRecordMutation, useUpdateTimeRecordMutation } from '../../Features/attendanceApi';

const WorkTimer = ({ startTime, stopTime }) => {
  const calculateTotalTime = () => {
    if (startTime && stopTime) {
      const totalTime = Math.round((stopTime - startTime) / 1000); 
      const hours = Math.floor(totalTime / 3600);
      const minutes = Math.floor((totalTime % 3600) / 60);
      const seconds = totalTime % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return 'N/A';
  };

  return (
    <div>
      {/* <h2>Work Timer</h2>
      <p>Total time worked: {calculateTotalTime()}</p> */}
    </div>
  );
};

function MainContent({ user }) {
  const [isWorking, setIsWorking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [totalHoursWorked, setTotalHoursWorked] = useState(null);

  const [createTimeRecord] = useCreateTimeRecordMutation();
  const [updateTimeRecord] = useUpdateTimeRecordMutation();

  const handleToggleWork = async () => {
    if (isWorking) {
      const confirmation = window.confirm('Are you sure you want to stop working?');
      if (confirmation) {
        setIsWorking(false);
        setStopTime(new Date());

        // Update time record
        await updateTimeRecord({
          EmployeeID: user.id,
          ClockInTime: startTime.toLocaleTimeString(),
          ClockOutTime: new Date().toLocaleTimeString(),
          Rate: 10.00 // Provide the rate
        });

        // Calculate total hours worked
        const diffInMs = stopTime.getTime() - startTime.getTime();
        const totalHours = diffInMs / (1000 * 60 * 60);
        setTotalHoursWorked(totalHours.toFixed(2));
      }
    } else {
      const confirmation = window.confirm('Are you sure you want to start working?');
      if (confirmation) {
        setIsWorking(true);
        setStartTime(new Date());
        setStopTime(null);
        setTotalHoursWorked(null);

        // Create time record
        await createTimeRecord({
          EmployeeID: user.id,
          ClockInTime: new Date().toLocaleTimeString(),
          ClockOutTime: '-',
          Rate: 10.00 // Provide the rate
        });
      }
    }
  };

  return (
    <div className="maincontent">
      <div className="header">
        <h2>Hello Welcome back</h2>
      </div>
      <div className="main">
        <div className="attendance">
          <div className="working">
            <div className="clock">
              <Clock />
            </div>
            {isWorking && <WorkTimer startTime={startTime} stopTime={stopTime} />}
          </div>
          
          <div className="btn">
            <button onClick={handleToggleWork}>{isWorking ? 'Stop Working' : 'Start Working'}</button>
          </div>
          <div className="profile">
            <div className="photo">
              <img src={profile} alt="" />
            </div>
            <div className="details">
              <div className="descrip">
                <h3>First Name:</h3>
                <h3>Last Name:</h3>
                <h3>Position:</h3>
                <h3>Contact:</h3>
              </div>
              <div className="fetched">
                <h4>Kelvin</h4>
                <h4>Wakaba</h4>
                <h4>Network Engineer</h4>
                <h4>0798133303</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="finance">
          <div className="stats">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Total Hours Worked</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{new Date().toDateString()}</td>
                  <td>{startTime ? startTime.toLocaleTimeString() : '-'}</td>
                  <td>{stopTime ? stopTime.toLocaleTimeString() : '-'}</td>
                  <td>{totalHoursWorked || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Other finance details */}
        </div>
      </div>
    </div>
  );
}

export default MainContent;