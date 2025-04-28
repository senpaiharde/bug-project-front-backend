import React, { useEffect, useState } from 'react';
import { getLoggedinUser } from '../services/auth.service';
import axios, { Axios } from 'axios';
import { showErrorMsg } from '../services/event-bus.service';

export default function UserList() {
  const loggedInUser = getLoggedinUser();
  const [users, setUsers] = useState([]);
  if (!loggedInUser || loggedInUser.role !== 'admin') {
    return <div>Access denied</div>
  }
  // Only load when we're an admin
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (loggedInUser?.role !== 'admin') return;
    axios
      .get('/user')
      .then((res) => setUsers(res.data))
      .catch(() => showErrorMsg('Failed to load users'));
  }, []);


  

  return (
    <section>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.fullname}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={async () => {
                    await axios.
                }}>✏️✏️✏️</button>
                <button
                  onClick={async () => {
                    try {
                      await axios.delete(`/user/${u._id}`);
                      setUsers(users.filter((x) => x._id !== u._id));
                    } catch {
                      showErrorMsg('Cannot delete user');
                    }
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
