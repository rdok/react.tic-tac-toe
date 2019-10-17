import React from 'react'
import Square from './../Square/Square.js'

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }

    handleClick(square) {
        const squares = this.state.squares.slice()
        squares[square] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        })
    }

    renderSquare(square) {
        return <Square 
            value={this.state.squares[square]} 
            onClick={() => this.handleClick(square)}
        />
    }

    render() {
        const winner = this.calculateWinner(this.state.squares);

        let status = winner 
            ? 'Winner: ' + winner 
            : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')

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

    calculateWinner(squares) {

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }
}
