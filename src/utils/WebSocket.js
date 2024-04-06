import { baseUrl } from './API/config.js';
class WebSocketManager {
    constructor() {
        this.socket = null;
    }

    connect() {
        this.socket = new WebSocket(`ws://${baseUrl}/sendMessage`);
        this.socket.onopen = () => {
            console.log('WebSocket connection established.');
        };
        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    close() {
        if (this.socket) {
            this.socket.close();
            console.log('WebSocket connection closed.');
        }
    }

    sendMessage(chatId, messageText) {
        const message = {
            chat_id: chatId,
            message_text: messageText,
        };
        console.log(message);
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not open.');
        }
    }
}

const websocketManager = new WebSocketManager();

export { websocketManager };
