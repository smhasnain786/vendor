import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { ResultFunction } from "../comman/resultFunction";
import { BookFilesUpdate } from "../services/book.service";

export const UpdateBookFiles = (props) => {
  const [id, setId] = useState("");
  const [file, setFile] = useState("");
  const [chapter, setChapter] = useState("");
  const [fileType, setFileType] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookId, setBookId] = useState("");

  useEffect(() => {
    if (props && props.data) {
      /* eslint-disable no-underscore-dangle */
      setId(props?.data?._id);
      setFile(props?.data?.file);
      setFileType(props?.data?.fileType);
      setChapter(props?.data?.chapter);
      if (props?.data?.booksData) {
        setBookName(props?.data?.booksData[0]?.bookName);
        setBookId(props?.data?.booksData[0]?._id);
      }
    }
  }, [props]);

  const handleFileChange = (e) => {
    const pdf = e.target.files[0];
    setFile(pdf);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("bookId", bookId);
    formData.append("file", file);
    formData.append("chapter", chapter);
    formData.append("fileType", fileType);
    const result = await BookFilesUpdate(formData);
    ResultFunction(result, props.bookFiles);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Files</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBookName" className="mb-3">
            <Form.Label>Select Book Name</Form.Label>
            <Form.Select value={bookName} disabled>
              <option>{bookName}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formFileType" className="mb-3">
            <Form.Label>Select File Type</Form.Label>
            <Form.Select value={fileType} disabled>
              <option>{fileType}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formChapter" className="mb-3">
            <Form.Label>Chapter</Form.Label>
            <Form.Control
              type="text"
              value={chapter}
              placeholder="Add chapter"
              onChange={(e) => setChapter(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleSubmit}
            className="w-100"
          >
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

UpdateBookFiles.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    file: PropTypes.string,
    chapter: PropTypes.string,
    fileType: PropTypes.string,
    booksData: PropTypes.arrayOf(
      PropTypes.shape({
        bookName: PropTypes.string,
        _id: PropTypes.string,
      })
    ),
  }),
  bookFiles: PropTypes.func,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default UpdateBookFiles;
