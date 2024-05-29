import { baseUrl } from './API/config.js';

export class WebSocketManager {
    constructor(responseHandler) {
        this.responseHandler = responseHandler;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5; // Максимальное количество попыток переподключения
        this.reconnectDelay = 1000; // Задержка перед переподключением в миллисекундах
        this.createWebSocket();
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
            this.reconnectAttempts = 0; // Сбросить количество попыток переподключения
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
                this.reconnect();
            } else {
                console.log('WebSocket connection closed cleanly.');
            }
        };
    }

    reconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            setTimeout(() => {
                this.reconnectAttempts++;
                this.createWebSocket();
            }, this.reconnectDelay);
        } else {
            console.error('Max reconnect attempts reached. Giving up.');
        }
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
