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

it('may render a clickbable button', () => {
    const mock = jest.fn()
    let props = {onClick: mock}
    let square = new Square(props)

    act(() => {
        render(square, container) 
        const button = document.querySelector("[data-testid=square-button]")
        button.dispatchEvent(new MouseEvent("click", { bubbles: true })) 
    })

    expect(mock).toHaveBeenCalled()
})

