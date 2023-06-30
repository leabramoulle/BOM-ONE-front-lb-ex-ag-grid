import React, { Component } from 'react';
import './statusCell.scss'

const StatusCell = p => {
    return (
        <span className={p.value ? "statusCell" : ""}>{p.value}</span>
    )
}

export default StatusCell