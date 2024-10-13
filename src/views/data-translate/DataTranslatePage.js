import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import { Toaster } from 'react-hot-toast';
import  getAllDataTranslateQuery  from "../../services/dataTranslate.service"
import { imageUrl } from "../../services/dataurl"

const DataTranslatePage = () => {
  const [dataTranslate,setDataTranslate] = useState([])
  const { SearchBar } = Search;
  
  

    const TypingList = async() => {
    const result = await getAllDataTranslateQuery()
    if(result.status && result.data.length>0){
        setDataTranslate(result.data)
    }
  }
  useEffect(()=>{
    TypingList()
  },[])

 const fileFormmater = (cell, row) => {
        return  <a href={imageUrl+row.file} target="_blank" className="btn btn-primary" rel="noreferrer">File</a> 
 }
  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "name", text: "Name", },
    { dataField: "email", text: "Email", },
    { dataField: "subject", text: "Subject", },
    { dataField: "message", text: "Message", },
    { dataField: "file", text: "File",formatter:fileFormmater },
    // { dataField: "createdAt", text: "Date", formatter:dateFormatter},
    // { dataField: "Action", text: "Action", formatter: linkFollow },
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
                      Data Translate Management
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
                    Data Translate  
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
                        <CSVLink className="dropdown-item" data={dataTranslate}>
                          Export as CSV
                        </CSVLink>
                      </div>
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
                            data={dataTranslate}
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
                                  data={dataTranslate}
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
DataTranslatePage.propTypes = {
    searchProps: PropTypes.object,
    baseProps: PropTypes.object,
};
export default DataTranslatePage;
