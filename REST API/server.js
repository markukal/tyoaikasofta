
var express = require('express');
var app=express();
var fs = require('fs');
var bodyParser = require('body-parser');
var controller = require('./controller');
var cookieParser = require('cookie-parser');
const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;

let users = {
    userName: "Testi",
    loginTime: Date.now(),
    sessionId: 1234
};



// Määrittelee esimerkiksi ulkoiset tyylitiedostot ja muut tiedostot, joita voi käyttää selaimen kautta.
app.use(express.static(__dirname + '/www'));
app.use(express.static(__dirname + '/www/images'));



//CORS middleware
var allowCrossDomain = function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());




// Staattiset filut
app.use(express.static('/'));


// REST API tyoaika
app.route('/projects')
    .get(controller.fetchProjects)
    .post(controller.createProject)
    .delete(controller.deleteProject);

app.route('/project/muokkaa')
    .post(controller.updateProject);
   
app.route('/hours')
    .get(controller.fetchHours);

app.route('/hours/limit')
    .get(controller.limitTimes);

app.route('/workers')
    .get(controller.fetchWorkers)
    .post(controller.createWorker)
    .delete(controller.deleteWorker);

app.route('/worker/muokkaa')
    .post(controller.updateWorker);

app.route('/times')
    .get(controller.fetchTimes)
    .post(controller.createTime)
    .delete(controller.deleteTime);

app.route('/Asiakas/:id')
    .put(controller.update);
    //.delete(controller.delete);

app.route('/all')
    .get(controller.fetchAll);





app.get('/', function (request, response) {

   /* if (request.cookies.userData == null) {
        response.redirect("/login");
    }
    else {
        fs.readFile("front.html", function (err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    } */
    fs.readFile("./index.html", function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    });
    
});


app.listen(port, hostname, () => {
    console.log(`Server running AT http://${hostname}:${port}/`);
});

