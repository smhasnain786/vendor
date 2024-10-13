import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Image } from "react-bootstrap";
import { setTrendingTitleImage } from "../services/book.service";
import { ResultFunction } from "../comman/resultFunction";
import EmptyState from "../utils/manageEmptyState";

const AddTrendingTitles = (props) => {
  const [trendingTitles] = useState([
    "NEW ARRIVALS",
    "BEST SELLERS",
    "UPCOMING EXAM BOOKS",
  ]);
  const [titleIcon, setTitleIcon] = useState("");
  const [title, setTitle] = useState("");
  const [encodedIcon, setEncodedIcon] = useState("");
  
  const imageRef = useRef(null);



  const handleTitleImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      const imgData = URL.createObjectURL(image);
      setTitleIcon(image);
      setEncodedIcon(imgData);
    } else {
      setTitleIcon("");
      setEncodedIcon("");
    }
  };

  const handleTitleChange = async () => {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("titleIcon", titleIcon);
    const result = await setTrendingTitleImage(formdata);
    ResultFunction(result, props.apiRecall);
    EmptyState([setTitle, setTitleIcon, setEncodedIcon], imageRef);

  };

  return (
    <>
    

      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTrendingTitle" className="mb-3">
              <Form.Select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                <option value="">Select</option>
                {trendingTitles.map((titles) => (
                  <option value={titles} key={titles}>
                    {titles}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formTitleImage" className="mb-3">
              <Form.Control
                type="file"
                ref={imageRef}
                placeholder="Title image"
                name="titleIcon"
                onChange={handleTitleImage}
              />
              {encodedIcon && (
                <div className="mt-3">
                  <Image src={encodedIcon} alt="Selected" thumbnail />
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleTitleChange}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddTrendingTitles.propTypes = {
  apiRecall: PropTypes.func.isRequired,
  show:PropTypes.bool.isRequired,
  onHide:PropTypes.func.isRequired,
};

export default AddTrendingTitles;
