import {logger} from './logger';
import {notFound} from './not-found-handler';
const handler = require('feathers-errors/handler');

export const middleware = function() {
    // Add your custom middleware here. Remember, that
    // just like Express the order matters, so error
    // handling middleware should go last.
    const app = this;

    app.use(notFound());
    app.use(logger(app));
    app.use(handler());
};
