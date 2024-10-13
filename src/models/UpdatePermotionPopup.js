import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { ResultFunction } from "../comman/resultFunction";
import { updatePermotionPopupData } from "../services/permotionpopup.service";
import { imageUrl } from "../services/dataurl";

const UpdatePermotionPopup = ({ data, get, show, onHide }) => {
  const [id, setId] = useState("");
  const [link, setLink] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const [encodedIcon, setEncodedIcon] = useState("");

  useEffect(() => {
    if (data) {
      setModalIcon(data?.modalIcon);
      setLink(data?.link);
              // eslint-disable-next-line no-underscore-dangle
      setId(data?._id);
    }
  }, [data]);

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
    formdata.append("_id", id);
    formdata.append("link", link);
    formdata.append("modalIcon", modalIcon);
    const result = await updatePermotionPopupData(formdata);
    ResultFunction(result, get);
    setModalIcon("");
    setLink("");
    onHide(); // Close modal after the update
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Promotion Popup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formLink" className="mb-3">
            <Form.Label>Promotion Link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Promotion Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Promotion Icon</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
            />
          </Form.Group>

          <img
            src={encodedIcon || imageUrl + modalIcon}
            alt="Promotion Icon Preview"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
       
        <Button variant="primary" onClick={handleClick}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UpdatePermotionPopup.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    link: PropTypes.string,
    modalIcon: PropTypes.string,
  }).isRequired,
  get: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default UpdatePermotionPopup;
