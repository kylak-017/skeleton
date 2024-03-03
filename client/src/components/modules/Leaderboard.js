import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check the structure of the response
        setLeaders(data);
      });
  }, []);


  return (
        <div>
          <h1>Leaderboard</h1>
          <ul>
      {Array.isArray(leaders) && leaders.map((user, index) => (
        <li key={index}>{user.username} - {user.xp} XP</li>
      ))}
    </ul>
        </div>

        
      );
}

export default Leaderboard;