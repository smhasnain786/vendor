import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { ResultFunction } from "../comman/resultFunction";
import { updateFlash } from "../services/flashMessage.service";

const UpdateFlashMessage = ({ data, get, show, onHide }) => {
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
 
  
  useEffect(() => {
    if (data) {
      setMessage(data?.message);
      // eslint-disable-next-line no-underscore-dangle
      setId(data?._id);
    }
  }, [data]);

  const handleClick = async () => {
    const flashData = {
      _id: id,
      message,
    };
    const result = await updateFlash(flashData);
    ResultFunction(result, get);
    onHide(); // Close the modal after updating
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Flash Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea" // Change input type to textarea
              placeholder="Flash Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleClick} block>
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// Adding PropTypes validation
UpdateFlashMessage.propTypes = {
  data: PropTypes.shape({
    message: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired, // Validating the `data` prop object
  get: PropTypes.func.isRequired, // Validating the `get` function
  show: PropTypes.bool.isRequired, // Control modal visibility
  onHide: PropTypes.func.isRequired, // Function to close the modal
};

export default UpdateFlashMessage;
