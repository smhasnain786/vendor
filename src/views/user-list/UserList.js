import React, { useEffect,useState } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import * as data from './DataBootstrapTable';
import './ReactBootstrapTable.scss';
import ComponentCard from '../../components/ComponentCard';
import { getUserDataService } from "../../services/user.service";
import ViewUser from "../../models/ViewUser";

//This is for the Delete row

function onAfterDeleteRow(rowKeys) {
    // eslint-disable-next-line no-alert
    alert(`The rowkey you drop: ${rowKeys}`);
}
//This is for the insert new row
/*
function onAfterInsertRow(row) {
  let newRowStr = '';
 
  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
}*/
//This is for the Search item
function afterSearch(searchText, result) {
    console.log(`Your search text is ${searchText}`);
    console.log('Result is:');
    for (let i = 0; i < result.length; i++) {
        console.log(`Fruit: ${result[i].id}, ${result[i].name}, ${result[i].price}`);
    }
}
const options = {
    //afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
    afterDeleteRow: onAfterDeleteRow, // A hook for after droping rows.
    afterSearch, // define a after search hook
};
const selectRowProp = {
    mode: 'checkbox',
};
const cellEditProp = {
    mode: 'click',
    blurToSave: true,
};


const UserList = () => {
    const [exportData, setExportData] = useState([]);
    const [viewUser, setViewUser] = useState({});
    const getuserslist = async () => {
        const result = await getUserDataService()
        console.log("resultresult", result)
        if (result.status) {
            setExportData(result?.data)
        }

    }
    useEffect(() => {
        getuserslist()
    }, []);

    const handleUserView = (row) => {
        setViewUser(row)
    }

    const linkFollow = (row) => {
        return (
            <div>
            <button
                type="button"
                className="btn btn-sm btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#view_user"
                onClick={() => handleUserView(row)}
            >
            View
            </button>
            </div>
        );
    };
    



    return (
        <>

            <Card>
                <CardBody className='p-4'>
                    <Row>
                        <Col md="12">
                            <ComponentCard title="Bootstrap DataTable">
                                <BootstrapTable
                                    striped
                                    hover
                                    
                                    condensed
                                    search
                                    data={exportData}
                                    deleteRow
                                    selectRow={selectRowProp}
                                    pagination
                                    insertRow
                                    options={options}
                                    cellEdit={cellEditProp}
                                    tableHeaderClass="mb-0"
                                >
                                    <TableHeaderColumn width="10" dataField="name" isKey>
                                        Coaching/Teacher Name
                                    </TableHeaderColumn>
                                    <TableHeaderColumn width="100" dataField="emailId">
                                        Email
                                    </TableHeaderColumn>
                                    <TableHeaderColumn width="100" dataField="mobileNumber">
                                        Mobile Number
                                    </TableHeaderColumn>
                                    <TableHeaderColumn width="100" dataField="state">
                                        State
                                    </TableHeaderColumn>
                                    <TableHeaderColumn width="100" dataField="mobile" text= 'Action' formatter= {linkFollow} >
                                        Action
                                    </TableHeaderColumn>
                                </BootstrapTable>
                            </ComponentCard>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <ViewUser user={viewUser}/>
        </>
    );
};

export default UserList;
