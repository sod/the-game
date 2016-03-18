import {canvas, bounds} from './environment';
import {update} from './loop/update';
import {render, onRenderDebug} from './loop/render';

export const createGame = function(onCreate: (game: Phaser.Game) => any) {
    const create = function() {
        game.add.tileSprite(0, 0, bounds.width(), bounds.height(), 'background');
        game.world.setBounds(0, 0, bounds.width(), bounds.height());
        game.physics.startSystem(Phaser.Physics.P2JS);
        onCreate(game);
    };

    const game = new Phaser.Game(canvas.width(), canvas.height(), Phaser.WEBGL, 'game', {
        // preload: preload,
        create: create,
        update: update,
        render: render
    });

    onRenderDebug.add(function() {
        game.debug.cameraInfo(game.camera, 32, 32);
    });

    return game;
};
