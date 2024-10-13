import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { ResultFunction } from "../comman/resultFunction";
import { currentAffairsFileUpdate } from "../services/currentAffairs.service";

export const UpdateCurrentAffairs = (props) => {
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState("");
  const [fileType, setFileType] = useState("");
  const [range, setRange] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    if (props && props.data) {
          // eslint-disable-next-line no-underscore-dangle
      setId(props.data._id);
      setType(props.data.type);
      setFileType(props.data.fileType);
      setRange(props.data.range);
      setPlan(props.data.plan);
    }
  }, [props]);

  const handleFileChange = (e) => {
    const pdf = e.target.files[0];
    setFile(pdf);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("fileType", fileType);
    formData.append("file", file);
    formData.append("range", range);
    formData.append("plan", plan);
    const result = await currentAffairsFileUpdate(formData);
    ResultFunction(result, props.currentAffairs);
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Files</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Type</Form.Label>
            <Form.Select onChange={(e) => setType(e.target.value)}>
              <option value={type}>{type}</option>
              {/* Add more options dynamically if needed */}
            </Form.Select>
          </Form.Group>
          {type !== "Daily" && (
            <Form.Group className="mb-3">
              <Form.Label>Select Range</Form.Label>
              <Form.Select onChange={(e) => setRange(e.target.value)}>
                <option value={range}>{range}</option>
              </Form.Select>
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Select File Type</Form.Label>
            <Form.Select>
              <option>{fileType}</option>
              {/* Add more options dynamically if needed */}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select Plan Type</Form.Label>
            <Form.Select onChange={(e) => setPlan(e.target.value)}>
              <option value={plan}>{plan}</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ppt file</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" className="w-100" onClick={handleSubmit}>
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

UpdateCurrentAffairs.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.string,
    fileType: PropTypes.string,
    range: PropTypes.string,
    plan: PropTypes.string,
  }),
  currentAffairs: PropTypes.func,
  show: PropTypes.bool.isRequired, // Validation for 'show' prop
  onHide: PropTypes.func.isRequired, // Validation for 'onHide' prop
};

export default UpdateCurrentAffairs;
