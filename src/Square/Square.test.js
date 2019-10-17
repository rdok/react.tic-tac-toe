import React from 'react';
import Square from './Square';


it('default state value to null', () => {
    let square = new Square()

    expect(square.state).toMatchObject({ value: null })
})
