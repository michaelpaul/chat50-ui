import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Profile from './Profile';

test('guest user', () => {
    const { getByText } = render(<Profile />);

    expect(getByText('Guest')).toBeInTheDocument();
    expect(getByText('Login / Sign Up')).toBeInTheDocument();
});

test('guest login', () => {
    const handleLogin = jest.fn();
    const { getByText } = render(<Profile onLogin={handleLogin} />);

    fireEvent.click(getByText('Login / Sign Up'));

    expect(handleLogin).toHaveBeenCalled();
});

test('logged in user', () => {
    const user = { picture: '/pic.jpg', name: 'John Constantine' };
    const { getByText, getByAltText } = render(<Profile user={user} />);

    expect(getByAltText('Avatar')).toHaveAttribute('src', '/pic.jpg');
    expect(getByText('John Constantine')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
});

test('logout', () => {
    const user = { picture: '/pic.jpg', name: 'John Constantine' };
    const handleLogout = jest.fn();
    const { getByText } = render(<Profile user={user} onLogout={handleLogout} />);

    fireEvent.click(getByText('Logout'));

    expect(handleLogout).toHaveBeenCalled();
});