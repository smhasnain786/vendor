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
import { CategoryListGet, deletePromotionAndOfferDetails, getPromotionAndOfferDetails } from "../../services/book.service";
import { imageUrl } from "../../services/dataurl";
import { ResultFunction } from "../../comman/resultFunction";
import AddPromotionOffer from "../../models/AddPromotionOffer";
import UpdatePromotionOffer from "../../models/UpdatePromotionOffer";


const PromotionAndOffer = () => {
  const [promotionDataForUpdate, setPromotionDataForUpdate] = useState({});
  const [promotionAndOffer,setPromotionAndOffer] = useState([])
  const [categoryList,setCategoryList] = useState([])
  const { SearchBar } = Search;
  const [modalShow, setModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const CategoryList = async() => {
    const result = await CategoryListGet()
    if(result.status){
      setCategoryList(result.data)
    }

  }
  const PromotionAndOfferList = async() => {
    const result = await getPromotionAndOfferDetails()
    if(result.status){
      setPromotionAndOffer(result.data)
    }

  }
  useEffect(()=>{
    PromotionAndOfferList()
    CategoryList()
  },[])
  

  const handlesetPromotionAndOfferChange = async(row) => {
    setPromotionDataForUpdate(row)
    setModalShow(true)
    // setCategoryName(row.categoryName)
  }

  const handlesetPromotionAndOfferDelete = async(row) => {
    const data = {
        // eslint-disable-next-line no-underscore-dangle
      id:row._id
    }
    const result  = await deletePromotionAndOfferDetails(data)
    ResultFunction(result,PromotionAndOfferList)

  }
  const addModalDisplay=()=>{
    setAddModalShow(true)
  }
  const linkFollow = (cell, row) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#edit_promotion"
          onClick={() => handlesetPromotionAndOfferChange(row)}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handlesetPromotionAndOfferDelete(row)}
        >
          Delete
        </button>
      </div>
    );
  };

  function imageFormatter(cell,row) {
    console.log("firstdataf",row)
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
  function categoryFollow(cell,row){
    return(
        <>
        {row?.categoryData[0]?.categoryName}
        </>
    )

  }

//   const handleChecked = async(e,row) => {
//     const data = {
//         // eslint-disable-next-line no-underscore-dangle
//       id:row._id,
//       isActive:e
//     }
//     const result = await PosterStatusChange(data)
//     ResultFunction(result,PromotionAndOfferList)


//   }
//   const isActiveFormatter = (cell, row) => {

//     return(
//       <Switch onChange={(e)=>handleChecked(e,row)} id="isActive" checked={row?.isActive}/>
//     )
//   }


  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "categoryName", text: "Category Name",formatter: categoryFollow },
    { dataField: "icon", text: "Promotion Image",formatter: imageFormatter },
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
                      Promotion And Offer Management
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
                      Promotion And Offer Details
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
                        <CSVLink className="dropdown-item" data={promotionAndOffer}>
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
                            data={promotionAndOffer}
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
                                  data={promotionAndOffer}
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
      <AddPromotionOffer categoryList={categoryList} getData={PromotionAndOfferList} length={promotionAndOffer.length} show={addModalShow} onHide={() => setAddModalShow(false)} />
      <UpdatePromotionOffer promotionData = {promotionDataForUpdate} getData={PromotionAndOfferList} length={promotionAndOffer.length} show={modalShow} onHide={() => setModalShow(false)} />
      {/* Currency Pair modal data */}
    </>
  );
};
PromotionAndOffer.propTypes = {
    searchProps: PropTypes.object,
    baseProps: PropTypes.object,
};
export default PromotionAndOffer;
