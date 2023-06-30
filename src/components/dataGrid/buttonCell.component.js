import React from 'react';

export default (p) => {
  const cellValue = p.valueFormatted ? p.valueFormatted : p.value;

  const buttonClicked = () => {
    console.log("cell clicked")
  };

  return (
    <>
      <button onClick={() => buttonClicked}>Action</button>
    </>
  );
};