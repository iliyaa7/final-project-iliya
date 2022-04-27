import React from 'react';
import { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar'
import BasicTable from '../Table/Table';
import './Dashboard.css';

function Dashboard(props) {
  const [tableData, setTableData] = useState(null);

  function handleMenuClick(tableData) {
    setTableData(tableData)
  }

  return (
    <div className='dashboard'>
        <SideBar handleMenuClick={handleMenuClick}/>
        {tableData && <BasicTable/>}
    </div>
  );
}

export default Dashboard;