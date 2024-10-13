import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import  { Toaster } from 'react-hot-toast';
import moment from 'moment';
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { BookFilesDelete, getBookFiles, getBookList } from "../../services/book.service";
import { ResultFunction } from "../../comman/resultFunction";

import {AddBookFiles} from "../../models/AddbookFiles";
import {UpdateBookFiles} from "../../models/UpdateBookFIles";

const BookFiles = () => {
  const [bookFilesUpdate, setBookFilesUpdate] = useState([]);
  const [bookFiles,setBookFiles] = useState([])
  const [bookList, setBookList] = useState([])
  const { SearchBar } = Search;
  const [modalShow, setModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const BooksList = async() => {
    const result = await getBookList()
    if(result.status && result.data.length>0){
        setBookList(result.data)
    }
  }
   const BookFilesList = async() => {
    const result = await getBookFiles()
    if(result.status && result.data.length>0){
        setBookFiles(result.data)
    }
  }
  useEffect(()=>{
    BookFilesList()
    BooksList()
  },[])
 

  const handleBookFilesEdit = async(row) => {
    setBookFilesUpdate(row)
    setModalShow(true)
  }

  const handleCurrencyDelete = async(row) => {
    const data = {
    // eslint-disable-next-line no-underscore-dangle
      id:row._id
    }
    const result  = await BookFilesDelete(data)
    ResultFunction(result,BookFilesList,setBookFiles)

  }

  const linkFollow = (cell, row) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          
          onClick={() => handleBookFilesEdit(row)}
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

  const bookFollow = (cell, row) => {
    console.log("fsfdfdsfsdsfsd",row);
    return <>{row.booksData.length>0 && row.booksData[0].bookName}
    </>

 }
 const dateFormatter = (cell, row) => {
  console.log("sdbfjhdfgjfgsd",row)

  // let date = moment(row.createdAt).format("DD-MM-YYYY");
        return  moment(row.createdAt).format("DD-MM-YYYY");
        
 }
 const addModalDisplay=()=>{
  setAddModalShow(true)
}
  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "bookName", text: "Book Name",formatter: bookFollow },
    { dataField: "chapter", text: "Chapter", },
    { dataField: "fileType", text: "File Type", },
    { dataField: "file", text: "File", },
    { dataField: "createdAt", text: "Date", formatter:dateFormatter},
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
                      Book Files Management
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
                    Book Files 
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
                        <CSVLink className="dropdown-item" data={bookFiles}>
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
                            data={bookFiles}
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
                                  data={bookFiles}
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
      <AddBookFiles bookFiles={BookFilesList} bookList={bookList} show={addModalShow} onHide={() => setAddModalShow(false)} />
      <UpdateBookFiles data={bookFilesUpdate} bookFiles={BookFilesList} show={modalShow} onHide={() => setModalShow(false)} />
     
      {/* Currency Pair modal data */}
    </>
  );
};
BookFiles.propTypes = {
    searchProps: PropTypes.object,
    baseProps: PropTypes.object,
};
export default BookFiles;
