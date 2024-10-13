import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';  // Added prop-types
import { CSVLink } from "react-csv";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { Toaster } from 'react-hot-toast';
import Switch from "react-switch";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { CategoryListGet, PosterDelete, PosterStatusChange, getPosterList } from "../../services/book.service";
import { HotToaster } from "../../utils/Toaster";
import { ResultFunction } from "../../comman/resultFunction";
import AddPoster from "../../models/AddPoster";
import UpdatePoster from "../../models/UpdatePoster";
import { imageUrl } from "../../services/dataurl";

const Poster = () => {
  const [posterList, setPosterList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryIdForUpdate, setCategoryIdForUpdate] = useState({});
  const { SearchBar } = Search;
  const [modalShow, setModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);

  const CategoryList = async () => {
    const result = await CategoryListGet();
    if (result.status) {
      setCategoryList(result.data);
    }
  };
  
  const resultfunction = (result) => {
    HotToaster(result.status, result.message);
    CategoryList();
  };
  
  const posterLists = async () => {
    const result = await getPosterList();
    if (result.status) {
      setPosterList(result.data);
    }
  };

  useEffect(() => {
    posterLists();
    CategoryList();
  }, []);

  const handlePosterChange = (row) => {
    setCategoryIdForUpdate(row);
    setModalShow(true);
  };

  const handleCurrencyDelete = async (row) => {
       /* eslint-disable no-underscore-dangle */
    const data = { id: row._id };
    const result = await PosterDelete(data);
    resultfunction(result);
  };

  const linkFollow = (cell, row) => (
    <div>
      <button
        type="button"
        className="btn btn-sm btn-dark"
        
        onClick={() => handlePosterChange(row)}
      >
        Update
      </button>
      <button
        type="button"
        className="btn btn-sm btn-danger"
        onClick={() => handleCurrencyDelete(row)}
      >
        Delete
      </button>
    </div>
  );

  function imageFormatter(cell,row) {
    console.log("firstdataf",)
    return (
      <>
        <img
          style={{ width: "25%",height:"25%" }}
          src={imageUrl+row.posterIcon}
          alt="icon"
        />
      </>
    );
  }

  const categoryFollow = (cell, row) => (
    row?.categoryData[0]?.categoryName || "No Category"
  );

  const handleChecked = async (isActive, row) => {
    const data = { id: row._id, isActive };
    const result = await PosterStatusChange(data);
    ResultFunction(result, posterLists);
  };

  const addModalDisplay=()=>{
    setAddModalShow(true)
}
  const isActiveFormatter = (cell, row) => (
    <Switch onChange={(e) => handleChecked(e, row)} id="isActive" checked={row?.isActive} />
  );

  const columns = [
    { dataField: "id", text: "ID", formatter: (cell, row, rowIndex) => `${rowIndex + 1}` },
    { dataField: "categoryName", text: "Category Name", formatter: categoryFollow },
    { dataField: "posterIcon", text: "Poster Image", formatter: imageFormatter },
    { dataField: "isActive", text: "isActive", formatter: isActiveFormatter },
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
        <Toaster />
        <main>
          <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div className="container-xl px-4">
              <div className="page-header-content pt-4">
                <h1 className="page-header-title">
                  <i className="fa fa-prescription"></i>
                  Poster Management
                </h1>
              </div>
            </div>
          </header>
          <div className="container-xl px-4 mt-n10">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    Poster Details
                    <div className="dropdown">
                      <button type="button" className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" data-bs-toggle="dropdown">
                        Export
                      </button>
                      <div className="dropdown-menu animated--fade-in-up">
                        <CSVLink className="dropdown-item" data={posterList}>Export as CSV</CSVLink>
                      </div>
                      <button type="button" className="btn btn-sm btn-dark" onClick={addModalDisplay}>
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <ToolkitProvider
                      hover
                      bootstrap4
                      keyField="_id"
                      columns={columns}
                      data={posterList}
                      search
                    >
                      {(props) => (
                        <>
                          <SearchBar {...props.searchProps} />
                          <BootstrapTable
                            hover
                            bootstrap4
                            keyField="_id"
                            columns={columns}
                            data={posterList}
                            pagination={pagination}
                            filter={filterFactory()}
                            {...props.baseProps}
                          />
                        </>
                      )}
                    </ToolkitProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <AddPoster categoryList={categoryList} callingPosterApiAgainAfterAddNewOne={posterLists} show={addModalShow} onHide={() => setAddModalShow(false)} />
      <UpdatePoster categoryDetails={categoryIdForUpdate} callingPosterApiAgainAfterAddNewOne={posterLists} show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

Poster.propTypes = {
  searchProps: PropTypes.object,
  baseProps: PropTypes.object,
};

export default Poster;
