import { getChannels, getMessages, postMessage } from './api';

const mockResponse = (response) => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(response)
        })
    );
};

test('get channels', async () => {
    const channels = [
        { key: '0', name: 'Week 0: Scratch' },
        { key: '1', name: 'Week 1: C' }
    ]
    mockResponse(channels);

    expect(await getChannels()).toBe(channels);

    global.fetch.mockRestore();
});

test('get messages', async () => {
    const messages = [
        { body: 'foo' },
        { body: 'bar' },
    ]
    mockResponse(messages);

    expect(await getMessages()).toBe(messages);

    global.fetch.mockRestore();
});

test('post message', async () => {
    const message = { id: 128, body: 'foo' };
    mockResponse(message);

    expect(await postMessage('Hello, World!', 'JWT')).toBe(message);

    global.fetch.mockRestore();
});