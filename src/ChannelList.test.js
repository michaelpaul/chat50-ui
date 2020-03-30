import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ChannelList from './ChannelList';

test('renders', () => {
    const channels = [{
        key: '1',
        name: 'pset1'
    }, {
        key: '2',
        name: 'pset2'
    }];
    const { getByText } = render(<ChannelList channels={channels} />);
    
    expect(getByText('pset1')).toBeTruthy();
    expect(getByText('pset2')).toBeTruthy();
});

test('open channel', () => {
    const channels = [{
        key: '1',
        name: 'pset1'
    }, {
        key: '2',
        name: 'pset2'
    }];
    const handleOpen = jest.fn();
    const { getByText } = render(<ChannelList channels={channels} onOpen={handleOpen} />);

    fireEvent.click(getByText('pset2'));

    expect(handleOpen).toHaveBeenCalledWith('2');
});