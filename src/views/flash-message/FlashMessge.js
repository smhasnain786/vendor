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
import { getFlash, removeFlash } from "../../services/flashMessage.service";
import UpdateFlashMessage from "../../models/UpdateFlashMessage";
import { ResultFunction } from "../../comman/resultFunction";
import AddFlashMessage from "../../models/AddFlashMessage";


const FlashMessge = () => {
    const [flashDataForUpdate, setFlashDataForUpdate] = useState([]);
    const [messageList, setMessageList] = useState([])
    const { SearchBar } = Search;
    const [modalShow, setModalShow] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const getFlashMessage = async () => {
        const result = await getFlash()
        if (result.status && result.data.length > 0) {
            setMessageList(result.data)
        }
    }
    useEffect(() => {
        getFlashMessage()
    }, [])


    const handleCategoryEdit = async (row) => {
        console.log("linkvfoellele", row)
        setFlashDataForUpdate(row)
        setModalShow(true)
    }

    const handleCurrencyDelete = async (row) => {
        const data = {
            // eslint-disable-next-line no-underscore-dangle
            _id: row._id
        }
        const result = await removeFlash(data)
        ResultFunction(result, getFlashMessage)

    }

    const linkFollow = (cell, row) => {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-sm btn-dark"
                   
                    onClick={() => handleCategoryEdit(row)}
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

    const columns = [
        { dataField: "id", text: "id", formatter: (cell, row, rowIndex) => `${rowIndex + 1}` },
        { dataField: "message", text: "Flash Message", },
        // { dataField: "isActive", text: "isActive", formatter: isActiveFormatter},
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
                                            Flash Message Management
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
                                        Flash Message Details
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
                                                <CSVLink className="dropdown-item" data={messageList}>
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
                                                        data={messageList}
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
                                                                    data={messageList}
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
            <UpdateFlashMessage data={flashDataForUpdate} get={getFlashMessage} show={modalShow} onHide={() => setModalShow(false)} />
            <AddFlashMessage get={getFlashMessage} show={addModalShow} onHide={() => setAddModalShow(false)} />

            {/* Currency Pair modal data */}
        </>
    );
};
FlashMessge.propTypes = {
    searchProps: PropTypes.object,
    baseProps: PropTypes.object,
};
export default FlashMessge;
