import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { ResultFunction } from "../comman/resultFunction";
import { paperUpdate } from "../services/paper.service";

export const UpdatePreviousYearPaper = (props) => {
  const [id, setId] = useState("");
  const [file, setFile] = useState("");
  const [subject, setSubject] = useState("");
  const [categoryId, setCategoryId] = useState([]);
  const [examType, setExamType] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (props && props.data) {
              // eslint-disable-next-line no-underscore-dangle
      setId(props.data._id);
      setFile(props.data.file);
      setSubject(props.data.subject);
      setExamType(props.data.examType);
      if (props.data.categoryData) {
        setCategoryName(props.data.categoryData[0].categoryName);
                // eslint-disable-next-line no-underscore-dangle
        setCategoryId(props.data.categoryData[0]._id);
      }
    }
  }, [props]);

  const handleFileChange = (e) => {
    const pdf = e.target.value;
    setFile(pdf);
  };

  const handleChange = (e) => {
    const {value} = e.target.value;
    setSubject(value);
  };

  const handleSubmit = async () => {
    const formData = {
      id,
      categoryId,
      file,
      examType,
      subject
    };
    const result = await paperUpdate(formData);
    ResultFunction(result, props.paperList);
  };

 

  return (
    <>
   

      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Category</Form.Label>
              <Form.Control as="select">
                <option>{categoryName}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Exam Type</Form.Label>
              <Form.Control
                type="text"
                name="examType"
                value={examType}
                placeholder="Exam Type"
                onChange={(e) => setExamType(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={subject}
                placeholder="Subject"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>File</Form.Label>
              <Form.Control
                type="text"
                name="file"
                value={file}
                placeholder="Add file link here"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        
          <Button variant="primary" onClick={() => { handleSubmit(); }}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UpdatePreviousYearPaper.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    file: PropTypes.string,
    subject: PropTypes.string,
    examType: PropTypes.string,
    categoryData: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        categoryName: PropTypes.string,
      })
    ),
  }),
  paperList: PropTypes.func.isRequired,
  show:PropTypes.bool.isRequired,
  onHide:PropTypes.func.isRequired
};

export default UpdatePreviousYearPaper;
