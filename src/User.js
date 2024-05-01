import React, { useState } from "react";
import { getUserById } from "./apiHelper";
import { Modal, Button, Spinner, Card, Form } from "react-bootstrap";

export default function User({ user, onDeleteUser, onUpdateUser }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    setEditName("");
    setEditEmail("");
  };
  return (
    <>
      <div className="user">
        <div>
          <Card key={user.id}>
            <Card.Body>
              <Card.Title>{user.userName}</Card.Title>
              <br />
              {isEdit ? (
                <div>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>User Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                  <Button
                    variant="outline-info"
                    onClick={() => onSaveUpdateduser(user)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline-info"
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Card.Footer>
                  <Button
                    variant="outline-info"
                    onClick={() => onDeleteUser(user.id)}
                  >
                    delete
                  </Button>
                  <Button
                    variant="outline-info"
                    onClick={() => onEditUser(user)}
                  >
                    Edit
                  </Button>
                  {loading ? (
                    <Spinner animation="border" role="status"></Spinner>
                  ) : (
                    <Button
                      variant="outline-info"
                      onClick={() => {
                        handleShowMore();
                        setShow(!show);
                        handleShow();
                      }}
                    >
                      {show ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </Card.Footer>
              )}
            </Card.Body>
          </Card>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> {userData.userName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul>
                <li>
                  name: <b>{userData.userName}</b>
                </li>
                <li>
                  Email: <b>{userData.email}</b>
                </li>
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <p>{error}</p>
    </>
  );
}
