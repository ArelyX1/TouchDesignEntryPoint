const WebSocket = require('ws');
// Escuchar en el puerto 5401 y en todas las interfaces (0.0.0.0)
const wss = new WebSocket.Server({ 
    port: 5401,
    host: '0.0.0.0' 
});

wss.on('connection', (ws, req) => {
    // req.socket.remoteAddress te dirá quién se conecta (útil para debug)
    console.log(`Nueva conexión desde: ${req.socket.remoteAddress}`);

    ws.on('message', (data) => {
        // Reenvío binario masivo a todos excepto al emisor
        wss.clients.forEach((client) => {
            if (client!== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

console.log('Puente Node.js activo en la red local. Puerto: 5401');