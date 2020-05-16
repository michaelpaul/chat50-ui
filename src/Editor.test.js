import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Editor from './Editor';

test('renders', () => {
    render(<Editor />);
});

test('trigger change', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(<Editor onChange={onChange} />);
    const input = getByPlaceholderText('Your message');

    fireEvent.change(input, { target: { value: 'hello' } });

    expect(input.value).toBe('hello');
    expect(onChange).toHaveBeenCalled();
});

test('trigger submit', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText } = render(<Editor onSubmit={onSubmit} />);
    const input = getByPlaceholderText('Your message');

    fireEvent.change(input, { target: { value: 'send le form' } });
    fireEvent.submit(input, { bubbles: true });

    expect(onSubmit).toHaveBeenCalled();
});