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
import  { Toaster } from 'react-hot-toast';
import { ResultFunction } from "../../comman/resultFunction";
import UpdateSocialMedia from "../../models/UpdateSocialMedia";
import AddSocialMedia from "../../models/AddSocialMedia";
import { deleteSocialMediaurlById, getSocialMediaurl } from "../../services/socialmedia.service";


const SocialMedia = () => {
  const [socialMediaInfo,setSocialMediaInfo] = useState([])
  const [socialMediaEdit,setSocialMediaEdit] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const { SearchBar } = Search;
  const socialMediaInformation = async() => {
    const result = await getSocialMediaurl()
    if(result.status){
        setSocialMediaInfo(result.data)
    }
  }
  useEffect(()=>{
    // NewsLists()
    socialMediaInformation()
  },[])


  const handleSocialMediaEdit = async(row) => {
    console.log("linkvfoellele",row)
    setSocialMediaEdit(row)
    setModalShow(true)
    // setNewsDataForUpdate(row)
  }

  const handleSocialMediaDelete = async(row) => {
    const data = {
                // eslint-disable-next-line no-underscore-dangle
      id:row._id
    }
    const result  = await deleteSocialMediaurlById(data)
    ResultFunction(result,socialMediaInformation)

  }

  const linkFollow = (cell, row) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          
          onClick={() => handleSocialMediaEdit(row)}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handleSocialMediaDelete(row)}
        >
          Delete
        </button>
      </div>
    );
  };

//   function linkFollowMobile(cell,row){
//     console.log("linkFollowMobile===>>>",row)
//     return(
//         <>
//         {row?.mobileNumber.map((mobile,i)=>{
//           return mobile+","
//         })}
//         </>
//     )

//   }


  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "facebook", text: "Facebook",sort: true },
    { dataField: "instagram", text: "Instagram", sort: true},
    { dataField: "whatsapp", text: "Whatsapp", sort: true},
    { dataField: "linkedin", text: "Linkedin", sort: true },
    { dataField: "youtube", text: "Youtube", sort: true },
    { dataField: "telegram", text: "Telegram", sort: true },
    { dataField: "twitter", text: "Twitter", sort: true },
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
                      Admin Information Management
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
                  Admin Information Details
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
                        <CSVLink className="dropdown-item" data={socialMediaInfo}>
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
                            data={socialMediaInfo}
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
                                  data={socialMediaInfo}
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
      <AddSocialMedia getData={socialMediaInformation} show={addModalShow} onHide={() => setAddModalShow(false)}/>
       <UpdateSocialMedia socialmedia={socialMediaEdit} getData={socialMediaInformation} show={modalShow} onHide={() => setModalShow(false)} />
        {/* <AddNews allNews={NewsLists}/>
        <UpdateNews news = {NewsDataForUpdate} allNews={NewsLists}/> */}
    </>
  );
};
SocialMedia.propTypes = {
    searchProps: PropTypes.object,
    baseProps: PropTypes.object,
};
export default SocialMedia;
