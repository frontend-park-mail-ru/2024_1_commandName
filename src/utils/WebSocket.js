import { baseUrl } from './API/config.js';

export class WebSocketManager {
    constructor(method, responsehandler) {
        this.method = method;
        this.ws_way = '';
        if (baseUrl === 'chatme.site/api/v1') {
            this.protocol = 'wss';
            this.ws_way = '/ws';
        } else {
            this.protocol = 'ws';
        }
        this.socket = new WebSocket(
            `${this.protocol}://${baseUrl}${this.ws_way}/${this.method}`,
        );
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
                this.socket = new WebSocket(
                    `${this.protocol}://${baseUrl}${this.ws_way}/${this.method}`,
                );
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
