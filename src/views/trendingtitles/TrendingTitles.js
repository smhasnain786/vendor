import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
// import Switch from "react-switch";
import { Toaster } from 'react-hot-toast';
import { getTrandingTitleImagesData, titleImageDeleteById } from "../../services/book.service";
import { HotToaster } from "../../utils/Toaster"
import { imageUrl } from "../../services/dataurl";
// import { ResultFunction } from "../../comman/resultFunction";
import AddTrendingTitles from "../../models/AddTrendingTitles";
import UpdateTrendingTitles from "../../models/UpdateTrendingTitles";


const TrendingTitles = () => {
  const [dataForUpdate, setDataForUpdate] = useState({});
  const [titleList,setTitleList] = useState([])
  const { SearchBar } = Search;
  const [modalShow, setModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const getTitle = async() => {
    const result = await getTrandingTitleImagesData()
    if(result.status){
      setTitleList(result.data)
    }

  }
  useEffect(()=>{
    getTitle()
  },[])
  const handleTitleChange = async(row) => {
    setDataForUpdate(row)
    setModalShow(true)
  }
  const resultfunction = (result) => {
    if(result.status){
      HotToaster(result.status,result.message)
    }
    else{
      HotToaster(result.status,result.message)
    }
  }
  const handleDataDelete = async(row) => {
    const data = {
              // eslint-disable-next-line no-underscore-dangle
      id:row._id
    }
    const result  = await titleImageDeleteById(data)
    resultfunction(result)
    getTitle()

  }

  const linkFollow = (cell, row) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
        
          onClick={() => handleTitleChange(row)}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handleDataDelete(row)}
        >
          Delete
        </button>
      </div>
    );
  };

  function imageFormatter(cell,row) {
    console.log("firstdataf",)
    return (
      <>
        <img
          style={{ width: "50%",height:"50%" }}
          src={imageUrl+row.icon}
          alt="icon"
        />
      </>
    );
  }

  // const handleChecked = async(e,row) => {
  //   const data = {
  //             // eslint-disable-next-line no-underscore-dangle
  //     id:row._id,
  //     isActive:e
  //   }
  //   const result = await PosterStatusChange(data)
  //   ResultFunction(result,getTitle)
  // }
  // const isActiveFormatter = (cell, row) => {
  //   return(
  //     <Switch onChange={(e)=>handleChecked(e,row)} id="isActive" checked={row?.isActive}/>
  //   )
  // }


  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "title", text: "Title"},
    { dataField: "titleIcon", text: "Title Image",formatter: imageFormatter },
    // { dataField: "isActive", text: "isActive", formatter: isActiveFormatter},
    // { dataField: "maker_fee", text: "Maker Fee", sort: true },
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

  const addModalDisplay=()=>{
    setAddModalShow(true)
  }

  
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
                      Title Management
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
                    Title Details
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
                        <CSVLink className="dropdown-item" data={titleList}>
                          Expoprt as CSV
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
                            data={titleList}
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
                                  data={titleList}
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
      <AddTrendingTitles apiRecall = {getTitle} show={addModalShow} onHide={() => setAddModalShow(false)} />
      <UpdateTrendingTitles data={dataForUpdate} apiRecall = {getTitle} show={modalShow} onHide={() => setModalShow(false)}/>
      {/* Currency Pair modal data */}
    </>
  );
};
TrendingTitles.propTypes = {
  searchProps: PropTypes.object,
  baseProps: PropTypes.object,
};
export default TrendingTitles;
