let mysql = require('mysql');

const db_config = {
    host     : '151.248.122.204',
    user     : 'admin_auto',
    password : 'P@ssw0rd1007',
    database : 'admin_auto'
};

var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config);


    connection.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();


const router = app => {
    /// Производители
    app.get('/vendor', (request, response) => {
        connection.query('SELECT * FROM car_mark', function (error, results, fields) {
            if (error) throw error;
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            response.send(results);
        });
    });
    // Модели
    app.get('/vendor/:id', (request, response) => {
        let id = request.params.id;
        connection.query('SELECT * FROM car_model WHERE id_car_mark =' + id, function (error, results, fields) {
            if (error) throw error;
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            response.send(results);
        });
    });
    // Косплектации
    app.get('/modify/:id', (request, response) => {
        let id = request.params.id;
        connection.query('SELECT * FROM car_modification WHERE id_car_model =' + id, function (error, results, fields) {
            if (error) throw error;
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            response.send(results);
        });
    });
    // Параметры
    /*
    app.get('/modify/fuel/:id', (request, response) => {
        let id = request.params.id;
        connection.query('SELECT value FROM car_characteristic_value WHERE id_car_characteristic = 50 AND id_car_modification =' + id, function (error, results, fields) {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            if (error) { return response.status(500).send(error.message) }
            response.send(results[0]['value']);
        });
    });
    */
    app.get('/modify/hours/:id', (request, response) => {
        let id = request.params.id;
        connection.query('SELECT value FROM car_characteristic_value WHERE id_car_characteristic = 14 AND id_car_modification =' + id, function (error, results, fields) {
            if (error) throw error;
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            response.send(results[0]['value']);
        });
    });

};

// Export the router
module.exports = router;
