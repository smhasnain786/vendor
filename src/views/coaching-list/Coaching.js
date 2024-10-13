import React, { useEffect, useState } from "react";
// import AuthService from "../../../api/services/AuthService";
// import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { CSVLink } from "react-csv";
import { $ } from 'react-jquery-plugin';
import moment from "moment";
import Select from "react-select";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { State, City } from 'country-state-city';
import { getAllSubadmins, subadminDelete, subadminStatusChange, subadminUpdate } from "../../services/subadmin.service";
import { ResultFunction } from "../../comman/resultFunction";

const Coaching = () => {
    const { SearchBar } = Search;
    const [subAdminList, setSubAdminList] = useState([]);
    const [subadminId, setSubadminId] = useState([]);
    const [name, setName] = useState('');
    // const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [role, setRole] = useState('');
    const [gander, setGander] = useState('');
    const [passwords, setPassword] = useState('');
    const [multipleSelectd, setMultipleSelectd] = useState([]);
    const [state, setState] = useState();
    const [stateIsoCode, setStateIsoCode] = useState();
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [district, setDistrict] = useState('');
    const [dor, setDor] = useState('');
    const params = useLocation();

    const getsubadmins = async (locationParams) => { // renamed 'params' to 'locationParams'
        const pageType = {
            type: locationParams?.pathname?.split("-")[1]
        };
        const get = await getAllSubadmins(pageType);
        if (get.status && get.data.length > 0) {
            setSubAdminList(get.data);
        }
    };

    useEffect(() => {
        console.log("Page Type:", params.pathname.split("-")[1]);
        getsubadmins(params);
    }, []);

    const handleSubadminDetail = (id) => {
        console.log("objectid", id)
        setName(id.name);
        // setLastName(id.last_name);
        setEmail(id.email);
        setPincode(id.pincode);
        setGander(id.gender);
        setAddress(id.address);
        setState(id.state);
        setDistrict(id.district);
        setNumber(id.phone);
        setDor(id.dor);
        setRole(id.role)
        setMultipleSelectd(id.permissions);
        // eslint-disable-next-line no-underscore-dangle
        setSubadminId(id._id);
    }
    const deleteSubAdmin = async (userId) => {
        const data = {
            id: userId
        }
        const result = await subadminDelete(data)
        ResultFunction(result, getAllSubadmins)
    }
    const linkFollow = (cell, row) => {
        return (
            <>
                <button type="button" className="btn btn-dark btn-sm me-2" data-bs-toggle="modal" data-bs-target="#update_subadmin" onClick={() => handleSubadminDetail(row)}>Edit</button>

                <button type="button" className="btn btn-danger  btn-sm" onClick={() =>         // eslint-disable-next-line no-underscore-dangle
                    deleteSubAdmin(row?._id)}>Delete</button>
            </>
        );
    };
    const handleStatus = async (userId, cell) => {
        const data = {
            id: userId,
            status: cell
        }
        const status = await subadminStatusChange(data)
        ResultFunction(status, getsubadmins)
    }

    const statuslinkFollow = (cell, row) => {
        return (
            <>
                <button type="button" className={row?.active === "1" ? "btn btn-sm btn-success" : "btn btn-sm btn-danger"} style={{ marginLeft: "20px" }} onClick={() =>         // eslint-disable-next-line no-underscore-dangle
                    handleStatus(row?._id, cell === "0" ? "1" : "0")}>{row?.active === "1" ? "Active" : "Inactive"}</button>
            </>
        );
    };


    const DorFilter = (cell, row) => {
        return (
            <>
                {moment(row?.dor).format('DD MMMM YYYY')}
            </>
        );
    }





    const columns = [
        { dataField: 'name', text: 'Name' },
        { dataField: 'email', text: 'Email', sort: true, },
        { dataField: 'phone', text: 'Mobile Number', sort: true, },
        { dataField: 'role', text: 'Role', sort: true, },
        { dataField: 'dor', text: 'Date Of Registeration', sort: true, formatter: DorFilter },
        // { dataField: 'createdAt', text: 'Registration Date', sort: true, formatter: dateFilter },
        { dataField: 'active', text: 'Status', sort: true, formatter: statuslinkFollow },
        { dataField: 'Action', text: 'Action', formatter: linkFollow },
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 7,
        lastPageText: '>>',
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
        showTotal: true,
        alwaysShowAllBtns: true,
    });







    const handleStateChange = (event) => {
        console.log("event", event.target.value)
        const obj = JSON.parse(event.target.value)

        setState(obj.name)
        setStateIsoCode(obj.isoCode)
    }

    const handleUpdateSubadminList = async () => {
        const data = {
            name,
            _id: subadminId,
            gender: gander,
            email,
            phone: number,
            password: passwords,
            dor,
            role: "coaching",
            address,
            district,
            state,
            pincode,
            permissions: multipleSelectd
        }
        const result = await subadminUpdate(data)
        $('#update_subadmin').modal('hide');
        ResultFunction(result, getsubadmins)

    }

    const multiSelectForCoaching = [
        {
            value: 4,
            label: 'Books Management'
        },
    ]
    const multipleSelectForStaff = [
        // {
        //     value: 0,
        //     label: 'Dashboards'
        // },
        {
            value: 1,
            label: 'Users Management'
        },
        {
            value: 2,
            label: 'Category Management'
        },
        {
            value: 3,
            label: 'Poster Management'
        },
        {
            value: 4,
            label: 'Books Management'
        },
        {
            value: 5,
            label: 'Current Affairs Management'
        },
        {
            value: 6,
            label: 'Test Series Management'
        },
        {
            value: 7,
            label: 'Design Management'
        },
        {
            value: 8,
            label: 'Previous Year Paper Management'
        },
        {
            value: 9,
            label: 'Typing Management'
        },
        {
            value: 10,
            label: 'Data Translate Management'
        },
        {
            value: 11,
            label: 'Trending Title Management'
        },
        {
            value: 15,
            label: 'Review Management'
        },
        {
            value: 16,
            label: 'Carts Management'
        },
        {
            value: 17,
            label: 'Support Management'
        }
    ];

    console.log(multipleSelectd, 'multipleSelectd');

    return (
        <>
            <div id="layoutSidenav_content">
                <main>
                    <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                        <div className="container-xl px-4">
                            <div className="page-header-content pt-4">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-auto mt-4">
                                        <h1 className="page-header-title">
                                            <div className="page-header-icon"><i className="far fa-user"></i></div>
                                            {params?.id} List
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    {/* Main page content */}
                    <div className="container-xl px-4 mt-n10">
                        <div className="card mb-4">
                            <div className="card-header">{params?.id} Details
                                {subAdminList.length === 0 ? "" :
                                    <div className="dropdown">
                                        <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export </button>
                                        <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                            <CSVLink data={subAdminList} className="dropdown-item">Expoprt as CSV</CSVLink>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="card-body mt-3">
                                <table className="" width="100%" >
                                    {subAdminList.length === 0 ? <h6 className="ifnoData"><img src="assets/img/no-data.png" alt="" /> <br /> No Data Available</h6> :
                                        <ToolkitProvider
                                            hover
                                            bootstrap4
                                            keyField='id'
                                            columns={columns}
                                            data={subAdminList}
                                            exportCSV
                                            search={{
                                                afterSearch: (newResult) => console.log(newResult)
                                            }}
                                        >
                                            {
                                                props => (
                                                    <>
                                                        <SearchBar {...props.searchProps} />
                                                        <BootstrapTable
                                                            hover
                                                            bootstrap4
                                                            keyField='id'
                                                            columns={columns}
                                                            data={subAdminList}
                                                            pagination={pagination}
                                                            filter={filterFactory()}
                                                            {...props.baseProps}
                                                        />
                                                    </>
                                                )
                                            }
                                        </ToolkitProvider>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* sub admin edit Pair modal data */}
            <div className="modal" id="update_subadmin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog  modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">
                                Edit Details
                            </h5>
                            {/* <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <div className="row gx-3 mb-3">
                                <div className="col-md-4">
                                    <label className="small mb-1" for="inputFirstName">Full name <em>*</em>
                                        <input type="text" className="form-control  form-control-solid" id="inputFirstName" placeholder="Enter your full name" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                                    </label>

                                </div>
                                <div className="col-md-4">
                                    <label className="small mb-1" for="inputEmailAddress">Email
                                        <input className="form-control form-control-solid" id="inputEmailAddress" type="email" placeholder="Enter your email address" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                    </label>

                                </div>
                                <div className="col-md-4">
                                    <label className="small mb-1" for="inputBirthday">Gender <em>*</em>
                                        <select className="form-control form-control-solid" id="exampleFormControlSelect1" name="gender" value={gander} onChange={(e) => { setGander(e.target.value) }}>
                                            <option value="">Select</option>
                                            <option value="Masculin">Masculin</option>
                                            <option value="Feminine">Feminine</option>
                                            <option value="Neuter">Neuter</option>
                                        </select>
                                    </label>

                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-4">
                                    <label className="small mb-1" for="inputLocation">Mobile Number
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Number" name="number" value={number} onChange={(e) => { setNumber(e.target.value) }} />
                                    </label>

                                </div>
                                <div className="col-md-4">
                                    <label className="small mb-1" for="inputLocation">Password
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Password" name="password" value={passwords} onChange={(e) => { setPassword(e.target.value) }} />
                                    </label>

                                </div>
                                <div className="col-md-4">
                                    <label className="small mb-1" for="inputLocation">Registration Date
                                        <input className="form-control form-control-solid" id="inputLocation" type="date" pattern="\d{4}-\d{2}-\d{2}" placeholder="Enter your Date of Birth" name="dor" value={dor} onChange={(e) => { setDor(e.target.value) }} />
                                    </label>

                                </div>
                            </div>

                            <div className="row gx-3 mb-3">
                                <div className="col-md-4">
                                    <label className="small mb-1" for="inputLocation">Address
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Address" name="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                    </label>

                                </div>

                                <div className="col-md-4" >
                                    <label className="small mb-1" for="inputLocation">State
                                        {console.log("stateststateststate", state, district, gander)}
                                        <select name="state" id="txtrstate" className="form-control form-control-solid" value={state}
                                            onChange={handleStateChange}
                                        >
                                            <option value=""> --- Select State --- </option>
                                            {State?.getStatesOfCountry("IN")?.map((states, index) => {
                                                return state === states?.name ? <option value={state}>{state}</option> : <option value={JSON.stringify(states)}>{states.name}</option>
                                            })}
                                            {/* Add other state options */}
                                        </select>
                                    </label>

                                </div>

                                <div className="col-md-4" >
                                    <label className="small mb-1" for="inputLocation">District
                                    <select name="district" id="txtrstate" className="form-control form-control-solid" value={district}
                                        onChange={(e) => { setDistrict(e.target.value) }}
                                    >
                                        {console.log("stateIsoCode", stateIsoCode)}
                                        <option value="">---Select City---</option>
                                        {/* {stateIsoCode ?<option value="">---Select City---</option>: <option value={district}>{district}</option>} */}
                                        {City?.getCitiesOfState("IN", stateIsoCode)?.map((city, index) => {
                                            return <option value={city.name}>{city.name}</option>
                                        })}
                                        {/* Add other state options */}
                                    </select>
                                    </label>
                                   
                                </div>
                            </div>


                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1" for="inputLocation">Pincode</label>
                                    <input className="form-control form-control-solid" id="inputLocation" type="number" placeholder="Enter your Pincode" value={pincode} onChange={(event) => setPincode(event.target.value)} />
                                </div>
                                <div className="col-md-6" >
                                    <label className="small mb-1" for="inputLocation">Permissions</label>
                                    <Select isMulti options={role == "coaching" ? multiSelectForCoaching : multipleSelectForStaff}
                                        onChange={setMultipleSelectd}
                                        value={multipleSelectd}
                                    >
                                    </Select>
                                </div>
                            </div>
                            <button className="btn btn-indigo" type="button" onClick={handleUpdateSubadminList}> Submit Details </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* sub admin edit modal data */}
            <Toaster />
        </>

    )
}
Coaching.propTypes = {
    searchProps: PropTypes.object,
    baseProps: PropTypes.object,
};
export default Coaching;