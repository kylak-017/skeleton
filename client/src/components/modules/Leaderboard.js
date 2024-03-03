import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/api/leaderboard')
      .then(response => response.json())
      .then(data => setLeaders(data));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaders.map((user, index) => (
          <li key={index}>{user.username} - {user.xp} XP</li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;