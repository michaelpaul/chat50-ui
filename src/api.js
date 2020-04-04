export const getChannels = async () => {
    const response = await fetch('http://localhost:5000/api/channels');
    return await response.json();
};

export const getMessages = async (channel) => {
    const response = await fetch(`http://localhost:5000/api/messages?channel=${channel}`);
    return await response.json();
};

export const postMessage = async (message, token) => {
    let params = {
        message
    };
    const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(params)
    });
    return await response.json();
};