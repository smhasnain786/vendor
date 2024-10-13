import React, { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { HotToaster } from "../../utils/Toaster";
import { subadminByEmailId,changePassword  } from "../../services/subadmin.service";
import { imageUrl } from "../../services/dataurl";

const ChangePassword = () => {
  const [adminData, setAdminData] = useState({
    names: "",
    address: "",
    district: "",
    dor: "",
    email: "",
    gender: "",
    phone: "",
    pincode: "",
    place: "",
    state: "",
   
    active: "",
    _id: "",
    image:""
  });


  const { names ,email, phone,  active, image } = adminData;

  const getsubadmins = async () => {
    const result = await subadminByEmailId();
    if (result.status) {
      const adminList = result.data;
      setAdminData({
        names: adminList.name || '',
      
        email: adminList.email || '',
     
        phone: adminList.phone || '',
      
     
        active: adminList.active || '',
        image: adminList.image || ''
      });
    } else {
      console.log("Failed to fetch data.");
    }
  };

  useEffect(() => {
    getsubadmins();
  }, []);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
})
const handleChange = (e) => {
    const { name, value } = e.target
    setPasswordData(preState => ({
        ...preState,
        [name]: value
    }))
}

const handleSubmit = async (e) => {
    e.preventDefault()
    const { oldPassword, newPassword, confirmPassword } = passwordData
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
        HotToaster(false, "All fields are required")
        return
    }
    if (newPassword !== confirmPassword) {
        HotToaster(false, "New password and confirm password should be same")
        return
    }
    
    const result = await changePassword(passwordData)
    HotToaster(result?.status, result?.message)
}



  
 
  return (
    <>
      <div id="layoutSidenav_content">
        <Toaster />
        <main>
          <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div className="container-xl px-4">
              <div className="page-header-content pt-4">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mt-4">
                    <h1 className="page-header-title">
                      <div className="page-header-icon">
                        <i className="fa fa-prescription"></i>
                      </div>
                      Book Management
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="container-xl px-4 mt-n10">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-3 col-lg-4 m-b30">
                        <div className="sticky-top">
                          <div className="shop-account">
                            <div className="account-detail text-center">
                              <div className="my-image">
                                {adminData ? (
                                  <img
                                    alt="profile"
                                    src={imageUrl+image || "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"}
                                    style={{ width: '50%', borderRadius: '50%' }}
                                  />
                                ) : (
                                  <div
                                    className="cap"
                                    style={{
                                      backgroundColor: '#e12729',
                                      width: '80px',
                                      height: '80px',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderRadius: '50%',
                                      color: 'white',
                                      fontSize: '24px'
                                    }}
                                  >
                                    {names?.charAt(0) || 'U'}
                                  </div>
                                )}
                              </div>
                              <div className="account-title mt-3">
                                <h4 className="m-b5">{names || "User"}</h4>
                                <p className="m-b0">{email || ""}</p>
                                <p className="m-b0">{phone || ""}</p>
                                <p className="m-b0">{active === '1' ? <span className="badge me-2 bg-success rounded-pill text-dark-white">Active</span> : 'Not Active'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-9 col-lg-8 m-b30">
                                <div className="shop-bx shop-profile">
                                    <div className="shop-bx-title clearfix">
                                        <h5 className="text-uppercase">Change Your Password Here
                                        </h5>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="row m-b30">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="mb-3">

                                                    <label htmlFor="name" className="form-label">Old Password
                                                    <input type="password" name="oldPassword" onChange={handleChange} value={passwordData?.oldPassword} className="form-control" />
                                                    </label>
                                                   
                                                </div>
                                                <div className="mb-3">

                                                    <label htmlFor="name" className="form-label">New Password
                                                    <input type="password" name="newPassword" onChange={handleChange} value={passwordData?.newPassword} className="form-control" />
                                                    </label>
                                                    
                                                </div>
                                                <div className="mb-3">

                                                    <label htmlFor="name" className="form-label">Confirm Password
                                                    <input type="password" name="confirmPassword" onChange={handleChange} value={passwordData?.confirmPassword} className="form-control" />
                                                    </label>
                                                    
                                                </div>
                                            </div>

                                        </div>

                                        <button className="btn btn-primary btnhover mt-2" type="submit" >
                                            Save Setting
                                        </button>
                                    </form>
                                </div>
                            </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ChangePassword;
