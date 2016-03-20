import {canvas, real} from '../environment';

export const Player = function(game: Phaser.Game) {
    let body: Phaser.Physics.P2.Body;
    let player: Phaser.Sprite;
    let cursors;

    this.init = function() {
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        game.physics.p2.enable(player);
        body = <any>player.body;
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player);
    };

    this.update = function() {
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
    };

    this.render = function() {
        game.debug.spriteCoords(player, 32, real.height(canvas.height()) - real.height(50), 'black');
    };
};
