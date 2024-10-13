import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { ResultFunction } from "../comman/resultFunction";
import { paperAdd } from "../services/paper.service";

export const AddPreviousYearPaper = (props) => {
  const [file, setFile] = useState("");
  const [subject, setSubject] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [examType, setExamType] = useState("");


  useEffect(() => {
    if (props && props.categoryList) {
      setCategoryList(props.categoryList);
    }
  }, [props]);

  const handleFileChange = (e) => {
    const pdf = e.target.value;
    setFile(pdf);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "subject") {
      setSubject(value);
    }
    if (name === "examType") {
      setExamType(value);
    }
  };

  const handleSubmit = async () => {
    const formData = {
      categoryId,
      file,
      examType,
      subject,
    };
    const result = await paperAdd(formData);
    ResultFunction(result, props.paperList);
    
  };

  return (
    <>
    

      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="categorySelect">
              <Form.Label>Select Category</Form.Label>
              <Form.Control
                as="select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select</option>
                {categoryList.map((val) => (
                          // eslint-disable-next-line no-underscore-dangle
                  <option value={val._id} key={val._id}>
                    {val.categoryName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="examTypeInput">
              <Form.Label>Exam Type</Form.Label>
              <Form.Control
                type="text"
                name="examType"
                value={examType}
                placeholder="Exam Type"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="subjectInput">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={subject}
                placeholder="Subject"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fileInput">
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
         
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddPreviousYearPaper.propTypes = {
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      categoryName: PropTypes.string.isRequired,
    })
  ),
  paperList: PropTypes.func.isRequired,
  show:PropTypes.bool.isRequired,
  onHide:PropTypes.func.isRequired
};

export default AddPreviousYearPaper;
