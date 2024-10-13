import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Image } from "react-bootstrap"; // Importing react-bootstrap components
import { PosterAdd } from "../services/book.service";
import { HotToaster } from "../utils/Toaster";
import PosterVal from "../Validation/PosterVal";

const AddPoster = ({ categoryList, callingPosterApiAgainAfterAddNewOne , show,onHide}) => {
  const [encodedIcon, setEncodedIcon] = useState("");
  const [fields, setFields] = useState({
    posterIcon: "",
    categoryId: "",
  });
 

  useEffect(() => {
    if (categoryList) {
      setFields((prevState) => ({
        ...prevState,
        categoryList,
      }));
    }
  }, [categoryList]);

 

  const handleChange = async (e) => {
    const { name, files, value } = e.target;
    const image = name === "posterIcon" ? files[0] : null;
    const newValue = name === "categoryId" ? value : image;
    setFields((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
    if (image) {
      const imgData = URL.createObjectURL(image);
      setEncodedIcon(imgData);
    }
    await PosterVal(name, newValue);
  };

  const resultFunction = (result) => {
    if (result.status) {
      HotToaster(result.status, result.message);
      callingPosterApiAgainAfterAddNewOne();
      setFields({
        posterIcon: "",
        categoryId: "",
      });
      onHide();  // Close the modal after successful addition
      // Close modal after successful addition
    } else {
      HotToaster(result.status, result.message);
    }
  };

  const handlePosterChange = async () => {
    const formData = new FormData();
    formData.append("categoryId", fields.categoryId);
    formData.append("posterIcon", fields.posterIcon);
    const result = await PosterAdd(formData);
    resultFunction(result);
  };

  return (
    <>


      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Poster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                as="select"
                name="categoryId"
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categoryList.length > 0 &&
                  categoryList.map((category) => (
                      /* eslint-disable no-underscore-dangle */
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="file"
                placeholder="Poster Image"
                name="posterIcon"
                onChange={handleChange}
              />
              {encodedIcon && (
                <div className="mt-3">
                  <Image
                    src={encodedIcon}
                    alt="Selected poster"
                    width="100"
                    height="100"
                    rounded
                  />
                </div>
              )}
            </Form.Group>

            <Button
              variant="primary"
              className="w-100"
              onClick={handlePosterChange}
            >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

AddPoster.propTypes = {
  categoryList: PropTypes.array.isRequired,
  callingPosterApiAgainAfterAddNewOne: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AddPoster;
