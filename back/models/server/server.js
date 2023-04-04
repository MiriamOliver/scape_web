const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.authPath = '/';

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

        //Websockets.
        //this.sockets();
        
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
       
    }

    routes(){
        this.app.use(this.authPath , require('../../routes/authRoutes'));
    }

    /*sockets(){
        
    } */

    listen() {
        this.server.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;