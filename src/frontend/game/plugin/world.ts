import {bounds} from '../environment';

export const World = function(game: Phaser.Game) {
    this.preload = function() {
        game.load.image('background', 'public/asset/background/rockywall.png');
    };

    this.create = function() {
        game.add.tileSprite(0, 0, bounds.width(), bounds.height(), 'background');
        game.world.setBounds(0, 0, bounds.width(), bounds.height());
        game.physics.startSystem(Phaser.Physics.P2JS);

        game.debug.renderShadow = false;
        game.debug.lineHeight = 32;
        game.debug.font = '26px Arial';
    };

    this.renderDebug = function() {
        game.debug.cameraInfo(game.camera, 32, 32, 'black');
    };
};
