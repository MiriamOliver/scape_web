const Conexion = require('./Conexion/ConexionPartida');

const socketController = (socket) => {

    const id_handshake = socket.id;
    let {payload} = socket.handshake.query;

    if (payload != 'null') {
               
        payload = JSON.parse(payload) 
        
        socket.join(`room_${payload.id}`); 

        //ESCUCHAR
        socket.on('default', (res) => {
            chatPartida(socket, res);
        })
    }
    
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
};

const chatPartida = (socket, res) => {
    switch (res.event) {
        case 'message':
            /**
             * Si el evento que escucha es "message", se parsea la informacion recibida
             * y posteriormente se emite un "message" a todos los dispositivos unidos a la sala.
             */
            const inPayloadCookie = JSON.parse(res.cookiePayload);
            const inPayload = res.payload;
            conx = new Conexion();
            conx.mensajesPartida(inPayloadCookie, inPayload)
                .then((resp) => {
                    socket.emit('message', resp);
                });
            
            break;
        default:
            /** Otros posibles casos */
            break;
    }
}

module.exports = {
    socketController,
}