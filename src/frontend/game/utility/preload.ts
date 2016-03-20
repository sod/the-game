const event = 'preloading';

export const preload = function(game: Phaser.Game, before: Function, after: Function): void {
    game.gamePaused(event);
    game.load.reset(true);
    before();

    if (game.load.totalQueuedFiles() === 0 && game.load.totalQueuedPacks() === 0) {
        after();
        return;
    }

    game.load.onLoadComplete.addOnce(function() {
        game.gameResumed(event);
        after();
    });
    game.load.start();
};
