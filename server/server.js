const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const methodOverride  = require('method-override');  // put and delete support
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const jwt = require('jsonwebtoken');

const botService  = require('./bot/botService');

const config = require('./config.json');
const wishRoutes = require('./routes/wish');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const path = require('path');

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webPackConfig = require('../webpack.config')

mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on('connecting', () => {
    console.log('connecting to MongoDB...');
});

db.on('error', (error) => {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('connected', () => {
    console.log('MongoDB connected!');
});

db.once('open', () => {
    console.log('MongoDB connection opened!');
});

db.on('reconnected', () => {
    console.log('MongoDB reconnected!');
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected!');
    mongoose.connect(config.database,{ auto_reconnect: true, });
});

mongoose.connect(config.database,{ auto_reconnect: true, });
const gracefulExit = () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection with DB :' + config.database + ' is disconnected through app termination');
        process.exit(0);
    });
}
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);


const compiler = webpack(webPackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webPackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride()); // поддержка put и delete
app.use(morgan('dev'));


//auth meddleware
app.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    let token = req.headers['authorization'];

    if (!token) return next(); //if no token, continue

    token = token.replace('Bearer ', '');

    jwt.verify(token, config.secret_key, function(err, user) {
        console.log(err);
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Please register Log in using a valid email to submit posts'
            });
        } else {
            req.user = user; //set the user to req so other routes can use it
            console.log(req.user);
            next();
        }
    });
});

app.use('/api', wishRoutes);
app.use('/api', userRoutes);

app.set('port',  process.env.PORT || config.port);

app.post('/', botService.getConnector().listen());
app.get('/test', (req, res) => {
    botService.sendMessage('**Hi!**', err =>
    {
        res.status(err ? 500 : 200);
        res.end();
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
}).listen(app.get('port'), () => {
    console.log('App is running, server is listening on port ', app.get('port'));
});


//kludges for react-router
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});
app.get('/wish', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});


app.use((req, res, next) => {
    res.status(404);
    console.log(`Not found URL: ${req.url}`);
    res.send({ error: true, message: 'Not found' });
    return;
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(`Internal error(${res.statusCode} : ${err.message}`);
    res.send({ error: true, message: err.message });
    return;
});

