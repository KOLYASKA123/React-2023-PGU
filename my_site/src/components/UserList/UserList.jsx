import React, { useState, useEffect } from 'react';
import UserCard from '../UserCard/UserCard';

const UserList = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.log(error));
    }, []);
    
    
    return (
      <div>
        <h2 className='USERLISTNAME'>Популярные юзеры</h2>
        <div className='USERLIST'>
        {users.map((user) => (
          <UserCard key={user.id} user={user}/>
        ))}
        </div>
      </div>
    );
  };

export default UserList;