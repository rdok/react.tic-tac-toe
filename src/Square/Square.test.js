import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('renders without crashing', () => {
    act(() => { render(<Square />, container); });
});

it('renders without a square', () => {
    const expected = `<button class="square"></button>`
    act(() => { render(<Square />, container); });
    expect(container.innerHTML).toBe(expected);
});

it('renders a square', () => {
    const expected = `<button class="square">5</button>`
    act(() => { render(<Square value={5} />, container); });
    expect(container.innerHTML).toBe(expected);
});
