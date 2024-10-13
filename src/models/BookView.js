import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { imageUrl } from "../services/dataurl";

export const BookView = (props) => {
  const [bookName, setBookName] = useState("");
  const [bookIcon, setBookIcon] = useState("");
  const [MRP, setMRP] = useState("");
  const [ISBN, setISBN] = useState("");
  const [author, setAuthor] = useState("");
  const [bookCode, setBookCode] = useState("");
  const [type, setType] = useState("");
  const [language, setLanguage] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [catogaryList, setCatogaryList] = useState([]);

  useEffect(() => {
    if (props && props.bookDetails) {
      const { bookDetails } = props;
      setBookName(bookDetails.bookName || "");
      setBookIcon(bookDetails.bookIcon || "");
      setMRP(bookDetails.MRP || "");
      setISBN(bookDetails.ISBN || "");
      setAuthor(bookDetails.author || "");
      setBookCode(bookDetails.bookCode || "");
      setLanguage(bookDetails.language || "");
      setType(bookDetails.type || "");
      setSellingPrice(bookDetails.sellingPrice || "");
      setCatogaryList(bookDetails.categoryData || []);
    }
  }, [props]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Book Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Category:</Form.Label>
            <h6>{catogaryList.length > 0 ? catogaryList[0].categoryName : 'N/A'}</h6>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Book Name:</Form.Label>
            <h6>{bookName || 'N/A'}</h6>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Book Icon:</Form.Label>
            <div>
              {bookIcon ? (
                <img src={imageUrl + bookIcon} alt="Book Icon" width="100px" height="100px" />
              ) : (
                'No Icon Available'
              )}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>MRP Price:</Form.Label>
            <h6>{MRP || 'N/A'}</h6>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ISBN:</Form.Label>
            <h6>{ISBN || 'N/A'}</h6>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Book Code:</Form.Label>
            <h6>{bookCode || 'N/A'}</h6>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author Name:</Form.Label>
            <h6>{author || 'N/A'}</h6>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Book Type:</Form.Label>
            <h6>{type || 'N/A'}</h6>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Language:</Form.Label>
            <h6>{language || 'N/A'}</h6>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Selling Price:</Form.Label>
            <h6>{sellingPrice || 'N/A'}</h6>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

BookView.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  bookDetails: PropTypes.shape({
    bookName: PropTypes.string,
    bookIcon: PropTypes.string,
    MRP: PropTypes.string,
    ISBN: PropTypes.string,
    author: PropTypes.string,
    bookCode: PropTypes.string,
    language: PropTypes.string,
    type: PropTypes.string,
    sellingPrice: PropTypes.string,
    categoryData: PropTypes.arrayOf(
      PropTypes.shape({
        categoryName: PropTypes.string,
      })
    ),
  }),
};

export default BookView;
