import {onRenderDebug} from './loop/render';
import {onUpdate} from './loop/update';

export const createPlayer = function(game: Phaser.Game) {
    const player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.p2.enable(player);
    const body: Phaser.Physics.P2.Body = <any>player.body;
    const cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player);

    onUpdate.add(function() {
        body.setZeroVelocity();

        if (cursors.up.isDown) {
            body.moveUp(300)
        }
        else if (cursors.down.isDown) {
            body.moveDown(300);
        }

        if (cursors.left.isDown) {
            body.velocity.x = -300;
        }
        else if (cursors.right.isDown) {
            body.moveRight(300);
        }
    });

    onRenderDebug.add(function() {
        game.debug.spriteCoords(player, 32, 500);
    });

    return player;
};
