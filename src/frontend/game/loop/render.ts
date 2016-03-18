import {invoke} from '../utility/invoke';

export const onRender: Set<Function> = new Set<Function>();
export const onRenderDebug: Set<Function> = new Set<Function>();

export const render = function() {
    onRender.forEach(invoke);
    onRenderDebug.forEach(invoke);
};
