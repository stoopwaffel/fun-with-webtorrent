var topology = require('fully-connected-topology')
var net = require('net')
var jsonStream = require('duplex-json-stream')

var me = process.argv[2]
var peers = process.argv.slice(3)

var swarm = topology(me, peers)
var clients = new Set()


swarm.on('connection', function (socket, id) {
    socket = jsonStream(socket);
    clients.add(socket);
    socket.on('data', function (data) {
        console.log({
            data: `${data.nickname}> ${data.data}`
        })
    })
  console.log('new connection from', id)
});


process.stdin.on('data', function (data) {
    var message = data.toString().trim()
    if (message.length > 0) {
        for (let client of clients) {
            client.write({
                nickname: me,
                data: message
            })
        }
    }

});





