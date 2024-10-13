import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { Toaster } from 'react-hot-toast';
import Switch from "react-switch";
import { GetAllReviews, changeReviewStatus } from "../../services/book.service";
import { ResultFunction } from "../../comman/resultFunction";

const Review = () => {
  const [reviewList, setReviewList] = useState([]);
  const { SearchBar } = Search;

  const GetReviews = async () => {
    const result = await GetAllReviews();
    if (result.status && result.data.length > 0) {
      setReviewList(result.data);
    }
  };

  useEffect(() => {
    GetReviews();
  }, []);

  const handleChecked = async (e, row) => {
            // eslint-disable-next-line no-underscore-dangle
    const data = { id: row._id, isActive: e };
    const result = await changeReviewStatus(data);
    ResultFunction(result, GetReviews);
  };

  const isActiveFormatter = (cell, row) => {
    return <Switch onChange={(e) => handleChecked(e, row)} id="isActive" checked={row?.isActive} />;
  };

  const booksFollow = (cell, row) => {
    return <>{row?.bookdata[0]?.bookName}</>;
  };

  const columns = [
    { dataField: "id", text: "id", formatter: (cell, row, rowIndex) => `${rowIndex + 1}` },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "email", text: "emailId", sort: true },
    { dataField: "bookName", text: "Book Name", formatter: booksFollow },
    { dataField: "discription", text: "Review", sort: true },
    { dataField: "Action", text: "Action", formatter: isActiveFormatter },
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
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mt-4">
                    <h1 className="page-header-title">
                      <div className="page-header-icon">
                        <i className="fa fa-prescription"></i>
                      </div>
                      Review Management
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
                    Poster Details
                    <div className="dropdown">
                      <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Export
                      </button>
                      <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                        <CSVLink className="dropdown-item" data={reviewList}>Export as CSV</CSVLink>
                      </div>
                      <button type="button" className="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#add_poster">Add</button>
                    </div>
                  </div>
                  <div className="card-body">
                    <ToolkitProvider
                      hover
                      bootstrap4
                      keyField="_id"
                      columns={columns}
                      data={reviewList}
                      search={{
                        afterSearch: (newResult) => console.log(newResult),
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
                            data={reviewList}
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
    </>
  );
};
Review.propTypes = {
  searchProps: PropTypes.object,
  baseProps: PropTypes.object,
};
export default Review;
