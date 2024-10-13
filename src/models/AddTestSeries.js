import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { ResultFunction } from "../comman/resultFunction";
import { testSeriesAdd } from "../services/testseries.service";

export const AddTestSeries = (props) => {
  const [file, setFile] = useState("");
  const [files] = useState(["ppt", "pdf", "pptPdf", "editable"]);
  const [fileType, setFileType] = useState("");
  const [subject, setSubject] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [plan, setPlan] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
 

  useEffect(() => {
    if (props && props.categoryList) {
      setCategoryList(props.categoryList);
    }
  }, [props]);

  const handleFileChange = (e) => {
    const pdf = e.target.files[0];
    setFile(pdf);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "subject") {
      setSubject(value);
    }
    if (name === "releaseDate") {
      setReleaseDate(value);
    }
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("categoryId", categoryId);
    formdata.append("file", file);
    formdata.append("fileType", fileType);
    formdata.append("subject", subject);
    formdata.append("plan", plan);
    formdata.append("releaseDate", releaseDate);
    const result = await testSeriesAdd(formdata);
    ResultFunction(result, props.testSeries);
  props.onHide()
  };



  return (
    <>
     

      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Select Category</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option>Select</option>
                {categoryList.map((val) => (
                  // eslint-disable-next-line no-underscore-dangle
                  <option value={val._id} key={val._id}>
                    {val.categoryName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="fileType">
              <Form.Label>Select File Type</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setFileType(e.target.value)}
              >
                <option>Select</option>
                {files.map((val) => (
                  <option value={val} key={val}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="releaseDate">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                name="releaseDate"
                value={releaseDate}
                placeholder="Release Date"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="planType">
              <Form.Label>Select Plan Type</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setPlan(e.target.value)}
              >
                <option>Select</option>
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={subject}
                placeholder="Subject"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="file">
              <Form.Label>File</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              className="w-100"
              type="button"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

AddTestSeries.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      categoryName: PropTypes.string.isRequired,
    })
  ).isRequired,
  testSeries: PropTypes.func.isRequired,
};

export default AddTestSeries;
