import React, { useState, useEffect } from 'react';

function List({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {users.map(user => (
          <li className='list-item' key={user.id} onClick={() => onSelectUser(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Details({ info }) {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!info) return;

    setIsLoading(true);
    fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`)
      .then(response => response.json())
      .then(data => {
        setUserDetails(data.details);
        setIsLoading(false);
      });
  }, [info]);

  if (isLoading) {
    return <div className='details-loading'>Loading details...</div>;
  }

  if (!userDetails) {
    return <div>Select a user to see details.</div>;
  }

  return (
    <div>
      <h2></h2>
      <img src={info.avatar} alt={info.name} />
      <p>Name: {info.name}</p>
      <p>City: {userDetails.city}</p>
      <p>Company: {userDetails.company}</p>
      <p>Position: {userDetails.position}</p>
    </div>
  );
}


function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = user => {
    setSelectedUser(user);
  };

  return (
    <div className="app-container">
      <div className="list-container">
        <List onSelectUser={handleSelectUser} />
      </div>
      <div className="details-container">
        <Details info={selectedUser} />
      </div>
    </div>
  );
}

export default App;
