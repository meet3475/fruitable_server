const { Server } = require('socket.io');

const connectChat = () => {
    const io = new Server({
        cors: {
            origin: "http://localhost:3000"
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        socket.emit("welcome", "YOU ARE WELCOME FRUITABLE");

        socket.broadcast.emit("greeting", "HELLO ALL");

       

        socket.on('message', (data) => {
            console.log(data);

            io.to(data.reciver).emit('rec-msg', data.message)
        })

        socket.on('join-gruop', async (gruop_name) => {
            console.log(gruop_name);

            socket.join(gruop_name)
        })


    });

    io.listen(8080);
}

module.exports = connectChat
