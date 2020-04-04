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
            datetime: 'few sencods ago'
        },
        {
            author: "Cloud",
            avatar: "/7.png",
            body: 'Not interested.',
            datetime: 'right after'
        }
    ];
    const { getByText } = render(<MessageList comments={comments} />);

    expect(getByText('Rinoa?', { exact: false })).toBeTruthy();
    expect(getByText(/interested/)).toBeTruthy();
});

test('hide avatar in sequence', () => {
    const comments = [
        {
            author: "Squall",
            avatar: "/8.png",
            content: 'Did you see Rinoa?',
            datetime: 'few sencods ago'
        },
        {
            author: "Squall",
            avatar: "/9.png",
            content: 'Please?',
            datetime: 'right after'
        }
    ];
    const { getAllByAltText } = render(<MessageList comments={comments} />);

    expect(getAllByAltText('Author Avatar')[1]).not.toBeVisible();
});