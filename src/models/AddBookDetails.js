import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { Button, Modal, Form } from "react-bootstrap";
import { BookAdd, CategoryListGet } from "../services/book.service";
import { HotToaster } from "../utils/Toaster";

const AddBookDetails = (props) => {
  const [bookName, setBookName] = useState("");
  const [itemType, setItemType] = useState("");
  const [bookIcon, setBookIcon] = useState("");
  const [MRP, setMRP] = useState("");
  const [ISBN, setISBN] = useState("");
  const [author, setAuthor] = useState("");
  const [bookCode, setBookCode] = useState("");
  const [chapterCount, setChapterCount] = useState(0);
  const [language, setLanguage] = useState("");
  const [samplePdf, setSamplePdf] = useState({});
  const [sellingPrice, setSellingPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("");
  const [features, setFeatures] = useState("");
  const bookTypes = ["NEW ARRIVALS", "BEST SELLERS", "UPCOMING EXAM BOOKS"];
  const [categoryList, setCategoryList] = useState([]);

  const getCategoryData = async () => {
    const result = await CategoryListGet();
    setCategoryList(result.data);
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const handleBookImage = (e) => {
    const image = e.target.files[0];
    setBookIcon(image);
  };

  const handleBookSampleImage = (e) => {
    const pdf = e.target.files[0];
    setSamplePdf(pdf);
  };

  const resultFunction = (result) => {
    HotToaster(result.status, result.message);
  };

  const handleBookDetailsSave = async () => {
    const formData = new FormData();
    formData.append("itemType", itemType);
    formData.append("categoryId", categoryId);
    formData.append("samplePdf", samplePdf);
    formData.append("bookName", bookName);
    formData.append("bookIcon", bookIcon);
    formData.append("MRP", MRP);
    formData.append("chapterCount", chapterCount);
    formData.append("ISBN", ISBN);
    formData.append("author", author);
    formData.append("bookCode", bookCode);
    formData.append("type", type);
    formData.append("language", language);
    formData.append("features", features);
    formData.append("sellingPrice", sellingPrice);

    const result = await BookAdd(formData);
    resultFunction(result);
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Book Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="itemType" className="mb-3">
            <Form.Label>Select Item Type</Form.Label>
            <Form.Control
              as="select"
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="book">Book</option>
              <option value="ebook">E-Book</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="categoryId" className="mb-3">
            <Form.Label>Select Category</Form.Label>
            <Form.Control
              as="select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select</option>
              {categoryList.map((category) => (
                        /* eslint-disable no-underscore-dangle */

                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="bookName" className="mb-3">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Enter Book Name"
            />
          </Form.Group>

          <Form.Group controlId="bookIcon" className="mb-3">
            <Form.Label>Book Icon</Form.Label>
            <Form.Control type="file" onChange={handleBookImage} />
          </Form.Group>

          <Form.Group controlId="samplePdf" className="mb-3">
            <Form.Label>Book Sample PDF</Form.Label>
            <Form.Control type="file" onChange={handleBookSampleImage} />
          </Form.Group>

          <Form.Group controlId="MRP" className="mb-3">
            <Form.Label>MRP Price</Form.Label>
            <Form.Control
              type="number"
              value={MRP}
              onChange={(e) => setMRP(e.target.value)}
              placeholder="Enter MRP Price"
            />
          </Form.Group>

          <Form.Group controlId="ISBN" className="mb-3">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              value={ISBN}
              onChange={(e) => setISBN(e.target.value)}
              placeholder="Enter ISBN"
            />
          </Form.Group>

          <Form.Group controlId="bookCode" className="mb-3">
            <Form.Label>Book Code</Form.Label>
            <Form.Control
              type="text"
              value={bookCode}
              onChange={(e) => setBookCode(e.target.value)}
              placeholder="Enter Book Code"
            />
          </Form.Group>

          <Form.Group controlId="author" className="mb-3">
            <Form.Label>Author Name</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter Author Name"
            />
          </Form.Group>

          <Form.Group controlId="chapterCount" className="mb-3">
            <Form.Label>Chapter Count</Form.Label>
            <Form.Control
              type="number"
              value={chapterCount}
              onChange={(e) => setChapterCount(e.target.value)}
              placeholder="Enter Chapter Count"
            />
          </Form.Group>

          <Form.Group controlId="bookType" className="mb-3">
            <Form.Label>Book Type</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              {bookTypes.map((types) => (
                <option key={types} value={types}>
                  {types}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="language" className="mb-3">
            <Form.Label>Language</Form.Label>
            <Form.Control
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="Enter Language"
            />
          </Form.Group>

          <Form.Group controlId="features" className="mb-3">
            <Form.Label>Features</Form.Label>
            <Form.Control
              as="textarea"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Enter Book Features"
            />
          </Form.Group>

          <Form.Group controlId="sellingPrice" className="mb-3">
            <Form.Label>Selling Price</Form.Label>
            <Form.Control
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              placeholder="Enter Selling Price"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" data-bs-dismiss="modal">
          Close
        </Button>
        <Button variant="primary" onClick={handleBookDetailsSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
AddBookDetails.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  
};
export default AddBookDetails;
    