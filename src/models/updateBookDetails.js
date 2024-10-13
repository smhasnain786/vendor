import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap'; // Importing required react-bootstrap components

import { BookUpdate } from "../services/book.service";
import { HotToaster } from "../utils/Toaster";
import { imageUrl } from "../services/dataurl";

const UpdateBookDetails = (props) => {
  const [_id, setId] = useState("");
  const [itemType, setItemType] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookIcon, setBookIcon] = useState("");
  const [MRP, setMRP] = useState("");
  const [ISBN, setISBN] = useState("");
  const [author, setAuthor] = useState("");
  const [bookCode, setBookCode] = useState("");
  const [type, setType] = useState("");
  const [samplePdf, setSamplePdf] = useState("");
  const [chapterCount, setChapterCount] = useState(0);
  const [language, setLanguage] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [catogaryList, setCatogaryList] = useState([]);
  const [features, setFeatures] = useState("");
  const [bookType] = useState(["NEW ARRIVALS", "BEST SELLERS", "UPCOMING EXAM BOOKS"]);
  const [encodedImage, setEncodedImage] = useState("");

  useEffect(() => {
    if (props && Object.keys(props.bookDetails).length > 0) {
      /* eslint-disable no-underscore-dangle */
      setId(props.bookDetails._id);
      setBookName(props.bookDetails.bookName);
      setItemType(props.bookDetails.itemType);
      setBookIcon(props.bookDetails.bookIcon);
      setMRP(props.bookDetails.MRP);
      setISBN(props.bookDetails.ISBN);
      setAuthor(props.bookDetails.author);
      setChapterCount(props.bookDetails.chapterCount);
      setSamplePdf(props.bookDetails.samplePdf);
      setBookCode(props.bookDetails.bookCode);
      setLanguage(props.bookDetails.language);
      setType(props.bookDetails.type);
      setSellingPrice(props.bookDetails.sellingPrice);
      setCategoryId(props.bookDetails.categoryId);
      setFeatures(props.bookDetails.features);
      setCatogaryList(props.bookDetails.categoryData);
    }
  }, [props]);

  const handleBookImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      const imgata = URL.createObjectURL(e.target.files[0]);
      setBookIcon(image);
      setEncodedImage(imgata);
    } else {
      setBookIcon("");
      setEncodedImage("");
    }
  };

  const resultfunction = (result) => {
    HotToaster(result.status, result.message);
  };

  const handleBookDetailsUpdate = async () => {
    const formdata = new FormData();
    formdata.append("_id", _id);
    formdata.append("itemType", itemType);
    formdata.append("categoryId", categoryId);
    formdata.append("bookName", bookName);
    formdata.append("bookIcon", bookIcon);
    formdata.append("samplePdf", samplePdf);
    formdata.append("chapterCount", chapterCount);
    formdata.append("MRP", MRP);
    formdata.append("ISBN", ISBN);
    formdata.append("author", author);
    formdata.append("bookCode", bookCode);
    formdata.append("type", type);
    formdata.append("language", language);
    formdata.append("features", features);
    formdata.append("sellingPrice", sellingPrice);

    const result = await BookUpdate(formdata);
    console.log(result.status);
    if (result.status) {
      resultfunction(result);
      
    }
    
  };

  const handleBookSampleImage = (e) => {
    const pdf = e.target.files[0];
    setSamplePdf(pdf);
  };

  return (
    <Modal
      show={props.show} // `show` prop to control modal visibility
      onHide={props.onHide} // `onHide` prop for closing the modal
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Book Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Item Type</Form.Label>
            <Form.Control as="select" onChange={(e) => setItemType(e.target.value)} value={itemType}>
              <option value="">Select</option>
              <option value="book">Book</option>
              <option value="ebook">E-Book</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Category</Form.Label>
            <Form.Control as="select" onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>
              {catogaryList.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </Form.Control>

          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              type="text"
              value={bookName}
              placeholder="Enter Book Name"
              onChange={(e) => setBookName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Book Icon</Form.Label>
            <Form.Control type="file" onChange={handleBookImage} />
            <img src={encodedImage || imageUrl + bookIcon} alt="" width="100px" height="100px" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Book Sample Pdf</Form.Label>
            <Form.Control type="file" onChange={handleBookSampleImage} />
            <a href={imageUrl + samplePdf} rel="noreferrer" target="_blank" download>
              View Sample Pdf
            </a>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>MRP Price</Form.Label>
            <Form.Control
              type="number"
              value={MRP}
              placeholder="Enter Mrp Price"
              onChange={(e) => setMRP(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              value={ISBN}
              placeholder="Enter ISBN"
              onChange={(e) => setISBN(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Book Code</Form.Label>
            <Form.Control
              type="text"
              value={bookCode}
              placeholder="Enter Book Code"
              onChange={(e) => setBookCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author Name</Form.Label>
            <Form.Control
              type="text"
              value={author}
              placeholder="Enter Author Name"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Chapter Count</Form.Label>
            <Form.Control
              type="number"
              value={chapterCount}
              placeholder="Enter Chapter Count"
              onChange={(e) => setChapterCount(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Book Type</Form.Label>
            <Form.Control as="select" onChange={(e) => setType(e.target.value)} value={type}>
              <option value={type}>{type}</option>
              {bookType
                .filter((types) => types !== type)  // Filter out the current selected type
                .map((types) => (
                  <option key={types} value={types}>
                    {types}
                  </option>
                ))}
            </Form.Control>

          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Language</Form.Label>
            <Form.Control
              type="text"
              value={language}
              placeholder="Enter Language"
              onChange={(e) => setLanguage(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Selling Price</Form.Label>
            <Form.Control
              type="number"
              value={sellingPrice}
              placeholder="Enter Selling Price"
              onChange={(e) => setSellingPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Features</Form.Label>
            <Form.Control
              type="text"
              value={features}
              placeholder="Enter Features"
              onChange={(e) => setFeatures(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleBookDetailsUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UpdateBookDetails.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  bookDetails: PropTypes.object.isRequired,
};

export default UpdateBookDetails;
