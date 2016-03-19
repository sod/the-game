import {canvas, bounds, resolution} from './environment';
import {update} from './loop/update';
import {render, onRenderDebug} from './loop/render';

export const createGame = function(onCreate: (game: Phaser.Game) => any) {
    const create = function() {
        game.add.tileSprite(0, 0, bounds.width(), bounds.height(), 'background');
        game.world.setBounds(0, 0, bounds.width(), bounds.height());
        game.physics.startSystem(Phaser.Physics.P2JS);
        onCreate(game);
    };

    const game = new Phaser.Game(<any>{
        width: canvas.width(),
        height: canvas.height(),
        renderer: Phaser.CANVAS,
        parent: 'game',
        antialias: true,
        resolution: resolution(),
        state: {
            create: create,
            update: update,
            render: render
        }
    });

    onRenderDebug.add(function() {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.lineHeight = 32;
        game.debug.font = '26px Arial';
    });

    return game;
};
