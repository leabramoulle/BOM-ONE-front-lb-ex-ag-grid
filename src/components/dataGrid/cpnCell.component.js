import React, { Component } from 'react';

const CpnCell = p => {
        return (<>{p.value} <button onClick={() => console.log(p.value)}>Action</button></>);
}

export default CpnCell