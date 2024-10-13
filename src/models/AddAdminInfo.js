import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { ResultFunction } from "../comman/resultFunction";
import { addAdminInformation } from "../services/admin.service";

const AddAdminInfo = (props) => {
  const [emailId, setEmailId] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [address, setAddress] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");

 

  const handleAdminInfoChange = async () => {
    const data = {
      emailId,
      mobileNumber: mobileNum,
      address,
      whatsAppNumber,
    };

    const result = await addAdminInformation(data);
    ResultFunction(result, props.getData);
    
  };

  return (
    <>
    

      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Admin Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                value={mobileNum}
                onChange={(e) => setMobileNum(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formWhatsAppNumber">
              <Form.Label>WhatsApp Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter WhatsApp number"
                value={whatsAppNumber}
                onChange={(e) => setWhatsAppNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAdminInfoChange}>
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

AddAdminInfo.propTypes = {
  getData: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AddAdminInfo;
