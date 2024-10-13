import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { ResultFunction } from "../comman/resultFunction";
import { testSeriesUpdate } from "../services/testseries.service";

export const UpdateTestSeries = (props) => {
  const [id, setId] = useState("");
  const [file, setFile] = useState("");
  const [fileType, setFileType] = useState("");
  const [subject, setSubject] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [plan, setPlan] = useState([]);
  const [releaseDate, setReleaseDate] = useState("");

  useEffect(() => {
    if (props && props.data) {
      // eslint-disable-next-line no-underscore-dangle
      setId(props.data._id);
      setFile(props.data.file);
      setFileType(props.data.fileType);
      setSubject(props.data.subject);
      setPlan(props.data.plan);
      setReleaseDate(props.data.releaseDate);
      if (props.data.categoryData && props.data.categoryData.length > 0) {
        setCategoryName(props.data.categoryData[0].categoryName);
                // eslint-disable-next-line no-underscore-dangle
        setCategoryId(props.data.categoryData[0]._id);
      }
    }
  }, [props]);

  const handleFileChange = (e) => {
    const pdf = e.target.files[0];
    setFile(pdf);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSubject(value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("categoryId", categoryId);
    formData.append("file", file);
    formData.append("fileType", fileType);
    formData.append("subject", subject);
    formData.append("plan", plan);
    formData.append("releaseDate", releaseDate);
    const result = await testSeriesUpdate(formData);
    ResultFunction(result, props.testSeries);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Files</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Category</Form.Label>
            <Form.Select>
              <option>{categoryName}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select File Type</Form.Label>
            <Form.Select>
              <option>{fileType}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Release Date</Form.Label>
            <Form.Control
              type="date"
              value={releaseDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Plan Type</Form.Label>
            <Form.Select
              onChange={(e) => setPlan(e.target.value)}
            >
              <option value={plan}>{plan}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              placeholder="Subject"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

UpdateTestSeries.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    file: PropTypes.string,
    fileType: PropTypes.string,
    subject: PropTypes.string,
    plan: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    releaseDate: PropTypes.string,
    categoryData: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        categoryName: PropTypes.string,
      })
    ),
  }),
  testSeries: PropTypes.func,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default UpdateTestSeries;
