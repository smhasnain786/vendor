import React, { useState, useEffect, useContext } from "react";
import { CSVLink } from "react-csv";
import PropTypes from 'prop-types';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { Toaster } from "react-hot-toast";
import Switch from "react-switch";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import { getOrders } from "../../services/orders.service";
import { ProfileContext } from "../../components/contextProvider/index";

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const { SearchBar } = Search;
  const [profileState] = useContext(ProfileContext);
  console.log(profileState);
  

  // Fetch orders data
  const fetchOrders = async () => {
    const result = await getOrders();
    if (result.status && result.data.length > 0) {
      setOrderList(result.data);
    }
    if (!result?.status && result.message === "Unauthorized") {
      // Handle unauthorized case
    }
  };

  // Update order status
  const handleStatusChange = async (checked) => {
    const newStatus = checked ? "completed" : "pending";
    console.log(newStatus);
    
    // const data = {
    //   id: row._id,
    //   status: newStatus,
    // };
    // const result = await updateOrderStatus(data);
    // if (result.status) {
    //   fetchOrders(); // Refresh orders list after status update
    // }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusFormatter = (cell, row) => {
    const isChecked = row.status === "completed";
    return (
      <Switch
        onChange={(checked) => handleStatusChange(checked, row)}
        checked={isChecked}
      />
    );
  };

  const columns = [
    { dataField: "_id", text: "Order ID", formatter: (cell, row, rowIndex) => `${rowIndex + 1}` },
    { dataField: "userId", text: "User ID" },
    { dataField: "vendorId", text: "Vendor ID" },
    { dataField: "totalAmount", text: "Total Amount", sort: true },
    { dataField: "status", text: "Status", formatter: statusFormatter },
    { dataField: "createdAt", text: "Created At", sort: true }
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
                      Order Management
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
                    Order Details
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
                      <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                        <CSVLink className="dropdown-item" data={orderList}>
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
                            data={orderList}
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
                                  data={orderList}
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
Orders.propTypes = {
    searchProps: PropTypes.object,
    baseProps: PropTypes.object,
};
export default Orders;
