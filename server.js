import net from 'net'
import streamSet from 'stream-set'

var activeSockets = streamSet()

const server = net.createServer((c) => {
  // 'connection' listener.
  activeSockets.add(c)
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.on('data', function(data) {
   console.log(`there are ${activeSockets.streams.length} sockets`)   
   activeSockets.forEach(function(socket, i) {
     socket.write(`reply: ${data.toString()}`);
   })
  })
  c.pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});