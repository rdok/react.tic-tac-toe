import React from 'react'
import Game from './Game'
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
    act(() => { render(<Game />, container) })
});

it('sets the history state', () => {
    let game = new Game 
    const history = {history: [{ squares: Array(9).fill(null) }]}
    expect(game.state).toMatchObject(history)
});

it('sets X player as starter', () => {
    let game = new Game
    expect(game.state).toHaveProperty('xIsNext', true) 
})

it('sets up the starting step', () => {
    let game = new Game
    expect(game.state).toHaveProperty('stepNumber', 0) 
})

describe('jumptTo', () => {
    it('sets the step number', () => {
        let game
        act(() => { game = render(<Game />, container) })
        game.jumpTo(5)
        expect(game.state.stepNumber).toEqual(5)
    })

    it('sets xIsNext depending on the stepNumber', () => {
        let game
        act(() => { game = render(<Game />, container) })
        game.jumpTo(5)
        expect(game.state.xIsNext).toEqual(false)
        game.jumpTo(4)
        expect(game.state.xIsNext).toEqual(true)
    })
})

/**
it('flipps next player turn', () => {
    let game
    act(() => { game = render(<Game  />, container) })
    expect(game.state).toHaveProperty('xIsNext', false) 
    expect(game.state.squares[0]).toEqual('X') 
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
it('it marks a square', () => {
    act(() => { render(<Square value={"X"} />, container) })
    let expected = container.innerHTML

    act(() => { render(<Board />, container) })
    const square = document.querySelector("[data-testid=square]")
    act(() => { square.dispatchEvent(new MouseEvent("click", { bubbles: true })) })
    let actual = container.innerHTML

    expect(actual).toContain(expected);
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

it('notifies which player is next', () => {
    let board
    act(() => { board = render(<Board  />, container) })
    expect(container.innerHTML)
        .toContain('<div class="status">Next player: X</div>')

    board.handleClick(0)
    expect(container.innerHTML)
        .toContain('<div class="status">Next player: O</div>')
})
*/
