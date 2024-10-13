import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Button, Form } from "react-bootstrap";
import { Categories } from '../Validation/Categories';
import { ResultFunction } from "../comman/resultFunction";
import { CategoryAdd } from "../services/book.service";

export const AddCategory = ({ show, onHide, categoryList }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryNameError, setCategoryNameError] = useState('');

  const handleChange = async (e) => {
    const { value } = e.target;
    setCategoryName(value);
    const error = await Categories(value);
    setCategoryNameError(error);
  };

  const handleCategoryAdd = async () => {
    const error = await Categories(categoryName);
    setCategoryNameError(error);
    if (error || categoryNameError) return; 

    const data = { categoryName };
    const result = await CategoryAdd(data);

    ResultFunction(result, categoryList, setCategoryName);
    onHide();  // Close the modal after successful addition
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category Name"
              value={categoryName}
              onChange={handleChange}
            />
            {categoryNameError && (
              <Form.Text style={{ color: "red" }}>
                {categoryNameError}
              </Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCategoryAdd}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddCategory.propTypes = {
  categoryList: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AddCategory;
