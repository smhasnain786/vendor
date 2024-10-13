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
import  { Toaster } from 'react-hot-toast';
import moment from 'moment';
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { ResultFunction } from "../../comman/resultFunction";
import { deleteDesign, getDesign } from "../../services/design.service";
import {AddDesign} from "../../models/AddDesign";
import {UpdateDesign} from "../../models/UpdateDesign";

const Design = () => {
  const [designForUpdate, setDesignForUpdate] = useState([]);
  const [designList,setDesignList] = useState([])
  const { SearchBar } = Search;
  const [modalShow, setModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const getDesignList = async() => {
    const result = await getDesign()
    if(result.status && result.data.length>0){
        setDesignList(result.data)
    }
  }
  useEffect(()=>{
    getDesignList()
  },[])
 

  const handleDesignEdit = async(row) => {
    setDesignForUpdate(row)
    setModalShow(true)
  }
  const addModalDisplay=()=>{
    setAddModalShow(true)
  }
  const handleDesignDelete = async(row) => {
    const data = {
        // eslint-disable-next-line no-underscore-dangle
      id:row._id
    }
    const result  = await deleteDesign(data)
    ResultFunction(result,getDesignList,setDesignList)

  }

  const linkFollow = (cell, row) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#edit_design"
          onClick={() => handleDesignEdit(row)}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handleDesignDelete(row)}
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
    { dataField: "designType", text: "Design Type", },
    { dataField: "icon", text: "Icon", },
    { dataField: "file", text: "File", },
    { dataField: "createdAt", text: "Date", formatter:dateFormatter},
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
                      Design Management
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
                    Design 
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
                        <CSVLink className="dropdown-item" data={designList}>
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
                            data={designList}
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
                                  data={designList}
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
      <AddDesign designList={getDesignList} show={addModalShow} onHide={() => setAddModalShow(false)} />
      <UpdateDesign design={designForUpdate} designList={getDesignList} show={modalShow} onHide={() => setModalShow(false)} />     
      {/* Currency Pair modal data */}
    </>
  );
};
Design.propTypes = {
    searchProps: PropTypes.object,
    baseProps: PropTypes.object,
};
export default Design;
