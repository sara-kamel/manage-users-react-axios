import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import User from './User';
import { deleteUser, getUsers, addUser, updateUser } from './apiHelper';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  /*get users */
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      if (!response.error) {
        setUsers(response.data);
        setError('');
      } else setError(response.error);
    };

    fetchUsers();
  }, []);

  //*delete user */
  const handleDeleteUser = async (id) => {
    const response = await deleteUser(id);
    if (!response.error) {
      alert('user deleted');
      const currentUsers = users.filter((user) => user.id !== id);
      setUsers(currentUsers);
      setError('');
    } else setError(response.error);
  };

  /*** Add User ***/
  async function handleAddUser() {
    const respone = await addUser(userName, userEmail);
    if (!respone.error) {
      setUsers([...users, respone.data]);
      setUserName('');
      setUserEmail('');
    } else {
      setError(respone.error);
    }
  }

  /**update users */
  async function handleUpdateUser(user, name, email) {
    const respone = await updateUser(user, name, email);
    if (!respone.error) {
      setUsers(users.map((u) => (u.id === user.id ? { ...respone.data } : u)));
    } else {
      setError(respone.error);
    }
  }

  return (
    <>
      <div>
        <label>Add User</label>
        <br />
        <label>User Name</label>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} />
        <br />
        <label>User Email</label>
        <input
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>
      <button onClick={handleAddUser}>Submit</button>

      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          onDeleteUser={handleDeleteUser}
          onUpdateUser={handleUpdateUser}
        />
      ))}

      <b>{error}</b>
    </>
  );
}

export default App;

