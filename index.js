const express = require('express');
const port = 30300;
const bodyParser = require('body-parser');
const routes = require('./routes/routes');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(express.static(__dirname + '/frontend'));
routes(app);

app.get('/', (request, response) => {
    response.sendFile(__dirname +'/frontend/index.html');
});

// Start the server
const server = app.listen(port, (error) => {
    console.log(`Server listening on port ${server.address().port}`);
});
