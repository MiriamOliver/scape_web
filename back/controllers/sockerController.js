const Conexion = require('./Conexion/ConexionPartida');

const userConectados = [];

const socketController = (socket) => {

    const id_handshake = socket.id;

    let {payload} = socket.handshake.query;

    if (payload != 'null') {
               
        payload = JSON.parse(payload) 

        socket.join(payload.id); 

        mostrarUsuariosConectados(socket, payload);

        //ESCUCHAR
        socket.on('default', (res) => {
            chatPartida(socket, res);
        })
    }
    
    socket.on('disconnect', function () {
        conx.desconectarUsuariosPartida(payload) 
        .then((resp) => {
            socket.to(payload.id).emit('disconnect', resp);
            socket.emit('disconnect', resp);
        });
        /* const userIndice = userConectados.indexOf(payload); //Indice del usuario
        if (use !== -1) {
            userConectadoserIndic.splice(userIndice, 1); //quita el usuario que se haya desconectado
        } */
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
                    socket.to(inPayloadCookie.id).emit('message', resp);
                    socket.emit('message', resp);
                });
            
            break;
        default:
            /** Otros posibles casos */
            break;
    }
}

const mostrarUsuariosConectados = (socket, payload) => {
    //console.log('voy a ver el payload')
    //console.log(payload);
    //console.log(userConectados);
    //console.log(payload);
    //userConectados.push(payload);
    /* socket.to(payload.id).emit('connected', userConectados);
            socket.emit('connected', userConectados); */
    console.log('entro un nuevo payload');
    conx = new Conexion();
    console.log(payload);
    conx.usuariosPartida(payload) 
        .then((resp) => {
            socket.to(payload.id).emit('connected', resp);
            socket.emit('connected', resp);
        });
    //console.log(userConectados);
}

module.exports = {
    socketController,
}