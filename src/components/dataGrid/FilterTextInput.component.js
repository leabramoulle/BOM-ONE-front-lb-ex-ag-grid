import React from 'react';
import './filterTextInput.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHourglassEmpty } from "@fortawesome/free-regular-svg-icons";

library.add(faHourglassEmpty);

function FilterTextInput({onFilterTextBoxChanged}) {
    return (
        <div className='text-input-container'>
            <FontAwesomeIcon icon={faHourglassEmpty}  className='text-input-icon'/>
            <input
                type="text"
                id="filter-text-box"
                placeholder="Search in CPN, CPN+"
                onInput={onFilterTextBoxChanged}
                className='text-input'
                />
        </div>
    )
}

export default FilterTextInput;



