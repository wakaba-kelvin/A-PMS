import React, { useState, useEffect } from 'react';
import './Clock.scss'

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      setCurrentTime(newTime);
    }, 1000);

    
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div className='clock'>
      <h2>{currentTime}</h2>
    </div>
  );
};

export default Clock;
