const express = require('express');
const os = require('os');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

server.listen(8080, () => console.log('Listening on port 8080!'));

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});
