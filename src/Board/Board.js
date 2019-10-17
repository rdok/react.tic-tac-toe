import React from 'react'
import Square from './../Square/Square.js'

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null)
        }
    }

    handleClick(square) {
        const squares = this.state.squares.slice();
        squares[square] = 'X';
        this.setState({squares: squares});
    }

    renderSquare(square) {
        return <Square 
            value={this.state.squares[square]} 
            onClick={() => this.handleClick(square)}
        />
    }

    render() {
        const status = 'Next player: X'

        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
            {this.renderSquare(0)} {this.renderSquare(1)} {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)} {this.renderSquare(4)} {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)} {this.renderSquare(7)} {this.renderSquare(8)}
            </div>
            </div>
        )
    }
}
