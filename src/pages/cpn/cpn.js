

import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import _cpnList from "./../../assets/mockup/listeCPN.json";
import ButtonCell from '../../components/dataGrid/buttonCell.component';
import CpnCell from '../../components/dataGrid/cpnCell.component';
import DataGridLoaderComponent from '../../components/dataGrid/dataGridLoader.component';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import './cpn.scss';
import StatusCell from '../../components/dataGrid/statusCell';
import CpnPlusCell from '../../components/dataGrid/cpnPlusCell.component';
import PaginationDropDown from '../../components/dataGrid/paginationDopDown.component';
import ExportCsv from '../../components/dataGrid/exportCsv.component';
import FilterTextInput from '../../components/dataGrid/FilterTextInput.component';
import FilterDropdownInput from '../../components/dataGrid/filterDropdownInput.component';

library.add(faClock);

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
        wrapText: true,
        cellStyle: {fontWeight: 600}
      },
      {
        field: 'Action',
        pinned: 'right',
        width: 100, 
        cellRenderer: ButtonCell
      },
      {field: 'cpn_status_description', headerName: 'CPN Description',filter: true, pinned: 'left'},
      //{field: 'cpn_corporate_project_number_description', headerName: 'Status', width: 150, pinned: 'left' },
      {field: 'cpn_status', headerName: 'Status',  width: 150, pinned: 'left', key: 'cpn_status', cellRenderer: StatusCell},
      {
        field: 'CPN+', 
        width: 150, 
        pinned: 'left', 
        cellRenderer: CpnPlusCell,
      },
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
      {field: 'controlling_subgroup_description', headerName: 'Controlling Subgroup Description', filter: true},
      {field: 'capit_marker_cpn', headerName: 'Capital Marker', filter: true},
      {field: 'type_of_funding_description', headerName: 'Type of funding description', filter: true},
      {field: 'capit_marker_cpn_description', headerName: 'Capital Marker Description', filter: true}
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
      headerClass: function(params) {
        // logic to return the correct class
        return 'cpn-datagrid-header';
      }
      //floatingFilter: true, //input filter in header column 
      }));


  
    const frameworkComponents = {
      expandCellRenderer: CpnPlusCell,
    };

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
    const onPaginationChange = useCallback(() => {
      var value = document.getElementById('page-size').value;
      setPaginationValue(value);
    }, []);

    const onFilterStatusChanged = useCallback(() => {
      gridRef.current.api.setQuickFilter(
        document.getElementById('dropdown').value
      );
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


    const loadingCellRenderer = useMemo(() => {
      return DataGridLoaderComponent;
    }, []);

    return (
      <>
        <div className="ag-theme-alpine cpn-container">
          <div className='cpn-header'>
            <div className='flex-row'>
              <FilterTextInput 
                onFilterTextBoxChanged={onFilterTextBoxChanged} 
              />
              <select 
                  className='dropdown-input'
                  value={selectedStatusFilterValue} 
                  onChange={(e) => {
                      setSelectedStatusFilterValue(e.target.value);
                      console.log(selectedStatusFilterValue);
                      onFilterStatusChanged()
                  }} 
                  id="dropdown">
                      <option value="SHOWALL">status: Show All</option>
                      <option value="REL">status: REL</option>
                      <option value="TECO">status: TECO</option>
              </select>
            </div>
            <ExportCsv 
              onBtnExport={onBtnExport}
            />
          </div>
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
              suppressMenuHide={true}
              //suppressPaginationPanel={true}
              />
          <PaginationDropDown 
            onPaginationChange={onPaginationChange}
          />
        </div>
      </>
    );
}

export default Cpn;
