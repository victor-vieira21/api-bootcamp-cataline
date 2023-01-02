/* eslint-disable prettier/prettier */
import Ws from 'App/Services/Ws'

Ws.start((socket) => {
    //console.log(socket.id)

    socket.on('create', (room) => {
        socket.join(room)
    })
})
