import { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { PermotiopromotionAndOfferAdd } from "../services/book.service";
import { ResultFunction } from "../comman/resultFunction";

const AddPromotionOffer = (props) => {
    const [categoryList, setCategoryList] = useState([]);
    const [promotionImageSize] = useState(["321 × 509 px", "321 × 498 px", "267 × 227 px", "236 × 340 px", "524 × 134 px"]);
    const [promotionIcon, setPromotionIcon] = useState("");
    const [encodedIcon, setEncodedIcon] = useState("");
    const [categoryId, setCategoryId] = useState("");
   

    useEffect(() => {
        if (props && props.categoryList) {
            setCategoryList(props.categoryList);
        }
    }, [props]);

    const handleImage = (e) => {
        const image = e.target.files[0];
        if (image) {
            const imgata = URL.createObjectURL(e.target.files[0]);
            setPromotionIcon(image);
            setEncodedIcon(imgata);
        } else {
            setPromotionIcon("");
            setEncodedIcon("");
        }
    };

    const handlePromotionChange = async () => {
        const formdata = new FormData();
        formdata.append("categoryId", categoryId);
        formdata.append("promotionIcon", promotionIcon);
        const result = await PermotiopromotionAndOfferAdd(formdata);
        ResultFunction(result, props.getData);
       
    };

    

    return (
        <>
            

            <Modal show={props.show} onHide={props.onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Poster</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control 
                                as="select" 
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="">Select</option>
                                {categoryList.length > 0 &&
                                    categoryList.map((category) => (
                                        // eslint-disable-next-line no-underscore-dangle
                                        <option value={category._id} key={category._id}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Promotion Image</Form.Label>
                            <Form.Control 
                                type="file" 
                                name="promotionIcon" 
                                onChange={handleImage}
                            />
                            <div className="mt-2">
                                <img 
                                    src={encodedIcon} 
                                    alt="Selected" 
                                    width="100px" 
                                    height="100px" 
                                />
                            </div>
                            <Form.Text className="text-muted">
                                Note: Please Add {promotionImageSize[props.length]} size of image
                            </Form.Text>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            onClick={handlePromotionChange} 
                            block
                        >
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

AddPromotionOffer.propTypes = {
    categoryList: PropTypes.array,
    getData: PropTypes.func,
    length: PropTypes.number,
    show: PropTypes.bool,
    onHide: PropTypes.func
};

export default AddPromotionOffer;
