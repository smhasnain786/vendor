import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
// import {
//   alertErrorMessage,
//   alertSuccessMessage,
// } from "../../../customComponent/CustomAlertMessage";
// import AuthService from "../../../api/services/AuthService";
import { CSVLink } from "react-csv";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { Toaster } from 'react-hot-toast';
import AddAdminInfo from "../../models/AddAdminInfo";
import { getAdminInformation } from "../../services/admin.service";
import UpdateAdminInfo from "../../models/UpdateAdminInfo";


const AdminInfo = () => {
  const [adminInfo,setAdminInfo] = useState([])
  const [adminInfoEdit,setAdminInfoEdit] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const { SearchBar } = Search;
  const adminInformation = async() => {
    const result = await getAdminInformation()
    if(result.status){
      setAdminInfo(result.data)
    }
  }
  useEffect(()=>{
    // NewsLists()
    adminInformation()
  },[])
 

  const handleAdminInfoEdit = async(row) => {
    console.log("linkvfoellele",row)
    setAdminInfoEdit(row)
    setModalShow(true)
    // setNewsDataForUpdate(row)
  }


  const linkFollow = (cell, row) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          onClick={() => handleAdminInfoEdit(row)}
        >
          Update
        </button>
        {/* <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handleAdminInfoDelete(row)}
        >
          Delete
        </button> */}
      </div>
    );
  };

  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "emailId", text: "Email Address", },
    { dataField: "mobileNumber", text: "Mobile Number", sort: true },
    { dataField: "whatsAppNumber", text: "Whats App Number", sort: true },
    { dataField: "address", text: "Address", sort: true },
    // { dataField: "price", text: "Amount", sort: true },
    { dataField: "Action", text: "Action", formatter: linkFollow },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });
  
  

  
  return (
    <>
      <div id="layoutSidenav_content">
        <Toaster/>
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
                      Admin Information Management
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
                  <div className="card-header">
                  Admin Information Details
                    <div className="dropdown">
                      <button
                        className="btn btn-dark btn-sm dropdown-toggle"
                        id="dropdownFadeInUp"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Export
                      </button>
                      <div
                        className="dropdown-menu animated--fade-in-up"
                        aria-labelledby="dropdownFadeInUp"
                      >
                        {/* <a className="dropdown-item" href="#!">Expoprt as CSV</a> */}
                        <CSVLink className="dropdown-item" data={adminInfo}>
                          Export as CSV
                        </CSVLink>
                      </div>
                    {adminInfo?.length === 0 && <button
                    type="button"
                    className="btn btn-sm btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#add_admininfo"
                  >Add</button>}
                    </div>
                  </div>
                  <div className="card-body">
                    <form className="row">
                      <div className="col-12">
                        <div className="table-responsive">
                          <ToolkitProvider
                            hover
                            bootstrap4
                            keyField="_id"
                            columns={columns}
                            data={adminInfo}
                            search={{
                              afterSearch: (newResult) =>
                                console.log(newResult),
                            }}
                          >
                            {(props) => (
                              <>
                                <SearchBar {...props.searchProps} />
                                <BootstrapTable
                                  hover
                                  bootstrap4
                                  keyField="_id"
                                  columns={columns}
                                  data={adminInfo}
                                  pagination={pagination}
                                  filter={filterFactory()}
                                  {...props.baseProps}
                                />
                              </>
                            )}
                          </ToolkitProvider>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
        <AddAdminInfo getData = {adminInformation} show={addModalShow} onHide={() => setAddModalShow(false)}/>
        <UpdateAdminInfo admindata={adminInfoEdit} getData = {adminInformation} show={modalShow} onHide={() => setModalShow(false)}  />
        {/* <AddNews allNews={NewsLists}/>
        <UpdateNews news = {NewsDataForUpdate} allNews={NewsLists}/> */}
    </>
  );
};
AdminInfo.propTypes = {
    searchProps: PropTypes.object,
    baseProps: PropTypes.object,
};
export default AdminInfo;
