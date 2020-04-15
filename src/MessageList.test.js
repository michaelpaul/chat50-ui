import React from 'react';
import { render } from '@testing-library/react';

import MessageList from './MessageList';

test('renders empty', () => {
    const { getByText } = render(<MessageList />);

    expect(getByText('No Data')).toBeTruthy();
});

test('renders messages', () => {
    const comments = [
        {
            author: "Squall",
            avatar: "/8.png",
            body: 'Did you see Rinoa?',
            datetime: "2020-04-15T19:24:01.910164Z"
        },
        {
            author: "Cloud",
            avatar: "/7.png",
            body: 'Not interested.',
            datetime: "2020-04-15T19:24:04.123456Z"
        }
    ];
    const { getByText } = render(<MessageList comments={comments} />);

    expect(getByText('Rinoa?', { exact: false })).toBeTruthy();
    expect(getByText(/interested/)).toBeTruthy();
});