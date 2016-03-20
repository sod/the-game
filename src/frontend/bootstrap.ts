import {createGame} from './game/game';
import {World} from './game/plugin/World';
import {Player} from './game/plugin/Player';
import {preload} from './game/utility/preload';
import './vendor';

const game = createGame();

(<any>game).device.whenReady(function() {
    const plugins = [];

    preload(game, function() {
        plugins.push(new World(game));
        plugins.push(new Player(game));
    }, function() {
        plugins.forEach(function(plugin) {
            game.plugins.add(plugin);
        });
    });
});

(<any>window).game = game;
