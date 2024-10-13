import moment from "moment";
import PropTypes from 'prop-types';
import { imageUrl } from "../services/dataurl";

const ViewUser = ({ user }) => {
    console.log("useruseruseruser", user);

    return (
        <div
            className="modal"
            id="view_user"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog alert_modal" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">
                            User Details
                        </h5>
                        <button
                            className="btn-close"
                            type="button"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {user?.name && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>Name</span>
                                    <p>{user?.name}</p>
                                </div>
                            </div>
                        )}
                        {user?.emailId && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>Email Id</span>
                                    <p>{user?.emailId}</p>
                                </div>
                            </div>
                        )}
                        {user?.mobileNumber && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>Mobile Number</span>
                                    <p>{user?.mobileNumber}</p>
                                </div>
                            </div>
                        )}
                        {user?.dob && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>Date of Birth</span>
                                    <p>{user?.dob}</p>
                                </div>
                            </div>
                        )}
                        {user?.profileIcon && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>Profile Picture</span>
                                    <img src={imageUrl + user?.profileIcon} alt="profile_icon" width={100} height={100} />
                                </div>
                            </div>
                        )}
                        {user?.gender && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>Gender</span>
                                    <p>{user?.gender}</p>
                                </div>
                            </div>
                        )}
                        {user?.address1 && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>Address 1</span>
                                    <p>{user?.address1}</p>
                                </div>
                            </div>
                        )}
                        {user?.address2 && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>Address 2</span>
                                    <p>{user?.address2}</p>
                                </div>
                            </div>
                        )}
                        {user?.city && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>City</span>
                                    <p>{user?.city}</p>
                                </div>
                            </div>
                        )}
                        {user?.state && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>State</span>
                                    <p>{user?.state}</p>
                                </div>
                            </div>
                        )}
                        {user?.country && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>Country</span>
                                    <p>{user?.country}</p>
                                </div>
                            </div>
                        )}
                        {user?.pincode && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>Pincode</span>
                                    <p>{user?.pincode}</p>
                                </div>
                            </div>
                        )}
                        {user?.createdAt && (
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-between">
                                    <span>Account Created</span>
                                    <p>{moment(user?.createdAt).format('DD/MM/YYYY')}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

ViewUser.propTypes = {
    user: PropTypes.object.isRequired, // Adjust based on the expected shape of `user`
};

export default ViewUser;
