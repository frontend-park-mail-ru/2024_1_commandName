import { baseUrl } from './API/config.js';

export class WebSocketManager {
    constructor(responsehandler) {
        if (baseUrl === 'chatme.site/api/v1') {
            this.socket = new WebSocket(`wss://${baseUrl}/ws/sendMessage`);
        } else {
            this.socket = new WebSocket(`ws://${baseUrl}/sendMessage`);
        }
        this.responseHandler = responsehandler;
        this.connect();
    }

    connect() {
        this.socket.onopen;
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
        this.socket.onclose = function (event) {
            if (!event.wasClean) {
                if (baseUrl === 'chatme.site/api/v1') {
                    this.socket = new WebSocket(
                        `wss://${baseUrl}/ws/sendMessage`,
                    );
                } else {
                    this.socket = new WebSocket(`ws://${baseUrl}/sendMessage`);
                }
            }
        };
    }

    sendRequest(data) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.error('WebSocket error.');
        }
    }
    close() {
        if (this.socket) {
            this.socket.close();
        }
    }
}
