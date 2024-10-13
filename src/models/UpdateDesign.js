import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { ResultFunction } from "../comman/resultFunction";
import { updateDesign } from "../services/design.service";

export const UpdateDesign = (props) => {
  const [designType, setDesignType] = useState("");
  const [icon, setIcon] = useState("");
  const [file, setFile] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (props && props.design) {
      setDesignType(props.design.designType);
      setIcon(props.design.icon);
      setFile(props.design.file);
              // eslint-disable-next-line no-underscore-dangle
      setId(props.design._id);
    }
  }, [props]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const { name } = e.target;
    if (name === "file") {
      setFile(selectedFile);
    } else {
      setIcon(selectedFile);
    }
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("designType", designType);
    formdata.append("file", file);
    formdata.append("icon", icon);
    const result = await updateDesign(formdata);
    ResultFunction(result, props.designList);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="exampleModalCenterTitle"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="exampleModalCenterTitle">
          Update Design
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Design Type</Form.Label>
            <Form.Control
              as="select"
              value={designType}
              onChange={(e) => setDesignType(e.target.value)}
            >
              <option>Select Design Type</option>
              <option value="Social Media">Social Media</option>
              <option value="Book Cover">Book Cover</option>
              <option value="Visiting Card">Visiting Card</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Add Icon</Form.Label>
            <Form.Control
              type="file"
              name="icon"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleSubmit}
            className="w-100"
          >
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

UpdateDesign.propTypes = {
  design: PropTypes.shape({
    designType: PropTypes.string,
    icon: PropTypes.string,
    file: PropTypes.string,
    _id: PropTypes.string,
  }),
  designList: PropTypes.func,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default UpdateDesign;
