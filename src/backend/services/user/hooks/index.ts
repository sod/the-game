const globalHooks = require('../../../hooks');
const feathersHooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const before = {
    all: [],
    find: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.requireAuth()
    ],
    get: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.requireAuth()
    ],
    create: [
        auth.hashPassword()
    ],
    update: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.requireAuth()
    ],
    patch: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.requireAuth()
    ],
    remove: [
        auth.verifyToken(),
        auth.populateUser(),
        auth.requireAuth()
    ]
};

const after = {
    all: [feathersHooks.remove('password')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
};

export const hooks = {
    before,
    after
};
