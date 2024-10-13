import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';

import { Row, Col } from 'reactstrap';
import { CSVLink } from "react-csv";
import BootstrapTable from 'react-bootstrap-table-next'; // Default import
// import './ReactBootstrapTable.scss';
import Switch from "react-switch";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
// import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory from "react-bootstrap-table2-filter";
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { CategoryDelete, CategoryListGet, CategoryStatusChange } from "../../services/book.service";
import UpdateCategory from "../../models/UpdateCategory";
import { ResultFunction } from "../../comman/resultFunction";
import { AddCategory } from "../../models/AddCategory";
import ComponentCard from '../../components/ComponentCard';




const Category = () => {
    const [categoryDataForUpdate, setCategoryDataForUpdate] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    // const { SearchBar } = Search;
    // const [categoryName, setCategoryName] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);

    const CategoryList = async () => {
        const result = await CategoryListGet();
        if (result.status && result.data.length > 0) {
            setCategoryList(result.data);
            console.log("categorylist-->", result.data);

        }
    };

    useEffect(() => {
        CategoryList();
    }, []);



    const handleCategoryEdit = (row) => {
        setCategoryDataForUpdate(row)
        console.log("<-------->",row);
        
        // setCategoryName(row.categoryName)
        setModalShow(true)
        // setAddModalShow(true)
    };
    const addModalDisplay=()=>{
        setAddModalShow(true)
    }

    const handleCurrencyDelete = async (row) => {
        const data = { id: row.id };
        const result = await CategoryDelete(data);
        if (result) {
            ResultFunction(result, CategoryList);
            
        }
    };
    function afterSearch(searchText, result) {
        console.log(`Your search text is ${searchText}`);
        console.log('Result is:');
        for (let i = 0; i < result.length; i++) {
          console.log(`Fruit: ${result[i].id}, ${result[i].name}, ${result[i].price}`);
        }
      }
      const options = {
        //afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
        // A hook for after droping rows.
        afterSearch, // define a after search hook
      };
    const linkFollow = (cell, row) => (
        <div>
            <button type="button" className="btn btn-sm btn-dark"

                onClick={() => handleCategoryEdit(row)}
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

    const handleChecked = async(e,row) => {
        const data = {
             /* eslint-disable no-underscore-dangle */
          id:row._id,
          isActive:e
        }
        const result = await CategoryStatusChange(data)
        ResultFunction(result,CategoryList)
    
    
      }
      const isActiveFormatter = (cell, row) => {
    
        return(
          <Switch onChange={(e)=>handleChecked(e,row)} id="isActive" checked={row?.isActive}/>
        )
      }
    

    const columns = [
        { dataField: "id", text: "ID", formatter: (cell, row, rowIndex) => `${rowIndex + 1}` },
        { dataField: "categoryName", text: "Category Name" },
        { dataField: "isActive", text: "Is Active", formatter: isActiveFormatter },
        { dataField: "Action", text: "Action", formatter: linkFollow },
    ];

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: ">>",
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
        showTotal: true,
        alwaysShowAllBtns: true,
    });

    return (
        <>

            <Row>
                <Col md="12">
                    <ComponentCard title="Category Details">
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
                                <CSVLink className="dropdown-item" data={categoryList}>
                                    Export as CSV
                                </CSVLink>
                            </div>
                            <button
                                type="button"
                                className="btn btn-sm btn-dark"
                               onClick={addModalDisplay}
                            >Add</button>
                        </div>

                        <BootstrapTable
                            striped
                            hover

                            condensed
                            search
                            bootstrap5
                            keyField="_id"
                            columns={columns}
                            data={categoryList}
                            pagination={pagination}
                            filter={filterFactory()}
                            options={options}
                        />

                    </ComponentCard>
                </Col>
            </Row>

            <UpdateCategory data={categoryDataForUpdate} categoryList={CategoryList} show={modalShow} onHide={() => setModalShow(false)} />
            <AddCategory show={addModalShow} onHide={() => setAddModalShow(false)} categoryList={CategoryList} />
        </>
    );
};
// Category.propTypes = {
//     searchProps: PropTypes.object,
//     baseProps: PropTypes.object,
// };
export default Category;
