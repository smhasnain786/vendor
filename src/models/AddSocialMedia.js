import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { ResultFunction } from "../comman/resultFunction";
import { addSocialMediaurl } from "../services/socialmedia.service";

const AddSocialMedia = (props) => {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");


  const handleSocialMediaUrl = async () => {
    const data = {
      facebook,
      instagram,
      whatsapp,
      linkedin,
      youtube,
      twitter,
      telegram,
    };
    const result = await addSocialMediaurl(data);
    ResultFunction(result, props.getData);
    props.onHide(); // Close modal after submitting the data
  };

  return (
    <>
      

      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Admin Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder="Facebook Url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder="Instagram Url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder="Whatsapp Url"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder="Linkedin Url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder="Youtube Url"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                placeholder="Telegram Url"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Twitter Url"
                required
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleSocialMediaUrl}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddSocialMedia.propTypes = {
  getData: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AddSocialMedia;
