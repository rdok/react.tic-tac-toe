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

it('may render an X square', () => {
    act(() => { render(<Square value={"X"} />, container) })
    let expected = container.innerHTML

    let board = new Board()
    board.state.squares[5] = 'X'
    let boardSquare = board.renderSquare(5)
    act(() => { render(boardSquare, container) })
    let actual = container.innerHTML

    expect(actual).toStrictEqual(expected)
});

it('it sets a square', () => {
    act(() => { render(<Square value={"X"} />, container) })
    let expected = container.innerHTML

    act(() => { render(<Board />, container) })
    const square = document.querySelector("[data-testid=square]")
    act(() => { square.dispatchEvent(new MouseEvent("click", { bubbles: true })) })
    let actual = container.innerHTML

    expect(actual).toContain(expected);

})
