import React, { useEffect, useState } from 'react';
import { getLoggedinUser } from '../services/auth.service';
import axios from 'axios';
import { showErrorMsg } from '../services/event-bus.service';
import { getBugs } from '../services/bug.service';
import {  useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
export default function UserList() {
  const loggedInUser = getLoggedinUser();
  const [users, setUsers] = useState([]);
  const Navigate =useNavigate()
  const [bugs, setBugs] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ fullname: '', role: '' });

  if (!loggedInUser || loggedInUser.role !== 'admin') {
    return <div>Access denied <Link to={'/login'}></Link></div>;
  }
  // Only load when we're an admin
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (loggedInUser?.role !== 'admin') return;
    axios
      .get('/user')
      .then((res) => setUsers(res.data))
      .catch(() => showErrorMsg('Failed to load users'));

    getBugs()
      .then(setBugs)
      .catch(() => {});
  }, []);

  const bugCountByUser = bugs.reduce((acc, b) => {
    acc[b.ownerId] = (acc[b.ownerId] || 0) + 1;
    return acc;
  }, {});

  function onStartEdit(u) {
    setEditingId(u._id);
    setEditForm({ fullname: u.fullname, role: u.role });
  }

  function onChangeField({ target }) {
    setEditForm((prev) => ({ ...prev, [target.name]: target.value }));
  }

  async function onSaveEdit() {
    try {
      const { data } = await axios.put(`/user/${editingId}`, editForm);
      setUsers((us) => us.map((u) => (u._id === editingId ? data : u)));
      setEditingId(null);
    } catch {
      showErrorMsg('Failed to update user');
    }
  }

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
          {users.map((u) => {
            const isEditing = u._id === editingId;
            const hasBugs = bugCountByUser[u._id] > 0;

            return (
              <tr key={u._id}>
                <td>
                  {isEditing ? (
                    <input name="fullname" value={editForm.fullname} onChange={onChangeField} />
                  ) : (
                    u.fullname
                  )}
                </td>
                <td>{u.email}</td>
                <td>
                  {isEditing ? (
                    <select name="role" value={editForm.role} onChange={onChangeField}>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <>
                      <button onClick={onSaveEdit}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => onStartEdit(u)}>Edit</button>
                      <button
                        disabled={hasBugs}
                        onClick={async () => {
                          try {
                            await axios.delete(`/user/${u._id}`);
                            setUsers((us) => us.filter((x) => x._id !== u._id));
                          } catch {
                            showErrorMsg('Cannot delete user');
                          }
                        }}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
