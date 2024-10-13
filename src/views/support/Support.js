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
import  { Toaster } from 'react-hot-toast';
import getSupportService  from "../../services/support.service"


const Support = () => {
  const [supportList,setSupportList] = useState([])
  const { SearchBar } = Search;
  const getSupport = async() => {
    const result = await getSupportService()
    if(result.status && result.data.length>0){
        setSupportList(result.data)
    }

  }

  useEffect(()=>{
    getSupport()
  },[])





  




  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
     { dataField: "emailId", text: "Email Id", sort: true },
    //   { dataField: "email", text: "emailId", sort: true },
    { dataField: "mobileNumber", text: "Mobile Number",sort:true},
    { dataField: "message", text: "Message",sort:true},
    // { dataField: "posterIcon", text: "poster Image",formatter: imageFormatter },
    // { dataField: "isActive", text: "isActive", formatter: isActiveFormatter},
    // { dataField: "maker_fee", text: "Maker Fee", sort: true },
    // { dataField: "taker_fee", text: "Taker Fee", sort: true },
    // { dataField: "price", text: "Amount", sort: true },
    // { dataField: "Action", text: "Action", formatter: isActiveFormatter },
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
                      Support Management
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="container-xl px-4 mt-n10">
            <div className="row">
              {/* <div className="col-xl-4">
                <div className="card mb-4">
                  <div className="card-body d-flex justify-content-center flex-column p-4 ">
                    <div className="d-flex align-items-center justify-content-start mb-3 ">
                      <h5 className="mb-0">Add Poster</h5>
                    </div>
                    <div className="form-group mb-3">
                        <select 
                        className="form-control"
                        onChange={(e)=>{setCategoryId(e.target.value)}}
                        >
                            <option value="">Select</option>
                            {categoryList.length>0 &&
                            categoryList.map((category,i)=>{
                                return <option value={category._id}>{category.categoryName}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="file"
                        placeholder="poster image"
                        name="poster"
                        onChange={(e)=>{
                           setCategoryName(e.target.value)
                        }}
                      />
                    </div>
                    <div className="form-group ">
                      <button
                        className="btn btn-s btn-indigo w-100"
                        type="button"
                        onClick={() =>
                          handlePosterAdd(
                           categoryName
                          )
                        }
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    Support service
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
                        <CSVLink className="dropdown-item" data={supportList}>
                          Export as CSV
                        </CSVLink>
                      </div>
                      {/* <button
                     type="button"
                     className="btn btn-sm btn-dark"
                     data-bs-toggle="modal"
                     data-bs-target="#add_poster"
                    >Add</button> */}
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
                            data={supportList}
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
                                  data={supportList}
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
    </>
  );
};
Support.propTypes = {
    searchProps: PropTypes.object,
    baseProps: PropTypes.object,
};
export default Support;
