const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

const server = app.listen(3000,() => {
    console.log('Started in 3000');
});

const io = socket(server);
let conn_socket;

io.sockets.on('connection', (socket) => {
    console.log(`New socket connection id: ${socket.id}`);
})


function sendData(data1, data2){

    io.sockets.emit('data1', data1);
    io.sockets.emit('data2', data2);
}

app.post('/data', function(request, response){
    //parsing the request
    // console.log(request.body);
    let datajson = request.body.slice(-12); //getting only the last 12 values
    let data1 = [];
    let data2 = [];

    for(var i=0;i<datajson.length;i++){
        data1[data1.length] = datajson[i].val;
    }
    
    for(var i=0;i<12;i++){
        data2[data2.length] = request.body[i].val;
    }
    
    
    sendData(data1,data2);

  });