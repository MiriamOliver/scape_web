const { io } = require('../models/server/server-socket')

const websocket = (socket) => {
    console.log(socket);
    console.log(socket.id)
    console.log(socket.handshake);
    console.log('-----------')
    console.log(socket.handshake.query);
    /** handshake: Es el id de conexion con el dispositivo cliente */
    const id_handshake = socket.id;

    /** query: En este ejemplo practico queremos enviar una información extra en la conexión
     * acerca del usuario que esta logeado en el Front. Para ello lo enviamos dentro de un objeto por defecto llamado "query"
     */
    let {payload} = socket.handshake.query;

    if (!payload) {
        console.log('no payload')
    } else {
        console.log('hay payload')
        payload = JSON.parse(payload)
        console.log(payload.id);
    
        /**
         * Una vez enviado la informacion del usuario conectado en este caso es un peequeño objecto que contiene nombre y id,
         * creamos una sala y lo unimos https://socket.io/docs/rooms-and-namespaces/
         */
        socket.join(`room_${payload.id}`);

        /**
         * --------- EMITIR -------------
         * Para probar la conexion con el dispositivo unico le emitimos un mensaje a el dispositivo conectado
         */
        socket.emit('message', {
            msg: `Hola tu eres el dispositivo ${id_handshake}, perteneces a la sala room_${payload.id}, de ${payload.user}`
        });

        /**
         * ----------- ESCUCHAR -------------
         * Cuando el cliente nos emite un mensaje la api los escucha de la siguiente manera
         */
        socket.on('default', function(res){
            console.log('probnado');
            switch (res.event) {
                case 'message':
                    /**
                     * Si el evento que escucha es "message", se parsea la informacion recibida
                     * y posteriormente se emite un "message" a todos los dispositivos unidos a la sala.
                     */
                    console.log('no termina de escuchar')
                    console.log(JSON.parse(res.cookiePayload));
                    console.log(res.payload);
                    console.log('------------')
                    const inPayloadCookie = JSON.parse(res.cookiePayload);
                    const inPayload = res.payload;

                    io.to(`room_${inPayloadCookie.id}`).emit('message',{
                        msg: `Sala room__${inPayloadCookie.id} de ${inPayloadCookie.user}: ${inPayload.message}`
                    });

                    break;
                default:
                    /** Otros posibles casos */
                    break;
            }

        });
    };

    /**
     * Si un dispositivo se desconecto lo detectamos aqui
     */
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
}

module.exports = {
    websocket
}