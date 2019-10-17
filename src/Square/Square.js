import React from 'react';

export default class Square extends React.Component {
    render() {
        return (
            <button className="square" data-testid="squarealert" onClick={() => alert('clicked')}>
            {this.props.value}
            </button>
        );
    }
}
