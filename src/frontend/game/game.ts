import {canvas, resolution} from './environment';

export const createGame = function() {
    return new Phaser.Game(<any>{
        width: canvas.width(),
        height: canvas.height(),
        renderer: Phaser.CANVAS,
        parent: 'game',
        antialias: false,
        resolution: resolution()
    });
};
