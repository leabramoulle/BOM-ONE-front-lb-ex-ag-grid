import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import './cpnCell.scss'

library.add(faCopy);

const copyCellData = (p) => {
    console.log(p.value)
    navigator.clipboard.writeText(p.value);
}

const CpnCell = p => {
        return (
        <div className='cpn-cell-container'>
            <span>{p.value} </span>
            <div><FontAwesomeIcon icon={faCopy} onClick={() => copyCellData(p)} className='cpn-cell-icon'/></div>
        </div>);
}

export default CpnCell