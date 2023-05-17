const Conexion = require('./Conexion/ConexionPartida');



const socketController = (socket) => {

    const id_handshake = socket.id;

    let {payload} = socket.handshake.query;

    if (payload != 'null') {
               
        payload = JSON.parse(payload) 

        socket.join(payload.id); 

        
        //ESCUCHAR
        socket.on('default', (res) => {
            chatPartida(socket, res);
        })

        socket.on('juego', (res) => {
            estadoPartida(socket, payload, res);
        })

        socket.on('enigmas', (res) => {
            conseguirEnigma(socket, payload, res);
        })

        socket.on('actualizarjugador', (res) => {
            actualizarPartidaJugador(socket, payload, res);
        })

        socket.on('actualizarpartida', (res) => {
            actualizarPartida(socket, payload, res);
        })

        socket.on('conectados', (res) => {
            mostrarUsuariosConectados(socket, payload, res);
        })

        socket.on('desconectado', (res) => {
            usuarioDesconectado(socket, payload, res);
        });
    }

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
                    console.log(inPayloadCookie.id);
                    socket.to(inPayloadCookie.id).emit('message', resp);
                    socket.emit('message', resp);
                });
            
            break;
        default:
            /** Otros posibles casos */
            break;
    }
}

const mostrarUsuariosConectados = (socket, payload, res) => {
    let userConectados = [];
    if(res.event == 'conectados') {
        conx = new Conexion();
        conx.usuariosPartida(res.payload)
        .then((users) => {
            users.forEach(user => {
                user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar;
                userConectados.push(user.dataValues);
            });
            socket.to(payload.id).emit('conectados',userConectados);
            socket.emit('conectados', userConectados); 
        });
    }       
}

const usuarioDesconectado = (socket, payload, res) => {
    let userConectados = [];
    if(res.event == 'desconectado') {
        conx = new Conexion();
        conx.usuarioDesconectado(res.payload)
        .then((users) => {
            users.forEach(user => {
                user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar;
                userConectados.push(user.dataValues);
            });
            socket.to(payload.id).emit('desconectado',userConectados);
            socket.emit('desconectado', userConectados);
        });
    }     
}

const estadoPartida = (socket, payload, res) => {
    if(res.event == 'juego') {
        conx = new Conexion();
        conx.empezarPartida(res.payload)
        .then((resp) => {
            console.log(resp);
            socket.to(payload.id).emit('juego',resp);
            socket.emit('juego', resp);
        });
    }
}

const conseguirEnigma = (socket, payload, res) => {
    if(res.event == 'enigmas') {
        conx = new Conexion();
        conx.getEnigma(res.payload)
        .then((resp) => {
            socket.to(payload.id).emit('enigmas',resp);
            socket.emit('enigmas', resp);
        }); 
    }
}

const actualizarPartidaJugador = (socket, payload, res) => {
    let userConectados = [];
    if(res.event == 'conectados') {
        conx = new Conexion();
        conx.updatePartidaJugador(res.payload)
        .then((users) => {
            users.forEach(user => {
                user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar;
                userConectados.push(user.dataValues);
            });
            socket.to(payload.id).emit('conectados',userConectados);
            socket.emit('conectados', userConectados); 
        });  
    }
}

const actualizarPartida = (socket, payload, res) => {
    if(res.event == 'actualizarpartida') {
        conx = new Conexion();
        conx.updatePartida(res.payload)
        .then((resp) => {
            socket.to(payload.id).emit('actualizarpartida',resp);
            socket.emit('actualizarpartida', resp);
        });  
    }
}



module.exports = {
    socketController,
}