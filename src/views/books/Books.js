import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';

// import {
//   alertErrorMessage,
//   alertSuccessMessage,
// } from "../../../customComponent/CustomAlertMessage";
// import AuthService from "../../../api/services/AuthService";
import { CSVLink } from "react-csv";
// import { $ } from "react-jquery-plugin";
import BootstrapTable from "react-bootstrap-table-next";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
// import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory from "react-bootstrap-table2-filter";
// import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import  { Toaster } from 'react-hot-toast';
import Switch from "react-switch";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
// import { useDispatch, useSelector } from 'react-redux';
// import { Addcategory,GetCategory } from "../../../actions/book.action";
import { BookDelete, BookStatusChange, getBookList } from "../../services/book.service";
import { HotToaster } from "../../utils/Toaster"
// import hasEmptyValue from "../../../validations/Category";
// import { imageUrl } from "../../services/dataurl";
// import AddBookDetails from "../../models/AddBookDetails";
import UpdateBookDetails from "../../models/updateBookDetails";
import {BookView} from "../../models/BookView";
import { ResultFunction } from "../../comman/resultFunction";
// import { logoutContext } from "../../context/logout";
import {ProfileContext} from "../../components/contextProvider/index"


const Books = () => {
  // const [categoryName, setCategoryName] = useState("");
  const [bookIdForUpdate, setBookForUpdate] = useState({});
  const [bookList,setBookList] = useState([])
  const { SearchBar } = Search;
  // const { isLogout, setIsLogout } = useContext(logoutContext)
  const [profileState] = useContext(ProfileContext);
  const [modalShow, setModalShow] = useState(false);
  const [modalUpdateShow, setUpdateModalShow] = useState(false);
  // const [addModalShow, setAddModalShow] = useState(false);
  const CategoryList = async() => {
    const result = await getBookList()

    if(result.status && result.data.length>0){
        setBookList(result.data)
    }
    if(!result?.status && result.message === "Unauthorized"){
      // setIsLogout(true)
    }
  }
  const resultfunction = (result) => {
    if(result.status){
      HotToaster(result.status,result.message)
      CategoryList()
      // setCategoryName("")
    }
    else{
      HotToaster(result.status,result.message)
      // setCategoryName("")
    }
  }
  useEffect(()=>{
    console.log("ProfileContext",profileState?.role)
    console.log(ProfileContext);
    
    CategoryList()
  },[])
  

  const handleBookDetailsEdit = async(row) => {
    console.log("linkvfoellele",row)
    setBookForUpdate(row)
    // setCategoryName(row.categoryName)
    setUpdateModalShow(true)
  }
  const handleBookDetailsView = async(row) => {
    console.log("linkvfoellele",row)
    setBookForUpdate(row)
    // setCategoryName(row.categoryName)
    setModalShow(true)
  }

  const handleBookDetailsDelete = async(row) => {
    const data = {
        /* eslint-disable no-underscore-dangle */
      id:row._id
    }
    const result  = await BookDelete(data)
    resultfunction(result)

  }
//   const addModalDisplay=()=>{
//     setAddModalShow(true)
// }
  const actionFormattor = (cell, row) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          
          onClick={() => handleBookDetailsEdit(row)}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handleBookDetailsDelete(row)}
        >
          Delete
        </button>
        <button 
        type="button" 
        className="btn btn-primary" 
        data-bs-toggle="modal" 
        data-bs-target="#book_views"
        onClick={() => handleBookDetailsView(row)}>
  View
</button>
      </div>
    );
  };

  // function imageFormatter(cell,row) {
  //   console.log("firstdataf",cell,row)
  //   return (
  //     <>
  //       <img
  //         style={{ width: "50%",height:"50%" }}
  //         src={imageUrl+row.bookIcon}
  //         alt="icon"
  //       />
  //     </>
  //   );
  // }
  function categoryNameFormatter(cell,row) {
    console.log("firstdataf",row)
    return (
      <>
        {row?.categoryData[0]?.categoryName}
      </>
    );
  }
  const handleChecked = async(e,row) => {
    const data = {
      id:row._id,
      isActive:e
    }
    const result = await BookStatusChange(data)
    ResultFunction(result,CategoryList)


  }
  const isActiveFormatter = (cell, row) => {

    return(
      <Switch onChange={(e)=>handleChecked(e,row)} id="isActive" checked={row?.isActive}/>
    )
  }

  const columns = [
    { dataField: "_id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "itemType", text: "Item Type"},
    { dataField: "categoryName", text: "Category Name", formatter: categoryNameFormatter },
    { dataField: "bookName", text: "Book Name", },
    { dataField: "bookCode", text: "Book Code", sort: true },
    { dataField: "author", text: "Author", sort: true },
    { dataField: "MRP", text: "MRP price", sort: true },
    { dataField: "sellingPrice", text: "Selling Price", sort: true },
    ...(profileState?.role === "admin"
    ? [{ dataField: "isActive", text: "isActive", formatter: isActiveFormatter }]
    : []),
    { dataField: "actions", text: "Action", formatter: actionFormattor },
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
  // const handleCategoryAdd = async() => {
  //   let validation = hasEmptyValue("category",categoryName)
   
  //   if(validation !== undefined ){
  //     HotToaster(false,validation)
  //     return false
  //   }
  //   let data = {
  //     categoryName:categoryName
  //   }
  //   let result = await CategoryAdd(data)
  //   console.log("resultresult",result)
  //   resultfunction(result)
  // }
  // const handleCategoryUpdate = async() => {
  //   let validation = hasEmptyValue("category",categoryName)
   
  //   if(validation !== undefined ){
  //     HotToaster(false,validation)
  //     return false
  //   }
  //   let data = {
  //     id:categoryIdForUpdate,
  //     categoryName:categoryName
  //   }

  //   let result = await CategoryUpdate(data)
  //   resultfunction(result)

  // }
 

  
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
                      Book Management
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
                    Book Details
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
                        <CSVLink className="dropdown-item" data={bookList}>
                          Expoprt as CSV
                        </CSVLink>
                      </div>
                    <button
                     type="button"
                     className="btn btn-sm btn-dark"
                     onClick={()=>{window.location.href="/books-management/add-books"}}
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
                            data={bookList}
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
                                  data={bookList}
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
      {/* <AddBookDetails show={addModalShow} onHide={() => setAddModalShow(false)} /> */}
      <UpdateBookDetails bookDetails={bookIdForUpdate} show={modalUpdateShow} onHide={() => setUpdateModalShow(false)} />
      <BookView bookDetails={bookIdForUpdate} show={modalShow} onHide={() => setModalShow(false)} />
      {/* Currency Pair modal data */}
      
    </>
  );
};
Books.propTypes = {
    searchProps: PropTypes.object,
    baseProps: PropTypes.object,
};
export default Books;
