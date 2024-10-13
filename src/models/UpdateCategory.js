import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { CategoryUpdate } from "../services/book.service";
import { ResultFunction } from "../comman/resultFunction";

const UpdateCategory = ({ data, categoryList, show, onHide }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  const [categoryIdForUpdate, setCategoryIdForUpdate] = useState("");

  // Example validation function for category name
  const Categories = (name) => {
    if (!name || name.length < 3) {
      return "Category name must be at least 3 characters long";
    }
    return "";
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      /* eslint-disable no-underscore-dangle */
      setCategoryIdForUpdate(data._id);
      /* eslint-enable no-underscore-dangle */
      setCategoryName(data.categoryName);
    }
  }, [data]);

  const handleChange = async (e) => {
    const name = e.target.value;
    setCategoryName(name);
    const error = await Categories(name);
    setCategoryNameError(error);
  };

  const handleCategoryUpdate = async () => {
    const error = await Categories(categoryName);
    setCategoryNameError(error);

    if (error || categoryNameError) return;

    const updatedData = {
      id: categoryIdForUpdate,
      categoryName
    };

    const result = await CategoryUpdate(updatedData);
    
    ResultFunction(result, categoryList);
    onHide(); 
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={handleChange}
              isInvalid={!!categoryNameError}
            />
            <Form.Control.Feedback type="invalid">
              {categoryNameError}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCategoryUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UpdateCategory.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
  }).isRequired,
  categoryList: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default UpdateCategory;
