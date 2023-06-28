import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import './cpn.scss';
import _cpnList from "./../../assets/mockup/listeCPN.json";

function Cpn() {
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [columnDefs, setColumnDefs] = useState([
      {field: 'cpn_corporate_project_number', filter: true},
      {field: 'cpn_corporate_project_number_description', filter: true},
      {field: 'cpn_status'}
    ]);
  
    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo( ()=> ({
        sortable: true,
        resizable: true,
      }));
  
    // Example of consuming Grid Event
    const cellClickedListener = useCallback( event => {
      console.log('cellClicked', event);
    }, []);
  
    // Example load data from server
    useEffect(() => {
      setRowData(_cpnList);
    }, []);
  
  
    return (
      <div className="cpn-container">  
        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-alpine cpn-container">
  
          <AgGridReact
              rowData={rowData} // Row Data for Rows
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              onGridReady={(event) => event.api.sizeColumnsToFit()}
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              rowSelection='multiple' // Options - allows click selection of rows
              onCellClicked={cellClickedListener} // Optional - registering for Grid Event
              />
        </div>
      </div>
    );
}

export default Cpn;
