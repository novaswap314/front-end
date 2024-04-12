
export default class SpwsClient {
    constructor(uri) {
        this.uri = uri;
        this.websocket = null;
        this.connect();
    }

    connect() {
        this.websocket = new WebSocket(this.uri);
        this.websocket.onopen = this.onOpen.bind(this);
        this.websocket.onerror = this.onError.bind(this);
        this.websocket.onclose = this.onClose.bind(this);
        this.websocket.onmessage = this.onMessage.bind(this);
    }

    send(data) {
        if (this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(data);
        }
    }

    close() {
        console.log('close:::::', this.websocket)
        if (this.websocket) {
            this.websocket.close();
        }
    }

    setOnMessageCallback(callback) {
        this.onMessageCallback = callback;
    }

    onMessage(event) {
        if (this.onMessageCallback) {
            this.onMessageCallback(event);
        }
    }

    onOpen() {
        console.log('WebSocket is connected.')
        setInterval(() => {
            this.websocket?.send('ping')
        }, 1000 * 5)
    }

    onError(error) {
        console.error('WebSocket Error:', error)
    }

    onClose(event) {
        if (event.wasClean) {
            console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`)
        } else {
            console.error('Connection died')
        }
        let rett = setInterval(() => {
            try {
                this.connect(this.uri)
                clearInterval(rett)
            } catch(e) {
                console.log("try reconnect:::", e)
            }
        }, 2000)
    }
}

