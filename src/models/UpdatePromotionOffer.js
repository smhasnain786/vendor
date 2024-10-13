import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { updatePromotionAndOfferDetails } from "../services/book.service";
import { ResultFunction } from "../comman/resultFunction";
import { imageUrl } from "../services/dataurl";

const UpdatePromotionOffer = (props) => {
  const [categoryList, setCategoryList] = useState([]);
  const [promotionIcon, setPromotionIcon] = useState("");
  const [encodedIcon, setEncodedIcon] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(props).length > 0 && Object.keys(props.promotionData).length > 0) {
      setCategoryList(props.promotionData.categoryData);
      setPromotionIcon(imageUrl + props.promotionData.icon);
      setCategoryId(props.promotionData.categoryId);
      // eslint-disable-next-line no-underscore-dangle
      setId(props.promotionData._id);
    }
  }, [props]);

  const handleImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      const imgata = URL.createObjectURL(image);
      setPromotionIcon(image);
      setEncodedIcon(imgata);
    } else {
      setPromotionIcon("");
      setEncodedIcon("");
    }
  };

  const handlePromotionChange = async () => {
    const formdata = new FormData();
    formdata.append("_id", id);
    formdata.append("categoryId", categoryId);
    formdata.append("promotionIcon", promotionIcon);
    const result = await updatePromotionAndOfferDetails(formdata);
    ResultFunction(result, props.getData);

  };

  return (
    <>

      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Promotion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categoryList.length > 0 &&
                  categoryList.map((category) => (
                    // eslint-disable-next-line no-underscore-dangle
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Promotion Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="Promotion image"
                name="promotionIcon"
                onChange={handleImage}
              />
              <div className="mt-2">
                <img
                  src={encodedIcon || promotionIcon}
                  alt="Selected promotion"
                  width="100px"
                  height="100px"
                />
              </div>
            </Form.Group>
            <Button
              variant="primary"
              onClick={handlePromotionChange}
              block
            >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

UpdatePromotionOffer.propTypes = {
  promotionData: PropTypes.shape({
    categoryData: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        categoryName: PropTypes.string
      })
    ),
    icon: PropTypes.string,
    categoryId: PropTypes.string,
    _id: PropTypes.string,
  }),
  getData: PropTypes.func,
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default UpdatePromotionOffer;
