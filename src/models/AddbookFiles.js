import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Button, Form } from "react-bootstrap";
import { ResultFunction } from "../comman/resultFunction";
import { addBookFiles } from "../services/book.service";

export const AddBookFiles = (props) => {
  const [file, setFile] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapterCount, setChapterCount] = useState(0);
  const [files] = useState(["ppt", "pdf", "pptPdf", "editable"]);
  const [fileType, setFileType] = useState("");
  const [bookList, setBookList] = useState([]);
  const [bookId, setBookId] = useState([]);

  useEffect(() => {
    if (props && props.bookList) {
      setBookList(props.bookList);
    }
  }, [props]);

  const handleFileChange = (e) => {
    const pdf = e.target.files[0];
    setFile(pdf);
  };

  const handleBookChange = (e) => {
    const { value } = e.target;
    const val = value && JSON.parse(value);
    setChapterCount(val?.chapterCount);
    // eslint-disable-next-line no-underscore-dangle
    setBookId(val?._id);
  };

  const chapterHtml = () => {
    const html = [];
    for (let i = 0; i < chapterCount; i++) {
      html.push(<option value={`Chapter ${i + 1}`} key={i}>{`Chapter ${i + 1}`}</option>);
    }
    return html;
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("bookId", bookId);
    formdata.append("file", file);
    formdata.append("fileType", fileType);
    formdata.append("chapter", chapter);
    const result = await addBookFiles(formdata);
    ResultFunction(result, props.bookFiles);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Files</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBookSelect" className="mb-3">
            <Form.Label>Select Book</Form.Label>
            <Form.Select onChange={handleBookChange}>
              <option value="">Select</option>
              {bookList.map((val) => (
                /* eslint-disable no-underscore-dangle */
                <option value={JSON.stringify(val)} key={val._id}>
                  {val.bookName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formChapterSelect" className="mb-3">
            <Form.Label>Select Chapter</Form.Label>
            <Form.Select onChange={(e) => setChapter(e.target.value)}>
              <option>Select</option>
              {chapterHtml()}
              <option value="Full Book">Full Book</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formFileTypeSelect" className="mb-3">
            <Form.Label>Select File Type</Form.Label>
            <Form.Select onChange={(e) => setFileType(e.target.value)}>
              <option>Select</option>
              {chapter === "Full Book" ? (
                files.map((val) => <option value={val} key={val}>{val}</option>)
              ) : (
                <option value="pdf">pdf</option>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formFileUpload" className="mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit} className="w-100">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddBookFiles.propTypes = {
  bookList: PropTypes.array.isRequired,
  bookFiles: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AddBookFiles;
