import React from 'react';

export default function Square(props) {
    return (
        <button className="square" onClick={props.onClick} data-testid="square">
            {props.value}
        </button>
    );
}
