import React, { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { HotToaster } from "../../utils/Toaster";
import { subadminByEmailId, subadminUpdate } from "../../services/subadmin.service";
import { imageUrl } from "../../services/dataurl";

const Books = () => {
  const [adminData, setAdminData] = useState({
    name: "",
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


  const { name, address, district, dor, email, gender, phone, pincode, place, state,  active, _id,image } = adminData;

  const getsubadmins = async () => {
    const result = await subadminByEmailId();
    if (result.status) {
      const adminList = result.data;
      setAdminData({
        name: adminList.name || '',
        address: adminList.address || '',
        district: adminList.district || '',
        dor: adminList.dor || '',
        email: adminList.email || '',
        gender: adminList.gender || '',
        phone: adminList.phone || '',
        pincode: adminList.pincode || '',
        place: adminList.place || '',
        state: adminList.state || '',
     
        active: adminList.active || '',
            // eslint-disable-next-line no-underscore-dangle
        _id: adminList._id || '',
        image: adminList.image || ''
      });
    } else {
      console.log("Failed to fetch data.");
    }
  };

  useEffect(() => {
    getsubadmins();
  }, []);

  const resultfunction = (result) => {
    HotToaster(result.status, result.message);
  };

  const handleProfileDetailsUpdate = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('state', state);
    formData.append('gender', gender);
    formData.append('district', district);
    formData.append('place', place);
    formData.append('pincode', pincode);
    formData.append('dor', dor);
   
    formData.append('_id', _id);
  
    // Append the image file if it exists
    if (image instanceof File) {
      formData.append('image', image);
    } else {
      formData.append('image', image);  // If the image is just a URL, append it as is
    }
  
    const result = await subadminUpdate(formData);
    if (result.status) {
      resultfunction(result);
      getsubadmins();
    }
  };
  
 
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
                                    {name?.charAt(0) || 'U'}
                                  </div>
                                )}
                              </div>
                              <div className="account-title mt-3">
                                <h4 className="m-b5">{name || "User"}</h4>
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
                            <h5 className="text-uppercase">Basic Information</h5>
                          </div>
                          <form>
                            <div className="row m-b30">
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="name" className="form-label">Coaching/Teacher Name:
                                    <input
                                      type="text"
                                      name="name"
                                      value={name}
                                      className="form-control"
                                      id="name"
                                      placeholder="Coaching/Teacher Name"
                                      onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="dob" className="form-label">DOR:
                                    <input
                                      type="date"
                                      name="dob"
                                      value={dor}
                                      className="form-control"
                                      id="dob"
                                      onChange={(e) => setAdminData({ ...adminData, dor: e.target.value })}
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <span className="label-width">Gender
                                  <div className="mb-3 d-flex align-items-center">
                                    {['Male', 'Female', 'Other'].map((genders) => (
                                      <div key={genders} className="me-3">
                                        <input
                                          type="radio"
                                          name="gender"
                                          value={genders}
                                          checked={genders === gender}
                                          onChange={(e) => setAdminData({ ...adminData, gender: e.target.value })}
                                          id={`gender-${genders}`}
                                        />
                                        <label htmlFor={`gender-${genders}`} className="ms-1">{genders}</label>
                                      </div>
                                    ))}
                                  </div>
                                </span>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="profileIcon" className="form-label">Profile Image:
                                    <input type="file" name="profileIcon" className="form-control" id="profileIcon" onChange={(e) => {setAdminData({ ...adminData, image:  e.target.files[0] });console.log(e.target.files[0]);
                                    }} />
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="shop-bx-title clearfix">
                              <h5 className="text-uppercase">Contact Information</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="address" className="form-label">Address:
                                    <input
                                      type="text"
                                      name="address"
                                      value={address}
                                      onChange={(e) => setAdminData({ ...adminData, address: e.target.value })}
                                      className="form-control"
                                      id="address"
                                      placeholder="Address"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="state" className="form-label">State:
                                    <input
                                      type="text"
                                      name="state"
                                      value={state}
                                      onChange={(e) => setAdminData({ ...adminData, state: e.target.value })}
                                      className="form-control"
                                      id="state"
                                      placeholder="State"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="district" className="form-label">District:
                                    <input
                                      type="text"
                                      name="district"
                                      value={district}
                                      onChange={(e) => setAdminData({ ...adminData, district: e.target.value })}
                                      className="form-control"
                                      id="district"
                                      placeholder="District"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="pincode" className="form-label">Pincode:
                                    <input
                                      type="text"
                                      name="pincode"
                                      value={pincode}
                                      onChange={(e) => setAdminData({ ...adminData, pincode: e.target.value })}
                                      className="form-control"
                                      id="pincode"
                                      placeholder="Pincode"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="phone" className="form-label">Phone:
                                    <input
                                      type="text"
                                      name="phone"
                                      value={phone}
                                      onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
                                      className="form-control"
                                      id="phone"
                                      placeholder="Phone"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="email" className="form-label">Email:
                                    <input
                                      type="email"
                                      name="email"
                                      value={email}
                                      onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                                      className="form-control"
                                      id="email"
                                      placeholder="Email"
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </form>
                          <button
                            className="btn btn-primary mt-3"
                            type="button"
                            onClick={handleProfileDetailsUpdate}
                          >
                            Update Profile
                          </button>
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

export default Books;
