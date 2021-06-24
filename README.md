#### Requirements
- Node.js
- npm

#### Installation Steps [Server]
1] Navigate to the server folder and open a terminal
2] Run `npm install` command to install all the dependencies
3] Run the server by `node app.js` command.

#### Installation Steps [Client]
1] Navigate to the client folder and open a terminal.
2] Run `npm install` command to install all the dependencies.
3] Run the client web application by `ng serve` command.

#### Notes:
- NodeJs Server API runs at port 3000
- Angular Client is hosted at port 4200
- Navigate to `http://localhost:4200` to upload the data.json and to view the graph.
- Socket.io is used to provide realtime data to the graph.
- POST request for realtime data can be sent to the NodeJS API at `http://localhost:3000/data`.
- Only the first 12 and the last 12 data is displayed in the graph as thermometer 1 and thermometer 2 respectivelys.

Gliston Dsouza
8828061747
glistondsouza77@gmail.com