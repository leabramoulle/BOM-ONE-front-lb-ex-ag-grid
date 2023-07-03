import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";
import './cpnPlusCell.scss'

library.add(faCircleDown);

const CpnPlusCell = (p) => {

  const handleClick = () => {
    console.log(p.value)
  };

    return (
    <>
        <span className='cpnPlus-content'>Show CPN+ </span>
        <FontAwesomeIcon icon={faCircleDown} onClick={() => handleClick()} className='cpnPlus-icon'/>
    </>);
}

export default CpnPlusCell