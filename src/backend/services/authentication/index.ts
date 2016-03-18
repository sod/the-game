const feathersAuthentication = require('feathers-authentication');

export const authentication = function() {
    const app = this;

    let config = app.get('auth');

    app.configure(feathersAuthentication(config));
};
