import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import './cpnCell.scss'

library.add(faCopy);

const CpnCell = p => {
        return (
        <div className='cpn-cell-container'>
            <p>{p.value} </p>
            <div><FontAwesomeIcon icon={faCopy}onClick={() => console.log(p.value)} className='cpn-cell-icon'/></div>
        </div>);
}

export default CpnCell