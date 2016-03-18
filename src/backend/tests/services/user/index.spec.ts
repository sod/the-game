import {app} from '../../../app';
const assert = require('assert');

describe('user service', () => {
    it('registered the users service', () => {
        assert.ok(app.service('users'));
    });
});
