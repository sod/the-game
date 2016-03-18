const feathersErrors = require('feathers-errors');

export const notFound = function() {
    return function(req, res, next) {
        next(new feathersErrors.NotFound('Page not found'));
    };
};
