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
    act(() => { render(<Board squares={["X"]} />, container) })
});

it('may initialize a square', () => {
    let board = new Board({squares: ["X"]})
    let square = board.renderSquare(0)
    expect(square).toHaveProperty('type', Square)
    expect(square.props).toHaveProperty('value', "X")
});

it('may render a clickable square', () => {
    let board = new Board({squares: ["X"], onClick: jest.fn()})
    let square = board.renderSquare(0)

    act(() => { render(square, container) })

    document
        .querySelector("[data-testid=square-button]")
        .dispatchEvent(new MouseEvent("click", { bubbles: true })) 

    expect(board.props.onClick).toHaveBeenCalled()
});
