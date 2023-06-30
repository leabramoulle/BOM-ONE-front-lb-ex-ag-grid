import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons";
import './exportCsv.scss';

library.add(faArrowAltCircleDown);

function ExportCsv({onBtnExport}) {
    return (
        <div onClick={onBtnExport} className='export-csv-container'>
            <span  className='export-csv-text'>Export as CSV</span>
            <FontAwesomeIcon icon={faArrowAltCircleDown} />
        </div>
    )
}

export default ExportCsv;