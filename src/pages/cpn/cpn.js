

import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import './cpn.scss';
import _cpnList from "./../../assets/mockup/listeCPN.json";
import ButtonCell from '../../components/dataGrid/buttonCell.component';
import CpnCell from '../../components/dataGrid/cpnCell.component';
import DataGridLoaderComponent from '../../components/dataGrid/dataGridLoader.component';

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};

function Cpn() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
      {
        field: 'cpn_corporate_project_number',
        headerName: 'CPN',
        minWidth: 170,
        checkboxSelection: checkboxSelection,
        headerCheckboxSelection: headerCheckboxSelection,
        pinned: 'left',
        cellRenderer: CpnCell,
        wrapText: true 
      },
      {
        field: 'Action',
        pinned: 'right',
        width: 100, 
        cellRenderer: ButtonCell
      },
      {field: 'cpn_status_description', headerName: 'CPN Description',filter: true, pinned: 'left'},
      //{field: 'cpn_corporate_project_number_description', headerName: 'Status', width: 150, pinned: 'left' },
      {field: 'cpn_status', headerName: 'Status',  width: 150, pinned: 'left', key: 'cpn_status'},
      {field: 'capit_marker_cpn', headerName: 'CPN', filter: true},
      {field: 'type_of_funding_description', headerName: 'CPN', filter: true},
      {field: 'capit_marker_cpn_description', headerName: 'CPN', filter: true},
      {field: 'financial_activity', headerName: 'Financial Activity', filter: true},
      {field: 'financial_activity_description', headerName: 'Financial Activity Description', filter: true},
      {field: 'financial_product', headerName: 'Financial Product', filter: true},
      {field: 'financial_product_description', headerName: 'Financial Product Description', filter: true},
      {field: 'life_cycle', headerName: 'Life Cycle', filter: true},
      {field: 'life_cycle_stage', headerName: 'Life Cycle Stage', filter: true},
      {field: 'life_cycle_stage_description', headerName: 'Life Cycle Description', filter: true},
      {field: 'controlling_group', headerName: 'Controlling Group', filter: true},
      {field: 'controlling_group_description', headerName: 'Controlling Group Description', filter: true},
      {field: 'controlling_subgroup', headerName: 'Controlling Subgroup', filter: true},
      {field: 'controlling_subgroup_description', headerName: 'Controlling Subgroup Description', filter: true}
    ]);
    const [paginationValue, setPaginationValue] = useState(10); // Set rowData to Array of Objects, one Object per Row
    const [selectedStatusFilterValue, setSelectedStatusFilterValue] = useState('');

    const autoGroupColumnDef = useMemo(() => {
      return {
        headerName: 'Group',
        minWidth: 170,
        field: 'cpn_corporate_project_number',
        valueGetter: (params) => {
          if (params.node.group) {
            return params.node.key;
          } else {
            return params.data[params.colDef.field];
          }
        },
        headerCheckboxSelection: true,
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
          checkbox: true,
        },
      };
    }, []);

    
    const defaultColDef = useMemo( ()=> ({
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      minWidth: 100,
      //floatingFilter: true, //input filter in header column 
      }));
  

    const cellClickedListener = useCallback( event => {
      console.log('cellClicked', event);
    }, []);
  
    useEffect(() => {
      setInterval(() => {
        setRowData(_cpnList);
       }, 1000);
      //setRowData(_cpnList);
    }, []);

    const onGridReady = (e) => {
      const {api, columnApi} = gridRef.current;
    }

    //edit pagination
    const onPageSizeChanged = useCallback(() => {
      var value = document.getElementById('page-size').value;
      setPaginationValue(value);
    }, []);
  
    //export daata grid to csv function
    const onBtnExport = useCallback(() => {
      if (gridRef.current && gridRef.current.api) {
        gridRef.current.api.exportDataAsCsv();
      }
    }, []);

    //row drag event
    const onDragEnd = (e) => {
      console.log(e.overNode.data)
    } 

    const onFilterTextBoxChanged = useCallback(() => {
      gridRef.current.api.setQuickFilter(
        document.getElementById('filter-text-box').value
      );
    }, []);

  
    const onFilterStatusChanged = useCallback(() => {
      gridRef.current.api.setQuickFilter(
        document.getElementById('dropdown').value
      );
  }, []);

    const loadingCellRenderer = useMemo(() => {
      return DataGridLoaderComponent;
    }, []);

    return (
      <div className="ag-theme-alpine cpn-container">
        <div className="example-header">
          Page Size:
          <select onChange={onPageSizeChanged} id="page-size">
            <option value="10">10</option>
            <option value="100">15</option>
            <option value="500">20</option>
            <option value="1000">50</option>
          </select>
        </div>
        <button onClick={onBtnExport}>export</button>
        <input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
        <select value={selectedStatusFilterValue} onChange={(e) => {
          setSelectedStatusFilterValue(e.target.value);
          console.log(selectedStatusFilterValue);
          onFilterStatusChanged()}} id="dropdown">
           <option value="SHOWALL">Show All</option>
           <option value="REL">REL</option>
           <option value="TECO">TECO</option>
        </select>
        <AgGridReact
            onGridReady={onGridReady}
            ref={gridRef}
            loadingCellRenderer={loadingCellRenderer}
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            onCellClicked={cellClickedListener} 
            groupSelectsChildren={true}
            pivotPanelShow='always'
            pagination={true}
            paginationPageSize={paginationValue}
            autoGroupColumnDef={autoGroupColumnDef}
            suppressRowClickSelection={true}
            animateRows={true} 
            rowGroupPanelShow='always'
            rowSelection='multiple' // Options - allows click selection of rows
            rowDragEntireRow={true}
            rowDragMultiRow={true}
            rowDragManaged={true}
            onRowDragEnd={onDragEnd}
            cacheQuickFilter={true}
            />
      </div>
    );
}

export default Cpn;
