import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';

function FilterDropdownInput({selectedStatusFilterValue, setSelectedStatusFilterValue, gridRed}) {
    const gridRef = useRef();

    const onFilterStatusChanged = useCallback(() => {
        const {api, columnApi} = gridRef.current;

        gridRef.current.api.setQuickFilter(
          document.getElementById('dropdown').value
        );
    }, []);

    return (
        <select 
            value={selectedStatusFilterValue} 
            onChange={(e) => {
                setSelectedStatusFilterValue(e.target.value);
                console.log(selectedStatusFilterValue);
                onFilterStatusChanged()
            }} 
            id="dropdown">
                <option value="SHOWALL">Show All</option>
                <option value="REL">REL</option>
                <option value="TECO">TECO</option>
        </select>
    )
}

export default FilterDropdownInput;






