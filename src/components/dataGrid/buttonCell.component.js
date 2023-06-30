import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import './buttonCell.scss'

library.add(faClock);

export default (p) => {
  const cellValue = p.valueFormatted ? p.valueFormatted : p.value;

  const buttonClicked = () => {
    console.log("cell clicked")
  };

  return (
    <div className='btn-cell-container'>
      <FontAwesomeIcon icon={faClock} onClick={() => buttonClicked} className='btn-cell-icon'/>
    </div>
  );
};