import { baseUrl } from './API/config.js';
import { generateKey } from '../utils/cryption.js';

export class WebSocketManager {
    #secretKey;

    constructor(responseHandler) {
        this.responseHandler = responseHandler;
        this.createWebSocket();
        this.#secretKey = generateKey();
    }

    createWebSocket() {
        if (baseUrl === 'chatme.site/api/v1') {
            this.socket = new WebSocket(`wss://${baseUrl}/ws/sendMessage`);
        } else {
            this.socket = new WebSocket(`ws://${baseUrl}/sendMessage`);
        }
        this.connect();
    }

    connect() {
        this.socket.onopen = () => {
            console.log('WebSocket connection opened.');
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Добавляем прослушивание входящих сообщений
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (this.responseHandler) {
                this.responseHandler(data);
            }
        };

        this.socket.onclose = (event) => {
            if (!event.wasClean) {
                console.warn(
                    'WebSocket connection closed unexpectedly, reconnecting...',
                );
                setTimeout(() => {
                    this.createWebSocket();
                }, 3000);
            } else {
                console.log('WebSocket connection closed cleanly.');
            }
        };
    }

    sendRequest(data) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.error('WebSocket is not open.');
        }
    }

    close() {
        if (this.socket) {
            this.socket.close();
        }
    }
}
