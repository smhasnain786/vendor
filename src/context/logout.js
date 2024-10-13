import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create a context for logout state
export const logoutContext = createContext({});

// Component to manage logout after token expiration
export const LogoutAfterTokenExpire = ({ children }) => {
  const [isLogout, setIsLogout] = useState(false);

  return (
    <>
      <logoutContext.Provider value={{ isLogout, setIsLogout }}>
        {children}
      </logoutContext.Provider>
      <LogoutModal isLogout={isLogout} />
    </>
  );
};

// Prop validation for LogoutAfterTokenExpire component
LogoutAfterTokenExpire.propTypes = {
  children: PropTypes.node.isRequired,
};

// Logout modal component
const LogoutModal = ({ isLogout }) => {
  const handleClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      className="modal"
      id="logout_modal"
      tabIndex="-1"  // Fixes the tabindex issue
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      style={{ display: isLogout ? "block" : "none", marginTop: "10%" }}
    >
      <div className="modal-dialog alert_modal" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Your Token has Expired! Do you want to login again?
            </h5>
            <button
              className="btn-close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <button
              className="btn btn-s btn-indigo btn-block w-100"
              data-bs-dismiss="modal"
              type="button"
              onClick={handleClick}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop validation for LogoutModal component
LogoutModal.propTypes = {
  isLogout: PropTypes.bool.isRequired,
};

export default LogoutModal;
