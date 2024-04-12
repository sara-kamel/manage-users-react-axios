import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import User from "./User";
import { deleteUser, getUsers, updateUser } from "./apiHelper";
import AddUser from "./AddUser";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  
  /*get users */
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      if (!response.error) {
        setUsers(response.data);
        setError("");
      } else setError(response.error);
    };

    fetchUsers();
  }, []);

  //*delete user */
  const handleDeleteUser = async (id) => {
    const response = await deleteUser(id);
    if (!response.error) {
      alert("user deleted");
      const currentUsers = users.filter((user) => user.id !== id);
      setUsers(currentUsers);
      setError("");
    } else setError(response.error);
  };

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
      <AddUser
        onAdd={(data) => {
          setUsers([...users, data]);
        }}
        onError={(error) => {
          setError(error);
        }}
      />
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
