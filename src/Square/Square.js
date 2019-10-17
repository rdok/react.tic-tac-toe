import React from 'react';

export default class Square extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: null }
    }
    render() {
        return (
            <button 
                className="square" 
                data-testid="squarealert" 
                onClick={() => this.setState({value: 'X'})}
            >
            {this.state.value}
            </button>
        );
    }
}
