import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";
import './cpnPlusCell.scss'

library.add(faCircleDown);

const CpnPlusCell = p => {
        return (
        <>
            <span className='cpnPlus-content'>Show CPN+ </span>
            <FontAwesomeIcon icon={faCircleDown} onClick={() => console.log(p.value)} className='cpnPlus-icon'/>
        </>);
}

export default CpnPlusCell