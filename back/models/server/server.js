const express = require('express');
const cors = require('cors');
const expfileupload = require("express-fileupload");
const socket = require('./server-socket');
//const { websocket } = require('../../helpers/websocket');

class Server {

    constructor() {
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.authPath = '/';
        this.usuariosPath = '/usuarios';
        this.partidasPath = '/partidas'
        this.enigmasPath = '/enigmas'

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

        //Websockets.
        this.sockets(); 
        
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(expfileupload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true 
        }));
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.authPath , require('../../routes/authRoutes'));
        this.app.use(this.usuariosPath,require('../../routes/usuarioRoutes'));
        this.app.use(this.partidasPath,require('../../routes/partidaRoutes'));
        this.app.use(this.enigmasPath,require('../../routes/enigmaRoutes'));
    }

    sockets(){
        socket.sockerServer()
    }

    listen() {
        this.server.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;