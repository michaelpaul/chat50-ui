export const login = async (token) => {
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const getChannels = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/channels');
        if (!response.ok) {
            throw new Error('Failed to load channels');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return []
    }
};

export const getMessages = async (channel) => {
    const response = await fetch(`http://localhost:5000/api/messages/${channel}`);
    return await response.json();
};

export const postMessage = async (channel, message, token) => {
    try {
        let params = {
            channel,
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
    } catch (error) {
        console.error(error);
    }
};