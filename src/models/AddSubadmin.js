import React, { useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertSuccessMessage, alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import Select from "react-select";

const AddsubAdmin = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('male');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [passwords, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [multipleSelectd, setMultipleSelectd] = useState([]);



    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "firstName":
                setFirstName(event.target.value);
                break;
            case "lastName":
                setLastName(event.target.value);
                break;
            case "gender":
                setGender(event.target.value);
                break;
            case "number":
                setNumber(event.target.value);
                break;
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            case "dob":
                setDob(event.target.value);
                break;
            default:
        }
    }

    const resetInputChange = () => {
        setFirstName("");
        setLastName("");
        setGender("");
        setNumber("");
        setEmail("");
        setPassword("");
        setDob("");
        setMultipleSelectd("");

    }

    const handleSubAdmin = async (firstName, lastName, gender, email, number, passwords, dob, multipleSelectd) => {
        await AuthService.AddsubAdmin(firstName, lastName, gender, email, number, passwords, dob, multipleSelectd).then(async result => {
            if (result.message === "") {
                try {
                    alertSuccessMessage(result.message);
                    resetInputChange();
                } catch (error) {
                    alertErrorMessage(error);
                    /* console.log('error', `${error}`); */
                }
            } else {
                alertErrorMessage(result.message);
            }
        })
    }



    var multipleSelect = [
        {
            value: 0,
            label: 'Dashboards'
        },
        {
            value: 1,
            label: 'Traders'
        },
        {
            value: 2,
            label: 'KYC Manager'
        },
        {
            value: 3,
            label: 'Currency Management'
        },
        {
            value: 4,
            label: 'User Wallet Management'
        },
        {
            value: 5,
            label: 'Currency Pair Management'
        },
        {
            value: 6,
            label: 'Order Management'
        },
        {
            value: 7,
            label: 'Trading Fee Report'
        },
        {
            value: 8,
            label: "Funds Management"
        },
        {
            value: 9,
            label: 'Fiat Management'
        },
        {
            value: 10,
            label: 'Email Template'
        },
        {
            value: 11,
            label: 'Banner Management'
        },
        {
            value: 12,
            label: 'Notification Management'
        },
    ];

    const handleMultiple = (e) => {
        setMultipleSelectd(Array.isArray(e) ? e.map(x => x.value) : []);
    }


    console.log(multipleSelectd, 'multipleSelect');

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
                                        Add new sub admin
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container-xl px-4 mt-n10">
                    <div className="card mb-4">
                        <div className="card-header">Enter Sub Admin Details</div>
                        <div className="card-body">
                            <form>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputFirstName">First name <em>*</em></label>
                                        <input type="text" className="form-control  form-control-solid" id="inputFirstName" placeholder="Enter your first name" name="firstName" value={firstName} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputLastName">Last name <em>*</em> </label>
                                        <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Enter your last name" name="lastName" value={lastName} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputBirthday">Gander <em>*</em></label>
                                        <select className="form-control form-control-solid" id="exampleFormControlSelect1" name="gender" value={gender} onChange={handleInputChange}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputEmailAddress">Email</label>
                                        <input className="form-control form-control-solid" id="inputEmailAddress" type="email" placeholder="Enter your email address" name="email" value={email} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Phone Number</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Number" name="number" value={number} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Password</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Password" name="password" value={passwords} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Registration Date</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="date" placeholder="Enter your Date of Birth" name="dob" value={dob} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3 " >
                                    <div className="col-md-6" >
                                        <label className="small mb-1" for="inputLocation">Permissions</label>
                                        <Select isMulti options={multipleSelect}
                                            onChange={setMultipleSelectd}
                                            value={multipleSelectd}
                                        >
                                        </Select>
                                    </div>
                                </div>
                                <button className="btn btn-indigo" type="button" onClick={() => handleSubAdmin(firstName, lastName, gender, email, number, passwords, dob, multipleSelectd)} > Submit Details </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AddsubAdmin;