import {createGame} from './game/game';
import {createPlayer} from './game/player';
import './vendor';

createGame(function(game) {
    createPlayer(game);
});
