import {authentication} from './authentication/index';
import {user} from './user/index';

export const services = function() {
    const app = this;

    app.configure(authentication);
    app.configure(user);
};
