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

it('calls the onClick props callback', () => {
    const onClick = jest.fn()
    act(() => { render(<Square onClick={onClick} />, container) })
    const square = document.querySelector("[data-testid=square]")
    act(() => { square.dispatchEvent(new MouseEvent("click", { bubbles: true })) })

    expect(onClick).toHaveBeenCalledTimes(1)
})

