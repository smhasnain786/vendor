import React, { useState } from "react";
import Select from "react-select";
import { Toaster } from "react-hot-toast";
import { State, City } from 'country-state-city';
import { SubadminAdd } from "../../services/subadmin.service";
import { HotToaster } from "../../utils/Toaster";

const CoachingManagement = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState();
    const [stateIsoCode, setStateIsoCode] = useState();
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [pincode, setPincode] = useState('');
    const [passwords, setPassword] = useState('');
    const [dor, setDor] = useState('');
    const [multipleSelectd, setMultipleSelectd] = useState([]);

    const handleInputChange = (event) => {
        const { names, value } = event.target;
        switch (names) {
            case "name":
                setName(value);
                break;
            case "gender":
                setGender(value);
                break;
            case "number":
                setNumber(value);
                break;
            case "district":
                setDistrict(value);
                break;
            case "address":
                setAddress(value);
                break;
            case "pincode":
                setPincode(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "dor":
                setDor(value);
                break;
            default:
        }
    };

    const handleStateChange = (event) => {
        const obj = JSON.parse(event.target.value);
        setState(obj.name);
        setStateIsoCode(obj.isoCode);
    };

    const resetInputChange = () => {
        setName("");
        setAddress("");
        setDistrict("");
        setPincode("");
        setState("");
        setGender("");
        setNumber("");
        setEmail("");
        setPassword("");
        setDor("");
        setMultipleSelectd([]);
    };

    const handleSubAdmin = async (nameVal, genderVal, emailVal, numberVal, passwordVal, dorVal, multipleSelectdVal, addressVal, districtVal, stateVal, pincodeVal) => {
        const data = {
            name: nameVal,
            gender: genderVal,
            email: emailVal,
            phone: numberVal,
            password: passwordVal,
            dor: dorVal,
            role: "coaching",
            address: addressVal,
            district: districtVal,
            state: stateVal,
            pincode: pincodeVal,
            permissions: multipleSelectdVal
        };
        const result = await SubadminAdd(data);
        HotToaster(result.status, result.message);
        if (result.status) {
            resetInputChange();
        }
    };

    const multipleSelect = [
        { value: 4, label: 'Books Management' }
    ];

    return (
        <div id="layoutSidenav_content">
            <main>
                <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                    <div className="container-xl px-4">
                        <div className="page-header-content pt-4">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-auto mt-4">
                                    <h1 className="page-header-title">
                                        <div className="page-header-icon"><i className="far fa-user"></i></div>
                                        Add New Coaching
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container-xl px-4 mt-n10">
                    <div className="card mb-4">
                        <div className="card-header">Enter Coaching Details</div>
                        <div className="card-body">
                            <form>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputFirstName">Full name <em>*</em>
                                        <input type="text" className="form-control form-control-solid" id="inputFirstName" placeholder="Enter your full name" name="name" value={name} onChange={handleInputChange} />
                                        </label>
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">Email
                                        <input className="form-control form-control-solid" id="inputEmailAddress" type="email" placeholder="Enter your email address" name="email" value={email} onChange={handleInputChange} />
                                        </label>
                                        
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputGender">Gender <em>*</em>
                                        <select className="form-control form-control-solid" id="inputGender" name="gender" value={gender} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="Masculin">Masculin</option>
                                            <option value="Feminine">Feminine</option>
                                            <option value="Neuter">Neuter</option>
                                        </select>
                                        </label>
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputNumber">Phone Number
                                        <input className="form-control form-control-solid" id="inputNumber" type="text" placeholder="Enter your Number" name="number" value={number} onChange={handleInputChange} />
                                        </label>
                                       
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPassword">Password
                                        <input className="form-control form-control-solid" id="inputPassword" type="text" placeholder="Enter your Password" name="password" value={passwords} onChange={handleInputChange} />
                                        </label>
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputDor">Registration Date
                                        <input className="form-control form-control-solid" id="inputDor" type="date" name="dor" value={dor} onChange={handleInputChange} />
                                        </label>
                                        
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputAddress">Address
                                        <input className="form-control form-control-solid" id="inputAddress" type="text" placeholder="Enter your Address" name="address" value={address} onChange={handleInputChange} />
                                        </label>
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputState">State
                                        <select name="state" id="inputState" className="form-control form-control-solid" value={state?.name} onChange={handleStateChange}>
                                            <option value="">--- Select State ---</option>
                                            {State.getStatesOfCountry("IN").map((states) => (
                                                <option key={JSON.stringify(states)} value={JSON.stringify(states)}>{states.name}</option>
                                            ))}
                                        </select>
                                        </label>
                                      
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputDistrict">District
                                        <select name="district" id="inputDistrict" className="form-control form-control-solid" value={district} onChange={handleInputChange}>
                                            <option value="">--- Select District ---</option>
                                            {City.getCitiesOfState("IN", stateIsoCode).map((city) => (
                                                <option key={city.name} value={city.name}>{city.name}</option>
                                            ))}
                                        </select>
                                        </label>
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPincode">Pincode
                                        <input className="form-control form-control-solid" id="inputPincode" type="text" placeholder="Enter your Pincode" name="pincode" value={pincode} onChange={handleInputChange} />
                                        </label>
                                       
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <div className="small mb-1" htmlFor="inputPermissions">Permissions
                                        <Select
                                            isMulti
                                            name="permissions"
                                            options={multipleSelect}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            value={multipleSelectd}
                                            onChange={(selectedOptions) => setMultipleSelectd(selectedOptions)}
                                        />
                                        </div>
                                       
                                    </div>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={() => handleSubAdmin(name, gender, email, number, passwords, dor, multipleSelectd, address, district, state, pincode)}>Submit</button>
                            </form>
                            <Toaster />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CoachingManagement;
