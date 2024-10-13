import { useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { ResultFunction } from "../comman/resultFunction";
import { currentAffairsFileAdd } from "../services/currentAffairs.service";

export const AddCurrentAffairs = (props) => {

  const [type, setType] = useState("");
  const [files] = useState(["ppt", "pdf", "pptPdf", "editable"]);
  const [fileType, setFileType] = useState("");
  const [range, setRange] = useState("");
  const [Weekly] = useState([
    "Jan 01 - Jan 07",
    "Jan 08 - Jan 14",
    //...rest of the weekly options
  ]);
  const [Monthly] = useState([
    "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"
  ]);
  const [HalfYearly] = useState(["january-june", "july-december"]);
  const [Yearly] = useState(["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"]);
  const [file, setFile] = useState("");
  const [plan, setPlan] = useState("");
  const array = ["Daily", "Weekly", "Monthly", "Half Yearly", "Yearly"];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("type", type);
    formdata.append("fileType", fileType);
    formdata.append("file", file);
    formdata.append("range", range);
    formdata.append("plan", plan);
    const result = await currentAffairsFileAdd(formdata);
    ResultFunction(result, props.currentAffairs);
   // Close the modal after submission
  };

  return (
    <>
      

      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Type</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setType(e.target.value)}
              >
                <option>Select</option>
                {array.map((val) => (
                  <option value={val} key={val}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>

            {type && type !== "Daily" && (
              <Form.Group className="mb-3">
                <Form.Label>Select {type} Range</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setRange(e.target.value)}
                >
                  <option value="">Select</option>
                  {(type === "Weekly" && Weekly ||
                    type === "Monthly" && Monthly ||
                    type === "Half Yearly" && HalfYearly ||
                    type === "Yearly" && Yearly).map((val) => (
                      <option value={val} key={val}>{val}</option>
                    ))}
                </Form.Control>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
              <Form.Label>File</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button variant="primary" type="button" onClick={handleSubmit} block>
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

AddCurrentAffairs.propTypes = {
  currentAffairs: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired, // Validation for 'show' prop
  onHide: PropTypes.func.isRequired, // Validation for 'onHide' prop
};

export default AddCurrentAffairs;
