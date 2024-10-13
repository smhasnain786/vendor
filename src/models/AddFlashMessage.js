import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { ResultFunction } from "../comman/resultFunction";
import { addFlash } from "../services/flashMessage.service";

const AddFlashMessage = ({ get, show, onHide }) => {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const data = { message }; // Shorthand syntax
    const result = await addFlash(data);
    ResultFunction(result, get);
    setMessage(""); // Clear the input after adding the message
    onHide(); // Close the modal after adding
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Flash Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              cols={50}
              placeholder="Flash Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleClick} block>
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddFlashMessage.propTypes = {
  get: PropTypes.func.isRequired, // Validating the `get` function
  show: PropTypes.bool.isRequired, // Control modal visibility
  onHide: PropTypes.func.isRequired, // Function to close the modal
};

export default AddFlashMessage;
