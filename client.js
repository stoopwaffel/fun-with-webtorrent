var net = require('net')
var jsonStream = require('duplex-json-stream')


require('lookup-multicast-dns/global')
var socket = jsonStream(net.connect(8124, 'this-is-a-test.local'))

var nickname = process.argv[2] || 'any'
process.stdin.on('data', function (data) {
    var message = data.toString().trim()
    if (message.length > 0) {
        socket.write({
            nickname: nickname,
            data: message
        })
    }
})

socket.on('data', function (data) {
    console.log(data.data)
})
