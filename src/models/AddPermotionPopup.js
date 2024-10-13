import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap"; // Import React-Bootstrap components
import { ResultFunction } from "../comman/resultFunction";
import { addPermotionPopupData } from "../services/permotionpopup.service";

const AddPermotionPopup = ({ get, show, handleClose }) => {
  const [link, setLink] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const [encodedIcon, setEncodedIcon] = useState("");

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setModalIcon(image);
    if (image) {
      const imgata = URL.createObjectURL(image);
      setEncodedIcon(imgata);
    }
  };

  const handleClick = async () => {
    const formdata = new FormData();
    formdata.append("link", link);
    formdata.append("modalIcon", modalIcon);
    const result = await addPermotionPopupData(formdata);
    ResultFunction(result, get);
    setModalIcon("");
    setLink("");
    handleClose(); // Close modal after submitting
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Promotion Popup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Promotion Link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter promotion link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Promotion Icon</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
            />
          </Form.Group>
          {encodedIcon && (
            <div className="mb-3">
              <img
                src={encodedIcon}
                alt="Promotion Icon Preview"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}
          <Button variant="primary" onClick={handleClick} block>
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// Added prop validation for 'get', 'show', and 'handleClose'
AddPermotionPopup.propTypes = {
  get: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddPermotionPopup;
