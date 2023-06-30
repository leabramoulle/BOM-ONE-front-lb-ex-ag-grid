import React from 'react';

function PaginationDropDown({onPaginationChange}) {
    return (
        <div className="example-header">
            Page Size:
            <select onChange={onPaginationChange} id="page-size">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
    )
}

export default PaginationDropDown;