import process from 'process';
import net from 'net';

const client = net.createConnection({ port: 8124 }, () => {
    // 'connect' listener.
    console.log('connected to server!');
}).on('data', function(data){
    console.log(data.toString());
});

process.stdin.on('data', function(data) {
    client.write(data);
});


client.on('end', () => {
  console.log('disconnected from server');
});