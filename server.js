var net = require('net')
var jsonStream = require('duplex-json-stream')

var register = require('register-multicast-dns')
register('this-is-a-test.local')


var clients = new Set()
var server = net.createServer(function (socket) {
    console.log('new socket connection')
    socket = jsonStream(socket)
    clients.add(socket)
    socket.on('data', function (data) {
        console.log(data)
        for (let client of clients) {

            client.write({
                data: `${data.nickname}> ${data.data}`
            })

        }
    })
})

server.listen(8124, function () {
    console.log('server started')
})
