const { Server } = require('socket.io');
const { socketController } = require('../../controllers/sockerController');

const sockerServer = () => {

    const io = new Server(3000, {
        cors: {
            origin: "*"
        }
    });

    io.on('connection', socketController);
}

module.exports = {
    sockerServer,
}