import React from 'react'
import Square from './Square'
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

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
    act(() => { render(<Square />, container) })
})

it('renders without a square', () => {
    const expected = `<button class="square" data-testid="squarealert"></button>`
    act(() => { render(<Square />, container) })
    expect(container.innerHTML).toBe(expected)
})

it('sets the square\'s state value when clicked', () => {
    act(() => { render(<Square />, container) })
    const square = document.querySelector("[data-testid=squarealert]")
    act(() => { square.dispatchEvent(new MouseEvent("click", { bubbles: true })) })
    expect(container.textContent).toBe('X')
})

