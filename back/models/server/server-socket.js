const { Server } = require('socket.io');
//const { websocket } = require('../../helpers/websocket');

const sockerServer = () => {

    const io = new Server(3000, {
        cors: {
            origin: "*"
        }
    });

    io.on('connection', function (socket) {

        /** handshake: Es el id de conexion con el dispositivo cliente */
        const id_handshake = socket.id;
    
        /** query: En este ejemplo practico queremos enviar una información extra en la conexión
         * acerca del usuario que esta logeado en el Front. Para ello lo enviamos dentro de un objeto por defecto llamado "query"
         */
        let {payload} = socket.handshake.query;
    
        if (!payload) {

        } else {

            payload = JSON.parse(payload)
        
            /**
             * Una vez enviado la informacion del usuario conectado en este caso es un peequeño objecto que contiene nombre y id,
             * creamos una sala y lo unimos https://socket.io/docs/rooms-and-namespaces/
             */
            socket.join(`room_${payload.id}`);
    
            /**
             * --------- EMITIR -------------
             * Para probar la conexion con el dispositivo unico le emitimos un mensaje a el dispositivo conectado
             */
            /* socket.emit('message', {
                avatar: payload.avatar,
                msg: `Bienvenido ${payload.nombre}`
            }); */
    
            /**
             * ----------- ESCUCHAR -------------
             * Cuando el cliente nos emite un mensaje la api los escucha de la siguiente manera
             */
            socket.on('default', function(res){
                switch (res.event) {
                    case 'message':
                        /**
                         * Si el evento que escucha es "message", se parsea la informacion recibida
                         * y posteriormente se emite un "message" a todos los dispositivos unidos a la sala.
                         */
                        const inPayloadCookie = JSON.parse(res.cookiePayload);

                        const inPayload = res.payload;
    
                        io.to(`room_${inPayloadCookie.id}`).emit('message',{
                            avatar: inPayloadCookie.avatar,
                            nombre: inPayloadCookie.nombre,
                            msg: inPayload.message
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
    });
}

module.exports = {
    sockerServer,
}