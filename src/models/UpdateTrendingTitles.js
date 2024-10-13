import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { titleImageUpdateById } from "../services/book.service";
import { imageUrl } from "../services/dataurl";
import { ResultFunction } from "../comman/resultFunction";

const UpdateTrendingTitles = (props) => {
  const [title, setTitle] = useState("");
  const [titleIcon, setTitleIcon] = useState("");
  const [encodedIcon, setEncodedIcon] = useState("");
  const [id, setId] = useState("");
  

 

  useEffect(() => {
    if (Object.keys(props).length > 0 && Object.keys(props.data).length > 0) {
      setTitle(props.data.title);
      setTitleIcon(imageUrl + props.data.icon);
      // eslint-disable-next-line no-underscore-dangle
      setId(props.data._id);
     
    }
  }, [props]);

  const handleTitleImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      const imgata = URL.createObjectURL(e.target.files[0]);
      setTitleIcon(image);
      setEncodedIcon(imgata);
    } else {
      setTitleIcon("");
      setEncodedIcon("");
    }
  };

  const handleTitleChange = async () => {
    const formdata = new FormData();
    formdata.append("_id", id);
    formdata.append("title", title);
    formdata.append("titleIcon", titleIcon);
    const result = await titleImageUpdateById(formdata);
    ResultFunction(result, props.apiRecall);
  };

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Title Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control as="select" value={title} disabled>
                <option value={title}>{title}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="file"
                placeholder="Title image"
                name="title"
                onChange={handleTitleImage}
              />
              <div className="mt-3">
                <img
                  src={encodedIcon || titleIcon}
                  alt=""
                  width="100px"
                  height="100px"
                />
              </div>
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleTitleChange}
              className="w-100"
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

UpdateTrendingTitles.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string,
    _id: PropTypes.string,
  }),
  apiRecall: PropTypes.func,
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default UpdateTrendingTitles;
