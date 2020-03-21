import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Profile from './Profile';
import * as authMock from './auth';

jest.mock('./auth');

test('guest user', () => {
    const { getByText } = render(<Profile />);
    
    expect(getByText('Guest')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
});

test('guest login', () => {
    const { getByText } = render(<Profile />);
    
    fireEvent.click(getByText('Login'));

    expect(authMock.login).toHaveBeenCalled();
});

test('logged in user', () => {
    const user = { picture: '/pic.jpg', name: 'John Constantine'};
    const { getByText, getByAltText } = render(<Profile isAuthenticated={true} user={user} />);
    
    expect(getByAltText('Avatar')).toHaveAttribute('src', '/pic.jpg');
    expect(getByText('John Constantine')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
});

test('logout', () => {
    const user = { picture: '/pic.jpg', name: 'John Constantine'};
    const { getByText } = render(<Profile isAuthenticated={true} user={user} />);
    
    fireEvent.click(getByText('Logout'));

    expect(authMock.logout).toHaveBeenCalled();
});