import React from 'react';

export default (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const buttonClicked = () => {
    console.log("cell clicked")
  };

  return (
    <div>
      <div>{cellValue}</div>
      <button onClick={() => buttonClicked}>Action</button>
    </div>
  );
};