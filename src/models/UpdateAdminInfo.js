import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap'; // Importing components from React-Bootstrap
import { ResultFunction } from "../comman/resultFunction"
import { updateAdminInformation } from "../services/admin.service"

const UpdateAdminInfo = (props) => {
    const [emailId, setEmailId] = useState("");
    const [mobileNum, setMobileNum] = useState("");
    const [address, setAddress] = useState("");
    const [id, setId] = useState("");
    const [whatsAppNumber, setWhatsAppNumber] = useState("");

    useEffect(() => {
        if (props && Object.keys(props.admindata).length > 0) {
            setEmailId(props?.admindata?.emailId);
            setAddress(props?.admindata?.address);
            setMobileNum(props?.admindata?.mobileNumber);
            setWhatsAppNumber(props?.admindata?.whatsAppNumber);
            setId(props?.admindata?._id); // eslint-disable-line no-underscore-dangle
        }
    }, [props]);

    const handleMobileNumberChange = (e) => {
        const { value } = e.target;
        setMobileNum(value);
    };

    const handleAdminInfoChange = async () => {
        const data = {
            id,
            emailId,
            mobileNum,
            address,
            whatsAppNumber
        };
        console.log("resultresult", data);
        const result = await updateAdminInformation(data);
        ResultFunction(result, props.getData);
    };

    return (
        <Modal
            show={props.show} // This prop will control the modal visibility
            onHide={props.onHide} // This function will be used to close the modal
            backdrop="static" // Prevents closing when clicking outside the modal
            keyboard={false} // Prevents closing with keyboard 'Esc' key
        >
            <Modal.Header closeButton>
                <Modal.Title>Update Admin Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Email Address"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Mobile Number"
                            value={mobileNum}
                            onChange={handleMobileNumberChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="WhatsApp Number"
                            value={whatsAppNumber}
                            onChange={(e) => setWhatsAppNumber(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAdminInfoChange}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

UpdateAdminInfo.propTypes = {
    admindata: PropTypes.shape({
        emailId: PropTypes.string,
        address: PropTypes.string,
        mobileNumber: PropTypes.string,
        whatsAppNumber: PropTypes.string,
        _id: PropTypes.string
    }),
    getData: PropTypes.func,
    show: PropTypes.bool.isRequired, // Whether the modal is visible
    onHide: PropTypes.func.isRequired // Function to close the modal
};

export default UpdateAdminInfo;
