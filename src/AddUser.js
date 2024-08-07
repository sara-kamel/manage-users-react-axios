import { useState } from "react";
import { addUser } from "./apiHelper";
import { Form, Button } from "react-bootstrap";

export default function AddUser({ onAdd, onError }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  async function handleAddUser() {
    const response = await addUser(userName, userEmail);
    if (!response.error) {
      onAdd(response.data);
      setUserName("");
      setUserEmail("");
    } else {
      onError(response.error);
    }
  }

  return (
    <>
      <div className="add-form">
        <Form>
          <h3>Add User</h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>User Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="outline-dark" onClick={handleAddUser}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
