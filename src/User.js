import React, { useState } from 'react';
import { getUserById } from './apiHelper';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';


export default function User({ user, onDeleteUser, onUpdateUser }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleShowMore = async () => {
    if (show) return;
    setLoading(true);
    const response = await getUserById(user.id);
    setLoading(false);
    if (!response.error) {
      setUserData(response.data);
    } else {
      setError(response.error);
    }
  };

  const onEditUser = (user) => {
    setIsEdit(true);
    setEditName(user.userName);
    setEditEmail(user.email);
  };

  const onSaveUpdateduser = (user) => {
    setIsEdit(false);
    onUpdateUser(user, editName, editEmail);
    setEditName('');
    setEditEmail('');
  };
  return (
    <>
      <div className="card">
        <p>{error}</p>
        {isEdit ? (
          <div>
            <h5>{user.userName}</h5>
            <p>{user.email}</p>
            <label>user Name</label>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <br />
            <label>user Email</label>
            <input
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
            <br />
            <button onClick={() => onSaveUpdateduser(user)}>Save</button>
            <button onClick={() => setIsEdit(false)}>Cancel</button>
          </div>
        ) : (
          <div key={user.id}>
            <h5>{user.userName}</h5>
            <p>{user.email}</p>
            <button onClick={() => onDeleteUser(user.id)}>delete</button>
            <button onClick={() => onEditUser(user)}>Edit</button>

            <div>
              {loading ? (
                <Spinner animation="border" role="status"></Spinner>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    handleShowMore();
                    setShow(!show);
                 
                  }}
                >
                  {show ? 'Show Less' : 'Show More'}
                </Button>
              )}
            </div>

            <p>
              {show && (
                <p>
                  hello, {userData.userName} we will send navigations to this
                  Email {userData.email} and some adds to your Address in{' '}
                  {userData.address}
                </p>
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
}