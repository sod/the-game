import {invoke} from '../utility/invoke';

export const onUpdate: Set<Function> = new Set<Function>();

export const update = function() {
    onUpdate.forEach(invoke);
};
