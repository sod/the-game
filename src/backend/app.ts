import {services} from './services/index';
import {middleware} from './middleware/index';
const path = require('path');
const serveStatic: Function = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const socketio = require('feathers-socketio');

export const app = feathers();

app.configure(configuration(path.join(__dirname, '..', '..')));

app.use(compress({}))
    .options('*', cors())
    .use(cors())
    .use(favicon(path.join(app.get('public'), 'favicon.ico')))
    .use('/public', serveStatic(app.get('public')))
    .use('/', serveStatic(app.get('public')))
    .configure(hooks())
    .configure(socketio())
    .configure(services)
    .configure(middleware);
