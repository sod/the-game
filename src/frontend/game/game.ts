import {canvas, bounds, resolution} from './environment';
import {render, onRenderDebug} from './loop/render';
import {update} from './loop/update';

export const createGame = function(onCreate: (game: Phaser.Game) => any) {
    const preload = function() {
        game.load.image('background', 'public/asset/background/rockywall.png');
    };

    const create = function() {
        game.add.tileSprite(0, 0, bounds.width(), bounds.height(), 'background');
        game.world.setBounds(0, 0, bounds.width(), bounds.height());
        game.physics.startSystem(Phaser.Physics.P2JS);

        game.debug.renderShadow = false;
        game.debug.lineHeight = 32;
        game.debug.font = '26px Arial';

        onCreate(game);
    };

    const game = new Phaser.Game(<any>{
        width: canvas.width(),
        height: canvas.height(),
        renderer: Phaser.CANVAS,
        parent: 'game',
        antialias: false,
        resolution: resolution(),
        state: {
            preload: preload,
            create: create,
            update: update,
            render: render
        }
    });

    onRenderDebug.add(function() {
        game.debug.cameraInfo(game.camera, 32, 32, 'black');
    });

    return game;
};
