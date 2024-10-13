import { useEffect, useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap"; // Importing react-bootstrap components
import PropTypes from 'prop-types'; // Importing PropTypes for props validation
import { PosterUpdate } from "../services/book.service";
import { HotToaster } from "../utils/Toaster";
import { imageUrl } from "../services/dataurl";

const UpdatePoster = (props) => {
  const { show, onHide, categoryDetails, callingPosterApiAgainAfterAddNewOne } = props;

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [posterIcon, setPosterIcon] = useState("");
  const [encodedIcon, setEncodedIcon] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (categoryDetails && Object.keys(categoryDetails).length > 0) {
      setSelectedCategory(categoryDetails.categoryData);
      setPosterIcon(imageUrl + categoryDetails.posterIcon);
        /* eslint-disable no-underscore-dangle */
      setId(categoryDetails._id);
      setCategoryId(categoryDetails.categoryData[0]._id);
    }
  }, [categoryDetails]);

  const handlePosterImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      const imgData = URL.createObjectURL(image);
      setPosterIcon(image);
      setEncodedIcon(imgData);
    } else {
      setPosterIcon("");
      setEncodedIcon("");
    }
  };

  const resultFunction = (result) => {
    if (result.status) {
      HotToaster(result.status, result.message);
      callingPosterApiAgainAfterAddNewOne();
      setCategoryId("");
      onHide(); // Close modal after successful update
    } else {
      HotToaster(result.status, result.message);
    }
  };
  const handlePosterChange = async () => {
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("categoryId", categoryId);
    formData.append("posterIcon", posterIcon);
    const result = await PosterUpdate(formData);
    resultFunction(result);
  };

 

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Poster</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select</option>
              {selectedCategory.length > 0 &&
                selectedCategory.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              name="poster"
              onChange={handlePosterImage}
            />
            <div className="mt-3">
              <Image
                src={encodedIcon || posterIcon}
                alt="Selected poster"
                width="100px"
                height="100px"
                rounded
              />
            </div>
          </Form.Group>

          <Button
            variant="primary"
            className="w-100"
            onClick={handlePosterChange}
          >
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

UpdatePoster.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  categoryDetails: PropTypes.shape({
    _id: PropTypes.string,
    categoryData: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired,
      })
    ),
    posterIcon: PropTypes.string,
  }).isRequired,
  callingPosterApiAgainAfterAddNewOne: PropTypes.func.isRequired,
};

export default UpdatePoster;
