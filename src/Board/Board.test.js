import React from 'react'
import Board from './Board'
import Square from './../Square/Square'
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import { renderToString } from 'react-dom/server'


let container = null
beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

it('renders without crashing', () => {
    act(() => { render(<Board />, container) })
});

it('sets the initial state to 9 empty Square', () => {
    let board = new Board()
    const squares = [null, null, null, null, null, null, null, null, null]
    expect(board.state).toMatchObject({ squares: squares })
});

it('may render an empty square', () => {
    act(() => { render(<Square />, container) })
    let expected = container.innerHTML

    let board = new Board()
    let boardSquare = board.renderSquare(1)
    act(() => { render(boardSquare, container) })
    let actual = container.innerHTML

    expect(actual).toStrictEqual(expected)
});

it('it marks a square', () => {
    act(() => { render(<Square value={"X"} />, container) })
    let expected = container.innerHTML

    act(() => { render(<Board />, container) })
    const square = document.querySelector("[data-testid=square]")
    act(() => { square.dispatchEvent(new MouseEvent("click", { bubbles: true })) })
    let actual = container.innerHTML

    expect(actual).toContain(expected);
})

it('sets X player as starter', () => {
    let board = new Board
    expect(board.state).toHaveProperty('xIsNext', true) 
})

it('flipps next player turn', () => {
    let board
    act(() => { board = render(<Board  />, container) })
    board.handleClick(0)

    expect(board.state).toHaveProperty('xIsNext', false) 
    expect(board.state.squares[0]).toEqual('X') 
})

it('notifies which player is next', () => {
    let board
    act(() => { board = render(<Board  />, container) })
    expect(container.innerHTML)
        .toContain('<div class="status">Next player: X</div>')

    board.handleClick(0)
    expect(container.innerHTML)
        .toContain('<div class="status">Next player: O</div>')
})

it('declares a winner', () => {
    let board
    act(() => { board = render(<Board  />, container) })
    expect(container.innerHTML)
        .toContain('<div class="status">Next player: X</div>')

    for (let step = 0; step < 9; step++) {
        board.handleClick(step)
    }

    expect(container.innerHTML)
        .toContain('<div class="status">Winner: X</div>')
})

it('ends the game when a winner is declared', () => {
    const mock = jest
        .fn()
        .mockReturnValue(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)

    
    let board
    act(() => { board = render(<Board  />, container) })
    board.calculateWinner = mock
    let actual = container.textContent
    expect(actual) .toEqual('Next player: X      ')

    board.handleClick(0)
    actual = container.textContent
    expect(actual).toEqual('Winner: trueX      ')

    board.handleClick(1)
    expect(actual).toEqual('Winner: trueX      ')
})

it('ignores a marking if it has been filed', () => {
    let board
    act(() => { board = render(<Board  />, container) })
    board.handleClick(0)
    expect(container.textContent).toEqual('Next player: OX      ')
    board.handleClick(0)
    expect(container.textContent).toEqual('Next player: OX      ')
})
