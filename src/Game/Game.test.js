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
