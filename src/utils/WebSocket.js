import { baseUrl } from './API/config.js';

export class WebSocketManager {
    constructor(method, responsehandler) {
        this.ws_way = '';
        if (baseUrl === 'chatme.site/api/v1') {
            this.protocol = 'wss';
            this.ws_way = '/ws';
        } else {
            this.protocol = 'ws';
        }
        this.socket = new WebSocket(
            `${this.protocol}://${baseUrl}${this.ws_way}/${method}`,
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
    }

    sendRequest(data) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.error('WebSocket is not open.');
        }
    }

    setRequestHandler(handler) {
        this.messageHandler = handler;
    }
    close() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

// const websocketManager = new WebSocketManager();
//
// export { websocketManager };
