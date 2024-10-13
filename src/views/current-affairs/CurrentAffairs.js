import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";
import BootstrapTable from "react-bootstrap-table-next";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
// import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory from "react-bootstrap-table2-filter";
// import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import  { Toaster } from 'react-hot-toast';
import moment from 'moment';
import { ResultFunction } from "../../comman/resultFunction";
import {UpdateCurrentAffairs} from "../../models/updateCurrentAffairs";
import { currentAffairsFileDelete, currentAffairsFileGet } from "../../services/currentAffairs.service";
import {AddCurrentAffairs} from "../../models/AddCurrentAffairs";

const CurrentAffairs = () => {
  const [currentAffiarsUpdate, setcurrentAffiarsUpdate] = useState([]);
  const [currentAffairs,setcurrentAffairs] = useState([])
  const { SearchBar } = Search;
  const [modalShow, setModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const CurrentAffairsList = async() => {
    const result = await currentAffairsFileGet()
    console.log("resultresult",result)
    if(result.status && result.data.length>0){
      setcurrentAffairs(result.data)
    }
  }
  useEffect(()=>{
    CurrentAffairsList()
  },[])

  const handleCurrentAffairsEdit = async(row) => {
    setcurrentAffiarsUpdate(row)
    setModalShow(true)
  }
  const addModalDisplay=()=>{
    setAddModalShow(true)
  }
  const handleCurrencyDelete = async(row) => {
    const data = {
       // eslint-disable-next-line no-underscore-dangle
      id:row._id
    }
    const result  = await currentAffairsFileDelete(data)
    ResultFunction(result,CurrentAffairsList,setcurrentAffairs)

  }

  const linkFollow = (cell, row) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          
          onClick={() => handleCurrentAffairsEdit(row)}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handleCurrencyDelete(row)}
        >
          Delete
        </button>
      </div>
    );
  };
  const dateFormatter = (cell, row) => {
    return  moment(row.createdAt).format("DD-MM-YYYY");   
}

  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "type", text: "Type", },
    { dataField: "fileType", text: "File Type", },
    { dataField: "plan", text: "Plan", },
    { dataField: "range", text: "Range", },
    { dataField: "file", text: "File", },
    { dataField: "createdAt", text: "Date", formatter:dateFormatter},
    // { dataField: "pptPdf", text: "Ppt Pdf File", },
    // { dataField: "editableFile", text: "Editable File", },
    // { dataField: "taker_fee", text: "Taker Fee", sort: true },
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
                      Current Affairs Management
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
                    Current Affairs 
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
                        <CSVLink className="dropdown-item" data={currentAffairs}>
                          Export as CSV
                        </CSVLink>
                      </div>
                      <button
                     type="button"
                     className="btn btn-sm btn-dark"
                     onClick={addModalDisplay}
                    >Add</button>
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
                            data={currentAffairs}
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
                                  data={currentAffairs}
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

      {/* Currency Pair modal data */}
      <UpdateCurrentAffairs data={currentAffiarsUpdate} currentAffairs={CurrentAffairsList} show={modalShow} onHide={() => setModalShow(false)}  />
      <AddCurrentAffairs currentAffairs={CurrentAffairsList} show={addModalShow} onHide={() => setAddModalShow(false)}  />
     
      {/* Currency Pair modal data */}
    </>
  );
};
CurrentAffairs.propTypes = {
  searchProps: PropTypes.object,
  baseProps: PropTypes.object,
};
export default CurrentAffairs;
