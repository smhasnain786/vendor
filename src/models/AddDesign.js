import { useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Button, Form } from "react-bootstrap";
import { ResultFunction } from "../comman/resultFunction";
import { addDesign } from "../services/design.service";

export const AddDesign = (props) => {
  const [designType, setDesignType] = useState("");
  const [icon, setIcon] = useState("");
  const [file, setFile] = useState("");
 
  const array = ["Social Media", "Book Cover", "Visiting Card", "Other"];

  

  const handleFileChange = (e) => {
    const filess = e.target.files[0];
    const { name } = e.target;
    if (name === "file") {
      setFile(filess);
    } else {
      setIcon(filess);
    }
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("designType", designType);
    formdata.append("file", file);
    formdata.append("icon", icon);
    const result = await addDesign(formdata);
    ResultFunction(result, props.designList);
   
  };

  return (
    <>
      

      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
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
                <option>Select</option>
                {array.map((val) => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                ))}
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

            <Button variant="primary" onClick={handleSubmit}>
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

AddDesign.propTypes = {
  designList: PropTypes.object,
  show: PropTypes.bool.isRequired, // Validation for 'show' prop
  onHide: PropTypes.func.isRequired, // Validation for 'onHide' prop
};

export default AddDesign;
