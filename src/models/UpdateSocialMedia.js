import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { ResultFunction } from "../comman/resultFunction";
import { updateSocialMediaurlById } from "../services/socialmedia.service";

const UpdateSocialMedia = (props) => {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [id, setId] = useState("");
 

  useEffect(() => {
    if (props && Object.keys(props.socialmedia).length > 0) {
      setFacebook(props.socialmedia.facebook);
      setInstagram(props.socialmedia.instagram);
      setWhatsapp(props.socialmedia.whatsapp);
      setLinkedin(props.socialmedia.linkedin);
      setYoutube(props.socialmedia.youtube);
      setTwitter(props.socialmedia.twitter);
      setTelegram(props.socialmedia.telegram);
      // eslint-disable-next-line no-underscore-dangle
      setId(props.socialmedia._id);
      
    }
  }, [props]);

  
  const handleSocialMediaUrl = async () => {
    const data = {
      facebook,
      instagram,
      whatsapp,
      linkedin,
      youtube,
      twitter,
      telegram,
      id,
    };
    const result = await updateSocialMediaurlById(data);
    ResultFunction(result, props.getData);
    props.onHide()
  };

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Social Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Facebook Url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Instagram Url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Whatsapp Url"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Linkedin Url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Youtube Url"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Twitter Url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Telegram Url"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="primary" onClick={handleSocialMediaUrl}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UpdateSocialMedia.propTypes = {
  socialmedia: PropTypes.shape({
    facebook: PropTypes.string,
    instagram: PropTypes.string,
    whatsapp: PropTypes.string,
    linkedin: PropTypes.string,
    youtube: PropTypes.string,
    twitter: PropTypes.string,
    telegram: PropTypes.string,
    _id: PropTypes.string,
  }),
  getData: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default UpdateSocialMedia;
