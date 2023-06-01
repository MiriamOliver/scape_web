const Conexion = require('./Conexion/ConexionPartida');
const ConexionEnigma = require('./Conexion/ConexionEnigma');
const ConexionUsuario = require('./Conexion/ConexionUsuario');


const socketController = (socket) => {

    //const id_handshake = socket.id;

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

        socket.on('activarjugador', (res) => {
            activarPartidaJugador(socket, payload, res);
        })

        socket.on('contestarenigma', (res) => {
            activarContestarEnigma(socket, payload, res);
        })

        socket.on('actualizarpartida', (res) => {
            actualizarPartida(socket, payload, res);
        })

        socket.on('actualizarusuario', (res) => {
            console.log(res);
            actualizarPerfilUsuario(socket, payload, res);
        })

        socket.on('actualizarenigmas', (res) => {
            actualizarEnigma(socket, payload, res);
        })

        socket.on('crearenigmas', (res) => {
            crearEnigma(socket, payload, res);
        })

        socket.on('listadopartidas', (res) => {
            listadoPartidas(socket, payload, res);
        })

        socket.on('listadoenigmas', (res) => {
            listadoEnigmas(socket, payload, res);
        })

        socket.on('listadousuarios', (res) => {
            listadoUsuarios(socket, payload, res);
        })

        socket.on('habilitarusuarios', (res) => {
            habilitarUsuarios(socket, payload, res);
        })

        socket.on('borrarenigma', (res) => {
            borrarEnigma(socket, payload, res);
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
            let conx = new Conexion();
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

const estadoPartida = (socket, payload, res) => {
    if(res.event == 'juego') {
        let conx = new Conexion();
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
        let conx = new Conexion();
        conx.getEnigma(res.payload)
        .then((resp) => {
            socket.to(payload.id).emit('enigmas',resp);
            socket.emit('enigmas', resp);
        }); 
    }
}

const actualizarPartida = (socket, payload, res) => {
    if(res.event == 'actualizarpartida') {
        let conx = new Conexion();
        conx.updatePartida(res.payload)
        .then((resp) => {
            socket.to(payload.id).emit('actualizarpartida',resp);
            socket.emit('actualizarpartida', resp);
        });  
    }
}

const listadoEnigmas = (socket, payload, res) => {
    let listaEnigmas = [];
    if(res.event == 'listadoenigmas') {
        let conx = new ConexionEnigma();
        conx.getEnigmas(res.payload)
        .then((enigmas) => {
            enigmas.forEach(enigma => {
                listaEnigmas.push(enigma.dataValues);
            });
            socket.to(payload.id).emit('listadoenigmas',listaEnigmas);
            socket.emit('listadoenigmas', listaEnigmas);
        });  
    }
}

const actualizarEnigma = (socket, payload, res) => {
    let listaEnigmas = [];
    if(res.event == 'listadoenigmas') {
        let conx = new ConexionEnigma();
        conx.updateEnigma(res.payload)
        .then((enigmas) => {
            enigmas.forEach(enigma => {
                listaEnigmas.push(enigma.dataValues);
            });
            socket.to(payload.id).emit('listadoenigmas',listaEnigmas);
            socket.emit('listadoenigmas', listaEnigmas);
        });  
    }
}


const crearEnigma = (socket, payload, res) => {
    let listaEnigmas = [];
    if(res.event == 'listadoenigmas') {
        let conx = new ConexionEnigma();
        conx.createEnigma(res.payload)
        .then((enigmas) => {
            enigmas.forEach(enigma => {
                listaEnigmas.push(enigma.dataValues);
            });
            socket.to(payload.id).emit('listadoenigmas',listaEnigmas);
            socket.emit('listadoenigmas', listaEnigmas);
        });  
    }
}

const borrarEnigma = (socket, payload, res) => {
    let listaEnigmas = [];
    if(res.event == 'listadoenigmas') {
        let conx = new ConexionEnigma();
        conx.deleteEnigma(res.payload)
        .then((enigmas) => {
            enigmas.forEach(enigma => {
                listaEnigmas.push(enigma.dataValues);
            });
            socket.to(payload.id).emit('listadoenigmas',listaEnigmas);
            socket.emit('listadoenigmas', listaEnigmas);
        });  
    }
}

const listadoPartidas = (socket, payload, res) => {
    if(res.event == 'listadopartidas') {
        let conx = new Conexion();
        conx.listaPartidas()
        .then((partidas) => {
            socket.to(payload.id).emit('listadopartidas',partidas);
            socket.emit('listadopartidas', partidas);
        });  
    }
}

const listadoUsuarios = (socket, payload, res) => {
    if(res.event == 'listadousuarios') {
        let conx = new ConexionUsuario();
        conx.listaUsuarios()
        .then((usuarios) => {
            usuarios.forEach(user => {
                user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar
                if(user.habilitado == 1){
                    user.habilitado = false;
                }else{
                    user.habilitado = true;
                }
            });
            socket.to(payload.id).emit('listadousuarios',usuarios);
            socket.emit('listadousuarios', usuarios);
        });  
    }
}

const habilitarUsuarios = (socket, payload, res) => {
    if(res.event == 'listadousuarios') {
        let conx = new ConexionUsuario();
        conx.bloqueoUsuarios(res.payload)
        .then((usuarios) => {
            usuarios.forEach(user => {
                user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar
                if(user.habilitado == 1){
                    user.habilitado = false;
                }else{
                    user.habilitado = true;
                }
            });
            socket.to(payload.id).emit('listadousuarios',usuarios);
            socket.emit('listadousuarios', usuarios);
        });  
    }
}

const actualizarPerfilUsuario = (socket, payload, res) => {
    if(res.event == 'listadousuarios') {
        console.log(res.payload.req);
        let conx = new ConexionUsuario();
        conx.actualizarUsuarios(res.payload)
        .then((usuarios) => {
            usuarios.forEach(user => {
                user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar
                if(user.habilitado == 1){
                    user.habilitado = false;
                }else{
                    user.habilitado = true;
                }
            });
            socket.to(payload.id).emit('listadousuarios',usuarios);
            socket.emit('listadousuarios', usuarios);
        });  
    }
}

const actualizarPartidaJugador = (socket, payload, res) => {
    let userConectados = [];
    if(res.event == 'conectados') {
        let conx = new Conexion();
        conx.updatePartidaJugador(res.payload)
        .then((users) => {
            users.forEach(user => {
                user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar;
                if(user.activo == 0){
                    user.activo = false;
                }else{
                    user.activo = true;
                }
                userConectados.push(user.dataValues);
            });
            socket.to(payload.id).emit('conectados',userConectados);
            socket.emit('conectados', userConectados); 
        });  
    }
}

const activarPartidaJugador = (socket, payload, res) => {
    let userConectados = [];
    if(res.event == 'conectados') {
        let conx = new Conexion();
        conx.activarJugador(res.payload)
        .then((usuarios) => {
            usuarios.forEach(user => {
                user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar
                if(user.activo == 0){
                    user.activo = false;
                }else{
                    user.activo = true;
                }
                userConectados.push(user.dataValues);
            });
            socket.to(payload.id).emit('conectados', userConectados);
            socket.emit('conectados', userConectados);
            socket.to(payload.id).emit('contestarenigma', userConectados);
            socket.emit('contestarenigma', userConectados);    
        });  
    }
}

const activarContestarEnigma = (socket, payload, res) => {
    let userConectados = [];
    if(res.event == 'conectados') {
        let conx = new Conexion();
        conx.contestarJugador(res.payload)
        .then((usuarios) => {
            usuarios.forEach(user => {
                console.log(user);
                if(user.activo == 0){
                    user.activo = false;
                }else{
                    user.activo = true;
                }
                userConectados.push(user.dataValues);
            });
            socket.to(payload.id).emit('contestarenigma', userConectados);
            socket.emit('contestarenigma', userConectados);
        });  
    }
}

const mostrarUsuariosConectados = (socket, payload, res) => {
    let userConectados = [];
    if(res.event == 'conectados') {
        let conx = new Conexion();
        conx.usuariosPartida(res.payload)
        .then((users) => {
            users.forEach(user => {
                console.log(user);
                user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar;
                if(user.activo == 0){
                    user.activo = false;
                }else{
                    user.activo = true;
                }
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
        let conx = new Conexion();
        conx.usuarioDesconectado(res.payload)
        .then((users) => {
            users.forEach(user => {
                console.log(user);
                user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar;
                if(user.activo == 0){
                    user.activo = false;
                }else{
                    user.activo = true;
                }
                userConectados.push(user.dataValues);
            });
            console.log(userConectados);
            socket.to(payload.id).emit('desconectado',userConectados);
            socket.emit('desconectado', userConectados);
        });
    }     
}

module.exports = {
    socketController,
}