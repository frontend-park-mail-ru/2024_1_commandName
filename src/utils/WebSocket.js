import { baseUrl } from './API/config.js';
class WebSocketManager {
    constructor() {
        this.sockets = {};
        this.ws_way = '';
        if (baseUrl === 'chatme.site/api/v1') {
            this.protocol = 'wss';
            this.ws_way = '/ws';
        } else {
            this.protocol = 'ws';
        }
        this.messageHandlers = {};
    }

    connect(methods) {
        methods.forEach((method) => {
            const socket = new WebSocket(
                `${this.protocol}://${baseUrl}${this.ws_way}/${method}`,
            );
            socket.onopen;
            socket.onerror = (error) => {
                console.error(`WebSocket ${method} error:`, error);
            };
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (this.messageHandlers[method]) {
                    this.messageHandlers[method](data);
                }
            };
            this.sockets[method] = socket;
        });
    }

    sendMessage(method, message) {
        const socket = this.sockets[method];
        if (!socket) {
            console.error(`WebSocket for method ${method} not found.`);
            return;
        }
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not open.');
        }
    }
    setMessageHandler(method, handler) {
        this.messageHandlers[method] = handler;
    }

    close() {
        Object.values(this.sockets).forEach((socket, index) => {
            socket.close();
            console.log(`WebSocket ${index} connection closed.`);
        });
    }
}

const websocketManager = new WebSocketManager();

export { websocketManager };
