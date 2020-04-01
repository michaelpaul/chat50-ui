import createAuth0Client from '@auth0/auth0-spa-js';
import { configureClient, Auth } from './auth';

jest.mock('@auth0/auth0-spa-js');

test('configure client', async () => {
    createAuth0Client.mockReturnValue({ remake: true });

    const client = await configureClient();

    expect(client).toEqual({ remake: true });
});

test('getCurrentUser', async () => {
    const client = {
        getUser: jest.fn(() => ({ id: 128 }))
    };
    const auth = new Auth(client);

    const user = await auth.getCurrentUser();

    expect(user).toEqual({ id: 128 });
});

test('getAuthToken', async () => {
    const client = {
        getTokenSilently: jest.fn(() => 'A long JWT')
    };
    const auth = new Auth(client);

    expect(await auth.getAuthToken()).toBe('A long JWT');
});

test('login', async () => {
    const client = {
        loginWithRedirect: jest.fn()
    };
    const auth = new Auth(client);

    await auth.login();

    expect(client.loginWithRedirect).toHaveBeenCalled();
});

test('logout', async () => {
    const client = {
        isAuthenticated: jest.fn(() => true),
        logout: jest.fn()
    };
    const auth = new Auth(client);

    await auth.logout();

    expect(client.logout).toHaveBeenCalled();
});

test('authenticate', async () => {
    const client = {
        isAuthenticated: jest.fn(),
        logout: jest.fn()
    };
    const auth = new Auth(client);

    await auth.authenticate();

    expect(client.isAuthenticated).toHaveBeenCalled();
});