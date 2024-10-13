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
import { getPermotionPopupData, removePermotionPopupData } from "../../services/permotionpopup.service";
import UpdatePermotionPopup from "../../models/UpdatePermotionPopup";
import { ResultFunction } from "../../comman/resultFunction";
import AddPermotionPopup from "../../models/AddPermotionPopup";
import { imageUrl } from "../../services/dataurl";

const PermotionPopup = () => {
    const [dataForUpdate, setDataForUpdate] = useState([]);
    const [List, setList] = useState([])
    const { SearchBar } = Search;
    const [modalShow, setModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
    const getData = async () => {
        const result = await getPermotionPopupData()
        if (result.status && result.data.length > 0) {
            setList(result.data)
        }
    }
    useEffect(() => {
        getData()
    }, [])


    const handleCategoryEdit = async (row) => {
        console.log("linkvfoellele", row)
        setDataForUpdate(row)
        setModalShow(true)
    }

    const handleCurrencyDelete = async (row) => {
        const data = {
            // eslint-disable-next-line no-underscore-dangle
            _id: row._id
        }
        const result = await removePermotionPopupData(data)
        ResultFunction(result, getData)

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

    function imageFormatter(cell, row) {
        console.log("firstdataf",)
        return (
            <>
                <img
                    style={{ width: "50%", height: "50%" }}
                    src={imageUrl + row.modalIcon}
                    alt="icon"
                />
            </>
        );
    }

    const columns = [
        { dataField: "id", text: "id", formatter: (cell, row, rowIndex) => `${rowIndex + 1}` },
        { dataField: "link", text: "URL", },
        { dataField: "modalIcon", text: "Icon", formatter: imageFormatter },
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
                                            Permotion Popup Management
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
                                        Permotion Popup Details
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
                                                <CSVLink className="dropdown-item" data={List}>
                                                    Export as CSV
                                                </CSVLink>
                                            </div>
                                            {List.length === 0 && <button
                                                type="button"
                                                className="btn btn-sm btn-dark"
                                                onClick={addModalDisplay}
                                            >Add</button>}
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
                                                        data={List}
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
                                                                    data={List}
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
            <UpdatePermotionPopup data={dataForUpdate} get={getData} show={modalShow} onHide={() => setModalShow(false)} />
            <AddPermotionPopup get={getData} show={addModalShow} onHide={() => setAddModalShow(false)} />

            {/* Currency Pair modal data */}
        </>
    );
};
PermotionPopup.propTypes = {
    searchProps: PropTypes.object,
    baseProps: PropTypes.object,
};
export default PermotionPopup;
