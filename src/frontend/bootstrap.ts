import {createGame} from './game/game';
import {createPlayer} from './game/player';
import './vendor';
import {expose} from './game/utility/expose';

createGame(function(game) {
    expose('game', game);
    expose('player', createPlayer(game));
});
