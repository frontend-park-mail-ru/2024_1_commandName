import { baseUrl } from './API/config.js';
class WebSocketManager {
    constructor() {
        this.socket = null;
        this.ws_way = '';
        if (baseUrl === 'chatme.site/api/v1') {
            this.protocol = 'wss';
            this.ws_way = '/ws';
        } else {
            this.protocol = 'ws';
        }
    }

    setMessageHandler(handler) {
        this.messageHandler = handler;
    }

    connect() {
        this.socket = new WebSocket(
            `${this.protocol}://${baseUrl}${this.ws_way}/sendMessage`,
        );
        this.socket.onopen = () => {
            console.log('WebSocket connection established.');
        };
        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        // Добавляем прослушивание входящих сообщений
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (this.messageHandler) {
                this.messageHandler(message);
            }
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
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not open.');
        }
    }
}

const websocketManager = new WebSocketManager();

export { websocketManager };